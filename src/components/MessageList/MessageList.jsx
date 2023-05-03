import "./style.css";
import { useEffect, useState } from "react";
import { socket } from "../../services/socketService";
import MessageItem from "../MessageItem/MessageItem";
import PropTypes from 'prop-types';

const MessageList = (props) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
    socket.on("updatechat", (room, messageHistory) => {
      if (room === props.chatroomName) {
        console.log("This room's chat history was updated!");
        setMessages(messageHistory);
      }
      console.log(messages);
    });
    // Disconnect from the socket when the component unmounts
    return () => {
      socket.off("updatechat");
    };
  }, []);


  return (
    <div>
      {messages.map((message) => (
        <MessageItem sender={message.nick} message={message.message} timestamp={message.timestamp} />
      ))}
    </div>
  );
};

export default MessageList;

MessageList.propTypes = {
  chatroomName: PropTypes.string.isRequired
}