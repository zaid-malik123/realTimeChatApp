import { useDispatch, useSelector } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import dp from "../assets/dp.jpeg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from "../redux/slice/userSlice";
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("")
  const { userData, otherUsers, selectedUser, onlineUsers, searchData } = useSelector((state) => state.userSlice);
  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
        { withCredentials: true }
      );
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
   const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/users/search?query=${input}`,
        { withCredentials: true }
      );
      dispatch(setSearchData(res.data))

      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    if(input){
      handleSearch();
    }
  },[input])
  return (
    <div className={`lg:w-[30%] w-full h-full overflow-hidden relative bg-slate-200 lg:block  ${!selectedUser ? "block" : "hidden"}`}>
      <div
        className="w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center shadow-lg bg-[#20c7ff] shadow-gray-500 mt-[15px] cursor-pointer fixed bottom-[20px] left-[10px]"
        onClick={handleLogout}
      >
        <AiOutlineLogout className="w-[25px] h-[25px]" />
      </div>
     {input.length > 0 &&  <div className=" top-[250px] absolute bg-white flex w-full h-[500px] overflow-y-auto flex-col gap-[10px] z-[150] items-center pt-[20px] shadow-lg">
                 {searchData?.map((user)=>(
                  <div key={user._id} onClick={()=> {dispatch(setSelectedUser(user))
                    setInput("")
                    setSearch(false)
                  }} className="w-[95%] h-[70px] px-[10px] flex justify-start items-center gap-[20px] bg-white  hover:bg-[#c3c3ff] border-b-2 border-gray-400 ">
             <div className="relative rounded-full  flex justify-center items-center  bg-white">
              <div key={user._id} className="w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center">
                <img className="h-[100%]" src={user?.image || dp} alt="" />
              </div>
             { onlineUsers?.includes(user._id) &&
              <span className="w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#33ff33] shadow-md shadow-gray-400"></span>}
              </div>
        <h1 className="text-gray-700 font-semibold text-[18px]">{user.name || user.userName}</h1>  
       </div>
                 ))}
              </div> }
     

      <div className="w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col  justify-center px-[20px]">
        <h1 className="text-white font-bold text-[25px]">chatly</h1>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-700 font-semibold text-[25px]">
            Hii, {userData?.name || "user"}
          </h1>
          <div
            className="w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center shadow-lg shadow-gray-500 cursor-pointer bg-white"
            onClick={() => navigate("/profile")}
          >
            <img className="h-[100%]" src={userData?.image || dp} alt="" />
          </div>
        </div>
        <div className="w-full flex items-center gap-[20px] overflow-y-auto py-[15px]">
          {!search && (
            <div
              className="w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center shadow-lg bg-white shadow-gray-500 mt-[15px] cursor-pointer"
              onClick={() => setSearch(true)}
            >
              <IoSearchSharp className="w-[25px] h-[25px]" />
            </div>
          )}
          {search && (
            <form className="w-full h-[60px] shadow-lg bg-white shadow-gray-500 flex items-center gap-[10px] mt-[15px] rounded-full overflow-hidden px-[20px] relative">
              <IoSearchSharp className="w-[25px] h-[25px]" />
              <input
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                className="w-full h-full p-[10px] outline-0 border-0 text-[17px]"
                type="text"
                placeholder="search users ..."
              />
              <RxCross1
                className="w-[25px] h-[25px] cursor-pointer"
                onClick={() => setSearch(false)}
              />
              
            </form>
          )}
          {!search &&
            otherUsers?.map((user) => (
              onlineUsers?.includes(user._id) &&
              <div className="relative rounded-full shadow-lg shadow-gray-500 flex justify-center items-center mt-[10px] bg-white cursor-pointer" onClick={()=> dispatch(setSelectedUser(user))}>
              <div key={user._id} className="w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center">
                <img className="h-[100%]" src={user?.image || dp} alt="" />
              </div>
              <span className="w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#33ff33] shadow-md shadow-gray-400"></span>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full h-[50%] overflow-auto flex flex-col gap-[15px] items-center mt-[20px] cursor-pointer">
        {otherUsers?.map((user) => (
       <div key={user._id} onClick={()=> dispatch(setSelectedUser(user))} className="w-[95%] h-[60px] flex justify-start items-center gap-[20px] bg-white shadow-gray-500 shadow-lg rounded-full hover:bg-[#c3c3ff] ">
             <div className="relative rounded-full shadow-lg shadow-gray-500 flex justify-center items-center mt-[10px] bg-white">
              <div key={user._id} className="w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center">
                <img className="h-[100%]" src={user?.image || dp} alt="" />
              </div>
             { onlineUsers?.includes(user._id) &&
              <span className="w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#33ff33] shadow-md shadow-gray-400"></span>}
              </div>
        <h1 className="text-gray-700 font-semibold text-[18px]">{user.name || user.userName}</h1>  
       </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
