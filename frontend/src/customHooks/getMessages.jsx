import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/slice/userSlice";
import axios from "axios";
import { setMessages } from "../redux/slice/messageSlice";

const useGetMessage = () => {
  const dispatch = useDispatch();
  const { userData, otherUsers, selectedUser } = useSelector((state) => state.userSlice);
  const {messages} = useSelector(state => state.messageSlice)
  useEffect(() => {
    if (!selectedUser?._id) return;

    const fetchMessage = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/message/get/${selectedUser._id}`,
          { withCredentials: true }
        );
        dispatch(setMessages(res.data));
      } catch (error) {
        console.log("Failed to fetch messages:", error.message);
      }
    };

    fetchMessage();
  }, [dispatch, selectedUser, userData]); 
};

export default useGetMessage;
