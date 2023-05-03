import React, { useEffect, useState } from "react";
import "./style.css";
import PropTypes from 'prop-types';
import MessageList from "../MessageList/MessageList";
import { socket } from "../../services/socketService";

const MessagesWindow = (props) => {
  const [message, setMessage] = useState("");
  const sendMessage = (evt) => {
    evt.preventDefault();
    // check if message is a command
    if (message.startsWith("/whisper")) {
      let recUsername = message.split(" ")[1];
      let whisperMsg = message.split(" ").slice(2).join(" ");
      socket.emit("privatemsg", {/*what goes in here??*/}, (success) => {
        if (success) {
          console.log("private message sent successfully!");
          // Display PM client side somehow?
          
        }
      })
    }
    else {
      socket.emit("sendmsg", {roomName: props.chatroomName, msg: message}, (success) => {
        console.log(success);
      });
    }
  }
  
  const updateMessage = (evt) => {
    setMessage(evt.target.value);
  }
  return (  
    <div className="messages-window-container">
        <MessageList chatroomName={props.chatroomName}/>
        <form onSubmit={sendMessage} className="messages-window-chat">
          <input type="text" value={message} name="message" onChange={updateMessage} className="messages-window-chat-input"/>
          <input type="submit" value="Send"/>
        </form>
    </div>
  );
};

export default MessagesWindow;

MessagesWindow.propTypes = {
  chatroomName: PropTypes.string.isRequired 
}