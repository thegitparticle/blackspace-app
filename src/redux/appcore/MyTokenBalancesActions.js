import {ADD_TOKENBALANCES} from '../types';
import axios from 'axios';

export const GetTokenBalances = wallet_address => {
  return dispatch => {
    let res = [];

    axios
      // .get(
      //   'https://suprblack.xyz/api/users/get_erc20_token_balance/' +
      //     wallet_address +
      //     '/',
      // )
      .get(
        'https://suprblack.xyz/api/users/get_erc20_token_balance/0xc5F59709974262c4AFacc5386287820bDBC7eB3A/',
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
