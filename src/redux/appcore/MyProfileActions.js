import {ADD_MYAPPS, ADD_MYPROFILEDETAILS} from '../types';
import axios from 'axios';

export const GetMyProfileDetails = wallet_address => {
  return dispatch => {
    let res = [];

    axios
      .get(
        'https://suprblack.xyz/api/users/list?wallet_address=' + wallet_address,
      )
      .then(response => (res = response.data))
      .then(() =>
        dispatch({
          type: ADD_MYPROFILEDETAILS,
          payload: res[0],
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
