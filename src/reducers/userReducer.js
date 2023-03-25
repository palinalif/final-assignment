import * as constants from "../constants";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case constants.ADD_USER:
      const username = action.payload;
      console.log("username:" + username);
      localStorage.setItem("username", username);
      return username;
    default:
      return state;
  }
}
