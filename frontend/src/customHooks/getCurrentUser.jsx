import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/slice/userSlice";
import axios from "axios";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userSlice);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/users/current`,
          { withCredentials: true }
        );
        dispatch(setUserData(res.data));
      } catch (error) {
        console.log("Failed to fetch current user:", error.message);
      }
    };
    if (!userData) {
      fetchUser();
    }
  }, [dispatch, userData]);
};

export default useCurrentUser;
