import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useDogeCoinPrice(token_id) {
  const [loadingGetDogeCoin, setLoadingGetDogeCoin] = useState(true);
  const [priceDogeCoin, setPriceDogeCoin] = useState(null);

  let config = {
    method: 'get',
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true',
    headers: {},
  };

  const fetchInfo = () => {
    axios(config)
      .then(function (response) {
        setPriceDogeCoin(response.data['dogecoin']);
        setLoadingGetDogeCoin(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {loadingGetDogeCoin, priceDogeCoin};
}
