import * as constants from '../constants';

export const addUser = username => ({
    type: constants.ADD_USER,
    payload: username
});