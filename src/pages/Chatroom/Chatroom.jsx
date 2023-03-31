import React, { useEffect } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router";
import MessagesWindow from "../../components/MessagesWindow/MessagesWindow";
import UserList from "../../components/UserList/UserList";
import { useDispatch } from "react-redux";
import { socket } from "../../services/socketService";
import { addUser } from "../../actions/userActions";

const Chatroom = () => {
  const { chatroomName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();
    // check if user is logged in
    const username = localStorage.getItem("username")
    if (username != null) {
      socket.emit("adduser", username, (available) => {
        if (available) {
          dispatch(addUser(username));
        }
      });
    }
    else {
      navigate("/");
    }
  }, []);

  return (
    <div className="chatroom-container">
      <MessagesWindow chatroomName={chatroomName}/>
      <UserList chatroomName={chatroomName}/>
    </div>
  );
};

export default Chatroom;
