import React, { useState, useEffect } from "react";
import { socket } from "../../services/socketService";
import UserItem from "../UserItem/UserItem";

import "./style.css";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [ops, setOps] = useState([]);
  const [isOpped, setIsOpped] = useState(false);
  useEffect(() => {
    socket.connect();
    socket.on("updateusers", (room, users, ops) => {
      console.log("User list was updated");
      console.log(room);
      console.log(users); // does users include every user or every non-op user? will need to check
      console.log(ops);

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
    {users.map((username) => (
      <UserItem username={username} opped={isOpped} chatroomName={chatroomName}/>
    ))}
    </>
  );
};

export default UserList;
