import React, { useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../actions/userActions";

const Start = () => {
  const navigate = useNavigate();
  const socket = useSelector(({ socket }) => socket);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("connecting to socket...");
    dispatch({ type: 'CONNECT_SOCKET' });
  }, []);

  const validateName = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    socket.emit("adduser", username, (available) => {
      if (available) {
        dispatch(addUser(username));
        navigate("/chatroom");
      } else {
        console.log("Username is taken");
      }
    });
    // if the return value from adduser is true, navigate to the chatrooms page
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