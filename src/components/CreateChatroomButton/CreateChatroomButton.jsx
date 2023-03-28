import "./style.css";
import React from "react";
import { useNavigate } from "react-router";

const CreateChatroomButton = () => {
  const navigate = useNavigate();
  const createChatroom = () => {
    navigate("/chatrooms/new");
  };
  return (
    <>
      <button onClick={createChatroom}>Create Chatroom</button>
    </>
  );
};

export default CreateChatroomButton;
