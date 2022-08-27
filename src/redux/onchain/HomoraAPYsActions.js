import {ADD_HOMORAV2APYS} from '../types';
import axios from 'axios';

export const GetHomoraAPYs = () => {
  return dispatch => {
    let res = {};

    axios
      .get('https://api.homora.alphaventuredao.io/v2/1/apys')
      .then(response => {
        res = response.data;
      })
      .then(() =>
        dispatch({
          type: ADD_HOMORAV2APYS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
