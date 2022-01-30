import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useShibaInuPrice(token_id) {
  const [loadingGetShibaInu, setLoadingGetShibaInu] = useState(true);
  const [priceShibaInu, setPriceShibaInu] = useState(null);

  let config = {
    method: 'get',
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=shiba-inu&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true',
    headers: {},
  };

  const fetchInfo = () => {
    axios(config)
      .then(function (response) {
        setPriceShibaInu(response.data['shiba-inu']);
        setLoadingGetShibaInu(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {loadingGetShibaInu, priceShibaInu};
}
