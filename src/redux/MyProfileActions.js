import {ADD_MYPROFILEDETAILS, GET_MYPROFILEDETAILS} from './types';

export const AddMyProfileDetails = myProfileDetails => {
  return dispatch => {
    dispatch({
      type: ADD_MYPROFILEDETAILS,
      payload: myProfileDetails,
    });
  };
};
