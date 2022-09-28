import {ADD_HOMORAV2TOKENS} from '../types';
import axios from 'axios';

export const GetHomoraTokens = () => {
  return dispatch => {
    let res = [];

    axios
      .get('https://api.homora.alphaventuredao.io/v2/1/tokens')
      .then(response => {
        res = response.data;
      })
      .then(() =>
        dispatch({
          type: ADD_HOMORAV2TOKENS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
