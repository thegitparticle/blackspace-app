import {ADD_MARKETPRICES} from './types';
import axios from 'axios';

export const GetMarketPrices = () => {
  return dispatch => {
    let res = [];

    axios
      .get('https://run.mocky.io/v3/66004f3d-e25e-43e8-a95e-a44a5a614508')
      .then(response => (res = response.data))
      .then(() =>
        dispatch({
          type: ADD_MARKETPRICES,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
