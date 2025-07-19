import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedUser, setUserData } from "../redux/slice/userSlice";
import axios from "axios";

/* ✅ Toastify import */
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* local state */
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* submit handler */
  const formData = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      /* redux updates */
      dispatch(setUserData(res.data.user));
      dispatch(setSelectedUser(null));

      /* ✅ success toast */
      toast.success("Login successful! 🎉");

      /* reset form + nav */
      setEmail("");
      setPassword("");
      setLoading(false);
      navigate("/");
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Something went wrong. Try again.";

      /* ✅ error toast */
      toast.error(msg);

      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-200 flex items-center justify-center">
      <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
        {/* header */}
        <div className="w-full h-[160px] bg-[#20c7ff] rounded-b-[30%] shadow-md flex items-center justify-center">
          <h1 className="text-white font-bold text-3xl">
            Welcome back to <span className="text-gray-800">Chatly 👋</span>
          </h1>
        </div>

        {/* form */}
        <form
          onSubmit={formData}
          className="w-full flex flex-col gap-5 items-center mt-4"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-[90%] h-[50px] outline-none text-gray-700 text-[15px] border border-[#20c7ff] px-5 py-2 bg-white rounded-lg shadow"
            required
          />

          <div className="relative w-[90%] h-[50px]">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Password"
              className="w-full h-full outline-none px-5 py-2 text-gray-700 text-[15px] bg-white rounded-lg shadow border border-[#20c7ff]"
              required
            />
            <span
              onClick={() => setShow((prev) => !prev)}
              className="cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 text-[14px] text-[#20c7ff] font-semibold select-none"
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          <button
            className="bg-[#20c7ff] px-6 py-3 rounded-xl shadow text-lg w-[200px] mt-4 font-semibold text-white hover:bg-[#0aaed9] transition"
            disabled={loading}
          >
            {loading ? "loading..." : "Log In"}
          </button>

          <p className="text-sm text-gray-600 text-center font-medium">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#20c7ff] font-semibold underline hover:text-[#0aaed9] transition cursor-pointer"
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
