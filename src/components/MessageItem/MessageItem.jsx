import "./style.css";
import React from "react";
import PropTypes from 'prop-types';

const MessageItem = (props) => {
  const date = new Date(props.timestamp);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart("0",2);

  return (
    <p>[{hours}:{minutes}] {props.sender}: {props.message}</p>
  );
};

export default MessageItem;

MessageItem.propTypes = {
  data: PropTypes.string.isRequired
}