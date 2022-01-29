import {ADD_UNISWAPSTAKEPOOLS} from '../../types';
import axios from 'axios';

export const GetUniswapStakePools = () => {
  return dispatch => {
    let res = [];

    axios
      .get('https://suprblack.xyz/api/dapps/uniswap_pools/')
      .then(response => (res = response.data))
      .then(() =>
        dispatch({
          type: ADD_UNISWAPSTAKEPOOLS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
