import React, { useState, useEffect } from "react";
import { socket } from "../../services/socketService";
import UserItem from "../UserItem/UserItem";
import PropTypes from 'prop-types';

import "./style.css";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [ops, setOps] = useState([]);
  const [isOpped, setIsOpped] = useState(false);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    socket.connect();
    socket.on("updateusers", (room, users, ops) => {
      console.log("User list was updated");
      console.log(room);
      console.log(users);

      const usersList = Object.keys(users);
      usersList.concat(Object.keys(ops));
      setUserList(usersList);

      console.log(usersList);

      if (room === props.chatroomName) {
        console.log("room matches the current chatroom");
        setUsers(users);
        setOps(ops);
      }
      
      const user = localStorage.getItem("username");
      if (ops.indexOf(user) !== -1) {
        setIsOpped(true);
      }
      else {
        setIsOpped(false);
      }
    });
    // Disconnect from the socket when the component unmounts
    return () => {
      socket.off("updateusers");
      socket.disconnect();
    };
  }, []);

  return (
    <>
    <div className="user-list-container">
    {userList.map((username) => (
      <UserItem username={username} opped={isOpped} chatroomName={props.chatroomName}/>
    ))}
    </div>
    </>
  );
};

export default UserList;

UserList.propTypes = {
  chatroomName: PropTypes.string
}