import axios from 'axios';

export function getUSDPriceOfTokenQuick(tokenid) {
  let fiatPrice = 0;
  const config = {
    method: 'get',
    url: 'https://rest.coinapi.io/v1/exchangerate/' + tokenid + '/' + 'USD',
    headers: {'X-CoinAPI-Key': 'A679B835-1F61-416D-86F4-7906DECCFBE6'},
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      fiatPrice = response.data.rate;
    })
    .catch(function (error) {
      console.log(error);
    });
  return fiatPrice;
}
