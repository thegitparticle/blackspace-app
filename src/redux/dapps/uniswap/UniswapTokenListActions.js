import {ADD_UNISWAPTOKENLIST} from '../../types';
import axios from 'axios';

export const GetUniswapTokenList = () => {
  return dispatch => {
    let res = [];

    axios
      .get('https://tokens.coingecko.com/uniswap/all.json')
      .then(response => (res = response.data))
      .then(() =>
        dispatch({
          type: ADD_UNISWAPTOKENLIST,
          payload: res.tokens,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
