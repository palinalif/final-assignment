import React from "react";
import "./style.css";
import ChatroomList from "../../components/ChatroomList/ChatroomList";
import CreateChatroomButton from "../../components/CreateChatroomButton/CreateChatroomButton";

const ChatroomListPage = () => {
  return (
    <div className="chatroom-list-container">
      <CreateChatroomButton />
      <ChatroomList />
    </div>
  );
};

export default ChatroomListPage;
