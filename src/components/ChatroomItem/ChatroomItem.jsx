import "./style.css";
import React from "react";

const ChatroomItem = (props) => {
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
      <p></p>
    </div>
  );
};

export default ChatroomItem;
