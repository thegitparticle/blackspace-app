import {ADD_MYAPPS, ADD_MYPROFILEDETAILS} from '../types';
import axios from 'axios';

export const GetMyProfileDetails = (userid, wallet_address) => {
  return dispatch => {
    let res = [];

    axios

      .get(
        'https://suprblack.xyz/api/users/update_wallet_profile/' +
          String(userid) +
          String(wallet_address) +
          '/',
      )
      .catch(err => {
        console.log(err);
      });

    axios
      .get('https://suprblack.xyz/api/users/profile-update/?user=' + userid)
      .then(response => {
        res = response.data;
      })
      .then(() =>
        dispatch({
          type: ADD_MYPROFILEDETAILS,
          payload: res[0],
        }),
      )
      .catch(err => {
        console.log(err + 'my profile actions');
      });
  };
};
