import {ADD_MYAPPS} from '../types';
import axios from 'axios';

export const GetMyApps = user_id => {
  return dispatch => {
    let res = [];

    axios
      .get('www.suprblack.xyz/api/users/my_dapps/' + String(user_id) + '/')
      .then(response => (res = response.data))
      .then(() =>
        dispatch({
          type: ADD_MYAPPS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
