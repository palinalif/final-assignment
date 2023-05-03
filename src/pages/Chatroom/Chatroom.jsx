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

  const leaveRoom = () => {
    socket.emit("partroom", chatroomName);
    navigate("/chatrooms");
  }
  useEffect(() => {
    // check if user is logged in
    
    const username = localStorage.getItem("username")
      // watch for logged in user being banned, kicked, and opped so we can update accordingly
      socket.on("banned", (room, user, localUsername) => {
        if (room === chatroomName && user === username) {
          alert("You have been banned from " + room + ".");
          navigate("/chatrooms");
        }
      });
      socket.on("kicked", (room, user, localUsername) => {
        if (room === chatroomName && user === username) {
          alert("You have been kicked from " + room + ".");
          navigate("/chatrooms");
        }
      });
  }, []);

  return (
    <div className="chatroom-container">
      <button onClick={leaveRoom}>Leave Room</button>
      <MessagesWindow chatroomName={chatroomName}/>
      <UserList chatroomName={chatroomName}/>
    </div>
  );
};

export default Chatroom;