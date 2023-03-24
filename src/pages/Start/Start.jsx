import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../actions/userActions";
import { CONNECT_SOCKET } from "../../constants";

const Start = () => {
  const navigate = useNavigate();
  const socket = useSelector(({ socket }) => socket);
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log("connecting to socket...");
    dispatch({ type: CONNECT_SOCKET });
    socket.on("connect", () => {
      console.log("Socket connected!")
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected.");
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const validateName = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    if (isConnected) {
      socket.emit("adduser", username, (available) => {
        if (available) {
          dispatch(addUser(username));
          navigate("/chatroom");
        } else {
          console.log("Username is taken");
        }
      });
    }
    else {
      console.log("Socket is not connected");
    }
    
  };

  return (
    <div className="start-container">
      <form onSubmit={validateName}>
        <label htmlFor="username">Username: </label>
        <input name="username" required />
        <input type="submit" className="submitButton" value="Continue" />
      </form>
    </div>
  );
};

export default Start;