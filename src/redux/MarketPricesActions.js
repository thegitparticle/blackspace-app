import {ADD_MARKETPRICES} from './types';
import axios from 'axios';

export const GetMarketPrices = () => {
  return dispatch => {
    let res = [];

    axios
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Cbinancecoin%2Csolana%2Cusd-coin%2Ccardano%2Cripple%2Cpolkadot%2Cterra-luna%2Cavalanche-2%2Cdogecoin%2Cshiba-inu%2Cmatic-network%2Cbinance-usd%2Ccrypto-com-chain%2Cchainlink%2Cterrausd%2Ccosmos%2Calgorand%2Clitecoin%2Cnear%2Cdai%2Cbitcoin-cash%2Cuniswap%2Ctron%2Cfantom%2Cokb%2Cstellar%2Cinternet-computer&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true',
      )
      .then(response => (res = response.data))
      .then(data => console.log(data))
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
