import {ADD_MYAPPS} from '../types';
import axios from 'axios';

export const GetMyApps = user_id => {
  return dispatch => {
    let res = [];

    axios
      // .get('www.suprblack.xyz/api/users/my_dapps/' + String(user_id) + '/')
      .get('https://run.mocky.io/v3/ce81300d-5eb0-4d50-96d0-b76f48b67df4')
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
