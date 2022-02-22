import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useCoinGeckoDetails(token_id) {
  const [loadingCoinGeckoDetails, setLoadingCoinGeckoDetails] = useState(true);
  const [priceCoin, setPriceCoin] = useState(null);

  let config = {
    method: 'get',
    url:
      'https://api.coingecko.com/api/v3/simple/price?ids=' +
      String(token_id) +
      '&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true',
    headers: {},
  };

  const fetchInfo = () => {
    axios(config)
      .then(function (response) {
        setPriceCoin(response.data[token_id]);
        setLoadingCoinGeckoDetails(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {loadingCoinGeckoDetails, priceCoin};
}
