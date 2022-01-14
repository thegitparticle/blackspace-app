// import axios from 'axios';
//
// export function getCoinChartInfo(coin_id) {
//   let chartInfo = [];
//
//   const config = {
//     method: 'get',
//     url: 'https://api.coingecko.com/api/v3/coins/shiba-inu/market_chart?vs_currency=usd&days=10',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//
//   axios(config)
//     .then(function (response) {
//       chartInfo = response.data.prices;
//       // console.log(response.data.prices);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//
//   return chartInfo;
// }
