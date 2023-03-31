import React from "react";
import "./style.css";
import ChatroomList from "../../components/ChatroomList/ChatroomList";
import CreateChatroomButton from "../../components/CreateChatroomButton/CreateChatroomButton";

const ChatroomListPage = () => {
  /* login checking for this page happens in the ChatroomList component for... some reason */
  return (
    <div className="chatroom-list-container">
      <CreateChatroomButton />
      <ChatroomList />
    </div>
  );
};

export default ChatroomListPage;
