import {ADD_MYAPPS} from './types';
import axios from 'axios';

export const GetMyApps = user_id => {
  return dispatch => {
    let res = [];

    axios
      .get('https://run.mocky.io/v3/1253d9c6-e54e-448f-abf5-d03fc06d91b0')
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
