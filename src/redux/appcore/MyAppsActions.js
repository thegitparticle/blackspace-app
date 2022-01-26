import {ADD_MYAPPS} from '../types';
import axios from 'axios';

export const GetMyApps = user_id => {
  return dispatch => {
    let res = [];

    axios
      // .get('www.suprblack.xyz/api/users/my_dapps/' + String(user_id) + '/')
      .get('https://run.mocky.io/v3/cb5eb571-ccec-4f1e-827e-e38a1efb5373')
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
