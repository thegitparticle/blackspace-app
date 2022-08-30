import {ADD_HOMORAV2TRADINGVOLS} from '../types';
import axios from 'axios';

export const GetHomoraTradingVols = () => {
  return dispatch => {
    let res = [];

    axios
      .get('https://api.homora.alphaventuredao.io/v2/1/trading-volumes')
      .then(response => {
        res = response.data;
      })
      .then(() =>
        dispatch({
          type: ADD_HOMORAV2TRADINGVOLS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
