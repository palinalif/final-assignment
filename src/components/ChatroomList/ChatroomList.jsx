import "./style.css";
import { useEffect, useState } from "react";
import ChatroomItem from "../ChatroomItem/ChatroomItem";
import { socket } from "../../services/socketService";

const ChatroomList = () => {
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    socket.emit("rooms");

    socket.on("roomlist", (rooms) => {
      const roomList = Object.keys(rooms).map((key) => ({
        ...rooms[key],
        title: key,
      }));
      setChatrooms(roomList);
    });
    // Disconnect from the socket when the component unmounts
    return () => {
      socket.off("roomlist");
    };
  }, []);

  return (
    <div>
      {chatrooms.map((room) => (
        <ChatroomItem key={room.title} data={room}>
          {room.title}
        </ChatroomItem>
      ))}
    </div>
  );
};

export default ChatroomList;
