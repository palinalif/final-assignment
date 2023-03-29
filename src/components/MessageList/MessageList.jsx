import "./style.css";
import { useEffect, useState } from "react";
import { socket } from "../../services/socketService";
import MessageItem from "../MessageItem/MessageItem";

const MessageList = (props) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
    socket.on("updatechat", (room, messageHistory) => {
      console.log("Chat was updated");
      console.log(room);
      console.log(messageHistory);

      if (room === props.chatroomName) {
        setMessages(messageHistory);
      }
    });
    // Disconnect from the socket when the component unmounts
    return () => {
      socket.off("updatechat");
    };
  }, []);


  return (
    <div>
      {messages.map((message) => (
        <MessageItem data={message} />
      ))}
    </div>
  );
};

export default MessageList;
