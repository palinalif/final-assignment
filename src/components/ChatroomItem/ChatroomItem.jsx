import "./style.css";
import React from "react";
import { socket } from "../../services/socketService";
import { useNavigate } from "react-router";
import PropTypes from 'prop-types';

const ChatroomItem = (props) => {
  let navigate = useNavigate();
  const joinRoom = () => {
    console.log("joining " + props.data.title + "...");
    let pass = undefined;
    if (props.data.locked) {
      while(pass !== props.data.password){
        pass = window.prompt("Room is locked, please enter password:", undefined);
        if (pass === null || pass === "") {
          // prompt cancelled
          break;
        }
      }
      // user got password correct
    }
    // emit joinroom event
    let chatroomName = props.data.title;
    socket.connect();
    socket.emit("joinroom",
    { room: chatroomName, pass: pass },
    (success, reason) => {
      if (success) {
        navigate(`/chatrooms/${chatroomName}`);
      } else {
        alert(
          "Oops, something went wrong and we could not create your chatroom!"
        );
        console.log(reason);
      }
    });
  }
  return (
    <div className="chatroomItem">
      <p>{props.data.title}</p>
      <p>
        <span class="material-symbols-outlined">person</span>{" "}
        {Object.keys(props.data.users).length}
      </p>
      <p>
        {props.data.locked ? (
          <span class="material-symbols-outlined">lock</span>
        ) : (
          <></>
        )}
      </p>
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default ChatroomItem;

ChatroomItem.propTypes = {
  data: PropTypes.object.isRequired
}