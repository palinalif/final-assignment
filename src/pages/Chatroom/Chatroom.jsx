import React, { useEffect } from "react";
import "./style.css";
import { useParams } from "react-router";
import MessagesWindow from "../../components/MessagesWindow/MessagesWindow";
import UserList from "../../components/UserList/UserList";


const Chatroom = () => {
  const { chatroomName } = useParams();

  return (
    <div className="chatroom-container">
      <MessagesWindow chatroomName={chatroomName}/>
      <UserList />
    </div>
  );
};

export default Chatroom;
