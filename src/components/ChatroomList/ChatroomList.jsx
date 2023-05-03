import "./style.css";
import { useEffect, useState } from "react";
import { addUser } from "../../actions/userActions";
import ChatroomItem from "../ChatroomItem/ChatroomItem";
import { socket } from "../../services/socketService";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const ChatroomList = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("roomlist", (rooms) => {
      const roomList = Object.keys(rooms).map((key) => ({
        ...rooms[key],
        title: key,
      }));
      setChatrooms(roomList);
    });

    socket.emit("rooms");
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
