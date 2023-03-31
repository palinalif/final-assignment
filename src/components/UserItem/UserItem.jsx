import { socket } from "../../services/socketService";
import "./style.css";
import React, { useEffect } from "react";

const UserItem = (props) => {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    }
  });
  const kickUser = () => {
    socket.emit("kick", {user: props.username}, (success, reason) => {
      if (success) {
        console.log("successfully kicked user");
      }
      else {
        console.log("kicked failed, reason: " + reason);
      }
    });
  }
  const banUser = () => {
    socket.emit("ban", {user: props.username}, (success, reason) => {
      if (success) {
        console.log("successfully banned user");
      }
      else {
        console.log("Ban failed, reason: " + reason);
      }
    });
  }
  const opUser = () => {
    socket.emit("op", {user: props.username}, (success, reason) => {
      if (success) {
        console.log("successfully opped user");
      }
      else {
        console.log("Op failed, reason: " + reason);
      }
    });
  }
  const PMUser = () => {}
  return (
    <div>
        <p>{props.username}</p>
        {props.opped ? <button onClick={kickUser}>Kick</button>: <></>}
        {props.opped ? <button onClick={banUser}>Ban</button> : <></>}
        {props.opped ? <button onClick={opUser}>OP</button> : <></>}
        <button onClick={PMUser}><span class="material-symbols-outlined">mail</span></button>
    </div>
  );
};

export default UserItem;
