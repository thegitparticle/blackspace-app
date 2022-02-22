import {ADD_USERDETAILS} from '../types';
import axios from 'axios';

export const AddUserDetails = wallet_address => {
  console.log(wallet_address);
  return dispatch => {
    let res = [];

    axios
      .get(
        'https://suprblack.xyz/api/users/list/?wallet_address=' +
          wallet_address,
      )
      .then(response => {
        res = response.data;
        console.log(response.data);
      })
      .then(() =>
        dispatch({
          type: ADD_USERDETAILS,
          payload: res[0],
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
