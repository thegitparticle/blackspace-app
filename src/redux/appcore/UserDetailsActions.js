import {ADD_USERDETAILS} from '../types';

export const AddUserDetails = userdetails => {
  return dispatch => {
    dispatch({
      type: ADD_USERDETAILS,
      payload: userdetails,
    });
  };
};
