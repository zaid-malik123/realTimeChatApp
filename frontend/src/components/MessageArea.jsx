import { IoIosArrowRoundBack } from "react-icons/io";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { FaImage } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import dp from "../assets/dp.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/slice/userSlice";
import { setMessages, appendMessage } from "../redux/slice/messageSlice";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import SenderMessage from "./SenderMessage";
import RecieverMessage from "./RecieverMessage";

const MessageArea = () => {
  const dispatch = useDispatch();
  const { selectedUser, userData, socket } = useSelector(
    (state) => state.userSlice
  );
  const { messages } = useSelector((state) => state.messageSlice);

  const [emojiPicker, setEmojiPicker] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setBackendImage] = useState("");
  const image = useRef();

  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setEmojiPicker(false);
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.length === 0 && backendImage == null) {
      return;
    }
    try {
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );

      dispatch(appendMessage(res.data)); // ✅ safe append
      setInput("");
      setFrontendImage(null);
      setBackendImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewMsg = (msg) => {
      dispatch(appendMessage(msg)); // ✅ function nahi bhejna
    };

    socket.on("newMsg", handleNewMsg);
    return () => socket.off("newMsg", handleNewMsg);
  }, [socket, dispatch]);

  return (
    <div
      className={`lg:w-[70%] relative w-full h-full ${
        selectedUser ? "flex" : "hidden"
      } lg:block bg-slate-200 border-l-2 border-gray-300`}
    >
      {selectedUser ? (
        <div className="w-full h-[100vh] flex flex-col">
          <div className="w-full h-[100px] bg-[#1797c2] rounded-b-[30px] shadow-gray-400 shadow-lg flex items-center px-[20px] gap-[20px]">
            <div
              onClick={() => dispatch(setSelectedUser(null))}
              className="cursor-pointer"
            >
              <IoIosArrowRoundBack className="w-[40px] h-[40px] text-white" />
            </div>
            <div className="w-[50px] h-[50px] overflow-hidden rounded-full flex justify-center items-center bg-white shadow-lg shadow-gray-500">
              <img
                className="h-[100%]"
                src={selectedUser?.image || dp}
                alt=""
              />
            </div>
            <h1 className="text-white font-semibold text-[20px]">
              {selectedUser?.name || "user"}
            </h1>
          </div>

          <div className="w-full h-[70%] flex flex-col py-[30px] px-[20px] overflow-auto gap-[20px]">
            {emojiPicker && (
              <div className="absolute bottom-[120px] left-[20px]">
                <EmojiPicker
                  width={250}
                  height={350}
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}

            {Array.isArray(messages) &&
              messages.map((msg) =>
                msg.sender === userData._id ? (
                  <SenderMessage
                    key={msg._id}
                    image={msg.image}
                    message={msg.message}
                  />
                ) : (
                  <RecieverMessage
                    key={msg._id}
                    image={msg.image}
                    message={msg.message}
                  />
                )
              )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full justify-center items-center flex flex-col">
          <h1 className="text-gray-700 font-bold text-[50px]">
            Welcome to Chatly
          </h1>
          <span className="text-gray-700 font-semibold text-[30px]">
            Chat friendly !
          </span>
        </div>
      )}

      {selectedUser && (
        <div className="w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex items-center justify-center">
          {frontendImage && (
            <img
              src={frontendImage}
              className="w-[80px] absolute bottom-[100px] right-[20%] rounded-lg shadow-lg shadow-gray-400"
              alt="preview"
            />
          )}
          <form
            onSubmit={handleSendMessage}
            className="w-[95%] lg:w-[70%] h-[60px] bg-[#1797c2] shadow-gray-400 shadow-lg rounded-full flex items-center gap-[20px] px-[20px]"
          >
            <div onClick={() => setEmojiPicker((prev) => !prev)}>
              <RiEmojiStickerLine className="w-[25px] h-[25px] text-white cursor-pointer z-[100]" />
            </div>
            <input
              onChange={handleImage}
              type="file"
              accept="image/*"
              hidden
              ref={image}
            />
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="w-full h-full outline-none border-0 text-[19px] bg-transparent text-white px-[10px] placeholder-white"
              type="text"
              placeholder="Message"
            />
            <div onClick={() => image.current.click()}>
              <FaImage className="w-[25px] h-[25px] text-white cursor-pointer" />
            </div>
            {(input.length > 0 || backendImage) && (
              <button type="submit">
                <IoMdSend className="w-[25px] h-[25px] text-white cursor-pointer" />
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
