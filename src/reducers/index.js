import { combineReducers } from 'redux';
import socket from './socketReducer';
import username from './userReducer';

export default combineReducers({
    socket,
    username
});