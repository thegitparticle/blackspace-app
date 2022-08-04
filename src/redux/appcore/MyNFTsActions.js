import {ADD_MYNFTS} from '../types';
import axios from 'axios';

export const GetMyNfts = userid => {
  return dispatch => {
    let res = [];

    axios
      // .get(
      //   'https://suprblack.xyz/api/users/get_erc20_token_balance/' +
      //   wallet_address +
      //   '/',
      // )
      .get(
        'https://suprblack.xyz/api/users/request_nft_assets_for_wallet/' +
          String(userid) +
          '/',
      )
      .then(response => {
        res = response.data;
      })
      .then(() =>
        dispatch({
          type: ADD_MYNFTS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
