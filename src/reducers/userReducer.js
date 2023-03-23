import * as constants from '../constants';

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case constants.ADD_USER:
            const { username } = action.payload;
            localStorage.setItem('username', username);
            return username;
            break;
    
        default:
            return state;
    }
}