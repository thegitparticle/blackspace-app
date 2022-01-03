import {ADD_MYAPPS} from './types';
import axios from 'axios';

export const GetMyApps = user_id => {
  return dispatch => {
    let res = [];

    axios
      .get('https://run.mocky.io/v3/b2714da6-08f9-4ac3-b582-24555d31331c')
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
