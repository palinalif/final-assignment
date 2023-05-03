import React, { useState, useEffect } from "react";
import { socket } from "../../services/socketService";
import UserItem from "../UserItem/UserItem";
import PropTypes from 'prop-types';

import "./style.css";

const UserList = (props) => {
  const [localUsers, setUsers] = useState([]);
  const [localOps, setOps] = useState([]);
  const [isOpped, setIsOpped] = useState(false);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    socket.on("updateusers", (room, users, ops) => {

      const usersList = Object.keys(users);
      usersList.concat(Object.keys(ops));
      setUserList(usersList);

      console.log("userslist:" + usersList);

      if (room === props.chatroomName) {
        setUsers(users);
        setOps(ops);
      }
      
      const user = localStorage.getItem("username");
      console.log("localOps:");
      console.log(localOps);
      if (localOps.indexOf(user) !== -1) {
        setIsOpped(true); 
      }
      else {
        setIsOpped(false);
      }
    });
    // Disconnect from the socket when the component unmounts
    return () => {
      socket.off("updateusers");
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