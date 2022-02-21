import {ADD_ALLTIPS} from '../types';
import axios from 'axios';

export const GetAllTips = () => {
  return dispatch => {
    let res = [];

    axios
      .get('https://suprblack.xyz/api/dapps/tips/')
      .then(response => {
        res = response.data;
      })
      .then(() =>
        dispatch({
          type: ADD_ALLTIPS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
