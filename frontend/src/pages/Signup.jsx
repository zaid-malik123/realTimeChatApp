import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slice/userSlice";
import axios from "axios";

/* ✅ Toastify import */
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const formData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      userName,
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/signup`,
        data,
        { withCredentials: true }
      );

      dispatch(setUserData(res.data.user));

      /* ✅ Show success toast */
      toast.success("Signup successful! 🎉");

      setUserName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(msg); // ✅ Show error toast
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center ">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]">
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center">
          <h1 className="text-gray-600 font-bold text-[30px]">
            Welcome to <span className="text-white">chatly</span>
          </h1>
        </div>
        <form
          onSubmit={formData}
          className="w-full flex flex-col gap-[20px] items-center"
        >
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="username"
            required
            className="w-[90%] h-[50px] outline-none text-gray-700 text-[15px] border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            required
            className="w-[90%] h-[50px] text-gray-700 text-[15px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg"
          />
          <div className="relative w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              autoComplete="new-password"
              placeholder="password"
              required
              className="w-full h-full outline-none px-[20px] py-[10px] bg-white text-gray-700 text-[15px]"
            />
            <span
              onClick={() => setShow((prev) => !prev)}
              className="cursor-pointer absolute top-[10px] right-[20px] text-[17px] text-[#20c7ff] font-semibold"
            >
              {show ? "hidden" : "show"}
            </span>
          </div>

          <button
            className="bg-[#20c7ff] px-[20px] py-[10px] rounded-xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold text-white hover:bg-[#0aaed9] transition duration-300"
            disabled={loading}
          >
            {loading ? "loading..." : "Sign up"}
          </button>

          <p className="text-sm text-gray-600 text-center font-medium">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#20c7ff] font-semibold underline hover:text-[#0aaed9] transition duration-300 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
