import { useEffect, useRef } from "react";
import dp from "../assets/dp.jpeg";
import { useSelector } from "react-redux";

const RecieverMessage = ({ image, message }) => {
  const scroll = useRef();
  const { otherUsers, selectedUser } = useSelector((state) => state.userSlice);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [image, message]);

  const handleImageScroll = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex items-end gap-2 w-full" ref={scroll}>
      {/* Profile picture */}
      <div className="w-[30px] h-[30px] rounded-full bg-white shadow-md overflow-hidden">
        <img
          src={selectedUser?.image || dp}
          alt="receiver"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Message bubble */}
      <div className="max-w-[60%] bg-[#20c7ff] px-4 py-2 text-white text-[16px] rounded-2xl rounded-tl-none shadow-md flex flex-col gap-2">
        {image && (
          <img
            className="w-[150px] rounded-lg"
            src={image}
            alt="received"
            onLoad={handleImageScroll}
          />
        )}
        {message && <span>{message}</span>}
      </div>
    </div>
  );
};

export default RecieverMessage;
