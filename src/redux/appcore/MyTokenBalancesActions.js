import {ADD_TOKENBALANCES} from '../types';
import axios from 'axios';

export const GetTokenBalances = wallet_address => {
  return dispatch => {
    let res = [];

    axios
      .get(
        'https://suprblack.xyz/api/users/get_erc20_token_balance/' +
          wallet_address +
          '/',
      )
      .then(response => {
        res = response.data;
      })
      .then(() =>
        dispatch({
          type: ADD_TOKENBALANCES,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
