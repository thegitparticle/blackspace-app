import {ADD_MYAPPS} from './types';
import axios from 'axios';

export const GetMyApps = user_id => {
  return dispatch => {
    let res = [];

    axios
      .get('https://run.mocky.io/v3/6f2fbb0a-8766-4558-a4a5-175b4b2dec2b')
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
