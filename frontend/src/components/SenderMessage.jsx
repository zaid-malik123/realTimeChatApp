import React, { useRef, useEffect } from "react";
import dp from "../assets/dp.jpeg";
import { useSelector } from "react-redux";

const SenderMessage = ({ image, message }) => {
  const scroll = useRef();
  const { userData } = useSelector((state) => state.userSlice);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [image, message]);

  const handleImageScroll = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex items-end justify-end gap-2 w-full" ref={scroll}>
      {/* Message bubble */}
      <div className="max-w-[60%] bg-[#1797c2] px-4 py-2 text-white text-[16px] rounded-2xl rounded-tr-none shadow-md flex flex-col gap-2">
        {image && (
          <img
            className="w-[150px] rounded-lg"
            src={image}
            alt="sent"
            onLoad={handleImageScroll}
          />
        )}
        {message && <span>{message}</span>}
      </div>

      {/* Profile picture */}
      <div className="w-[30px] h-[30px] rounded-full bg-white shadow-md overflow-hidden">
        <img src={userData?.image || dp} alt="sender" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SenderMessage;
