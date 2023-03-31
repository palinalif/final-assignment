import React, { useEffect, useState } from "react";
import "./style.css";
import MessageList from "../MessageList/MessageList";
import { socket } from "../../services/socketService";

const MessagesWindow = (props) => {
  const [message, setMessage] = useState("");
  const sendMessage = (evt) => {
    evt.preventDefault();
    socket.connect();
    socket.emit("sendmsg", {roomName: props.chatroomName, msg: message});
  }

  useEffect(() => {
    return () => {
      socket.disconnect();
    }
  });

  const updateMessage = (evt) => {
    setMessage(evt.target.value);
  }
  return (
    <div className="messages-window-container">
        <MessageList chatroomName={props.chatroomName}/>
        <form onSubmit={sendMessage}>
          <input type="text" value={message} name="message" onChange={updateMessage}/>
          <input type="submit" value="Send"/>
        </form>
    </div>
  );
};

export default MessagesWindow;
