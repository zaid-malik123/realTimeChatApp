import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/slice/userSlice";
import axios from "axios";

const useOtherUsers = () => {
  const dispatch = useDispatch();
  const { userData, otherUsers } = useSelector((state) => state.userSlice);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/users/others`,
          { withCredentials: true }
        );
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log("Failed to fetch other users:", error.message);
      }
    };
    if (userData && !otherUsers) {
      fetchUser();
    }
  }, [dispatch, userData, otherUsers]); 
};

export default useOtherUsers;
