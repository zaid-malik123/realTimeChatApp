import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.jpeg";
import { useRef, useState } from "react";
import { setUserData } from "../redux/slice/userSlice";

/* ✅ Toastify import */
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userSlice);

  const [name, setName] = useState(userData.name || "");
  const [frontendImage, setFrontendImage] = useState(userData.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const image = useRef();

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/users/profile`,
        formData,
        { withCredentials: true }
      );

      dispatch(setUserData(res.data));
      toast.success("Profile updated successfully! ✅");
      setSaving(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong 😓"
      );
      setSaving(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]">
      <div className="fixed top-[20px] left-[20px]">
        <IoIosArrowRoundBack
          onClick={() => navigate("/")}
          className="w-[50px] h-[50px] text-gray-700 cursor-pointer"
        />
      </div>

      {/* Profile Image Picker */}
      <div
        className="rounded-full border-4 border-[#20c7ff] shadow-lg shadow-gray-400 relative"
        onClick={() => image.current.click()}
      >
        <div className="w-[200px] h-[200px] overflow-hidden rounded-full flex justify-center items-center">
          <img className="h-[100%]" src={frontendImage} alt="profile" />
        </div>
        <CiCamera className="absolute w-[28px] h-[28px] bottom-5 right-4 text-gray-700" />
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleProfile}
        className="w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center"
      >
        <input
          type="file"
          accept="image/*"
          ref={image}
          hidden
          onChange={handleImage}
        />

        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-[90%] h-[50px] outline-none text-gray-700 text-[15px] border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg"
          type="text"
          placeholder="Enter your name"
          required
        />

        <input
          value={userData?.userName}
          className="w-[90%] h-[50px] outline-none text-gray-400 text-[15px] border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg"
          type="text"
          readOnly
        />

        <input
          value={userData?.email}
          className="w-[90%] h-[50px] outline-none text-gray-400 text-[15px] border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg"
          type="email"
          readOnly
        />

        <button
          className="bg-[#20c7ff] px-[20px] py-[10px] rounded-xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold text-white hover:bg-[#0aaed9] transition duration-300"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
