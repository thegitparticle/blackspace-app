import {ADD_MARKETPRICES} from './types';
import axios from 'axios';

export const GetMarketPrices = () => {
  return dispatch => {
    let res = [];

    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false',
      )
      .then(response => {
        // (res = response.data)
        Object.keys(response.data).forEach(key =>
          res.push({
            coin_name: key,
            coin_details: response.data[key],
          }),
        );
      })
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
