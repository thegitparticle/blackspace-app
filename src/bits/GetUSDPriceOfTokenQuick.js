import axios from 'axios';

export function getUSDPriceOfTokenQuick(tokenid) {
  let fiatPrice = 0;
  const config = {
    method: 'get',
    url:
      'https://api.coingecko.com/api/v3/simple/price?ids=' +
      {tokenid} +
      '&vs_currencies=usd',
    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      fiatPrice = response.data.tokenid;
    })
    .catch(function (error) {
      console.log(error);
    });
  return fiatPrice;
}
