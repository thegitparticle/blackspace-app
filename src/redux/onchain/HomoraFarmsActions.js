import {ADD_HOMORAV2FARMS} from '../types';
import axios from 'axios';

export const GetHomoraFarms = () => {
  return dispatch => {
    let res = [];

    axios
      .get('https://api.homora.alphaventuredao.io/v2/1/pools')
      .then(response => {
        res = response.data;
      })
      .then(() =>
        dispatch({
          type: ADD_HOMORAV2FARMS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
