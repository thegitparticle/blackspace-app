import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useUSDCFiatPrice() {
  const [loadingPriceUSDC, setLoading] = useState(true);
  const [priceUSDC, setPriceUSDC] = useState(null);

  let config = {
    method: 'get',
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd',
    headers: {},
  };

  const fetchInfo = () => {
    axios(config)
      .then(function (response) {
        setPriceUSDC(response.data['usd-coin'].usd);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {loadingPriceUSDC, priceUSDC};
}
