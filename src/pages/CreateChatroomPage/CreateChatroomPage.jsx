import "./style.css";
import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../actions/userActions";
import { socket } from "../../services/socketService";

const CreateChatroomPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLocked, setIsLocked] = useState(false);
  const [room, setRoom] = useState("");
  const [pass, setPass] = useState("");

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
  }, []);

  const createChatroom = (evt) => {
    evt.preventDefault();

    socket.emit(
      "joinroom",
      { room, pass: isLocked ? pass : undefined },
      (success, reason) => {
        if (success) {
          alert("The room was successfully created!");
          navigate(`/chatrooms/${room}`);
        } else {
          alert(
            "Oops, something went wrong and we could not create your chatroom!"
          );
          console.log(reason);
        }
      }
    );
    socket.emit("rooms"); // to update chatroomList
  };

  const handleLockedChange = (evt) => {
    setIsLocked(evt.target.checked);
  };

  return (
    <>
      <form onSubmit={createChatroom} className="createChatroomForm">
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          type="text"
          required
        />
        <div>
          <label htmlFor="locked">Locked? </label>
          <input
            type="checkbox"
            name="locked"
            checked={isLocked}
            onChange={handleLockedChange}
          />
        </div>
        {isLocked ? (
          <div className="passwordArea">
            <label for="password">Password:</label>
            <input
              type="password"
              name="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
        ) : (
          <></>
        )}

        <input type="submit" />
      </form>
    </>
  );
};

export default CreateChatroomPage;
