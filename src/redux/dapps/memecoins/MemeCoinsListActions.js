import {ADD_MEMECOINSLIST} from '../../types';
import axios from 'axios';

export const GetMemeCoinsList = () => {
  return dispatch => {
    let res = [];

    axios
      .get('https://suprblack.xyz/api/dapps/memecoins/')
      .then(response => (res = response.data))
      .then(() =>
        dispatch({
          type: ADD_MEMECOINSLIST,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
