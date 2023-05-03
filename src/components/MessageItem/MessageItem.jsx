import "./style.css";
import React from "react";
import PropTypes from 'prop-types';

const MessageItem = (props) => {
  return (
    <p>[{props.timestamp}] {props.sender}: {props.message}</p>
  );
};

export default MessageItem;

MessageItem.propTypes = {
  data: PropTypes.string.isRequired
}