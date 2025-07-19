import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

// Custom Hooks
import useCurrentUser from "./customHooks/getCurrentUser";
import useOtherUsers from "./customHooks/getOtherUsers";

// Redux
import { setOnlineUser, setSocket } from "./redux/slice/userSlice";

// ✅ Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useCurrentUser();
  useOtherUsers();

  const dispatch = useDispatch();
  const { userData, socket } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (userData) {
      const socket_io = io(`${import.meta.env.VITE_BASE_URL}`, {
        query: {
          userId: userData?._id,
        },
      });

      dispatch(setSocket(socket_io));

      socket_io.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUser(users));
      });

      return () => {
        socket_io.close();
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [userData]);

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to="/profile" />}
        />
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/signup" />}
        />
      </Routes>

      {/* ✅ Toast container: Bas ek baar lagana hota hai */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
