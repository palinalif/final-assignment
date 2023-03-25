import React, { useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../actions/userActions";
import { socket } from "../../services/socketService";

const Start = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateName = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    socket.connect();
    socket.emit("adduser", username, (available) => {
      if (available) {
        dispatch(addUser(username));
        navigate("/chatrooms");
      } else {
        console.log("Username is taken");
      }
    });
  };

  // TOOD: if username exists in localstorage, automatically redirect to chatroom w/ previous username

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
