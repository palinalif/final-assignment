import { socket } from "../../services/socketService";
import "./style.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import PropTypes from 'prop-types';

const UserItem = (props) => {
  const navigate = useNavigate();
  const kickUser = () => {
    socket.emit("kick", {user: props.username, room: props.roomName}, (success, reason) => {
      if (success) {
        console.log("successfully kicked user");
      }
      else {
        console.log("kicked failed, reason: " + reason);
      }
    });
  }
  const banUser = () => {
    socket.emit("ban", {user: props.username, room: props.roomName}, (success, reason) => {
      if (success) {
        console.log("successfully banned user");
        
      }
      else {
        console.log("Ban failed, reason: " + reason);
      }
    });
  }
  const opUser = () => {
    socket.emit("op", {user: props.username, room: props.roomName}, (success, reason) => {
      if (success) {
        console.log("successfully opped user");
      }
      else {
        console.log("Op failed, reason: " + reason);
      }
    });
  }
  return (
    <div>
        <p>{props.username}</p>
        {props.opped ? <button onClick={kickUser}>Kick</button>: <></>}
        {props.opped ? <button onClick={banUser}>Ban</button> : <></>}
        {props.opped ? <button onClick={opUser}>OP</button> : <></>}
    </div>
  );
};

export default UserItem;

UserItem.propTypes = {
  roomName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  opped: PropTypes.bool.isRequired
}