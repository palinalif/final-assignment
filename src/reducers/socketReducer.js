import io from 'socket.io-client';
import * as constants from '../constants';

export default function socketReducer(state = null, action) {
  switch (action.type) {
    case constants.CONNECT_SOCKET:
      return io('http://localhost:8080');
    default:
      return state;
  }
}