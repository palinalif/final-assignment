import React, { useState, useEffect } from "react";
import { socket } from "../../services/socketService";
import UserItem from "../UserItem/UserItem";

import "./style.css";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [ops, setOps] = useState([]);
  const [isOpped, setIsOpped] = useState(false);
  useEffect(() => {
    socket.on("updateusers", (room, users, ops) => {
      console.log("User list was updated");
      console.log(room);
      console.log(users); // does users include every user or every non-op user? will need to check
      console.log(ops);

      if (room === props.chatroomName) {
        setUsers(users);
        setOps(ops);
      }
      
      const user = localStorage.getItem("username");
      if (users.indexOf(user) !== -1) {
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
    {users.map((username) => (
      <UserItem data={username} />
    ))}
    </>
  );
};

export default UserList;
