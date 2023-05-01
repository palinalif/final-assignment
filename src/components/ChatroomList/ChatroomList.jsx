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
    socket.connect();
    // check if user is logged in
    const username = localStorage.getItem("username")
    if (username != null) {
      socket.emit("adduser", username, (available) => {
        if (available) {
          dispatch(addUser(username));
        }
      });
    }
    else {
      navigate("/");
    }

    // Do the chatroom list stuff
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
      socket.disconnect();
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
