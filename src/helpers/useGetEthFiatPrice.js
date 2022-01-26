import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useEthFiatPrice() {
  const [loadingPriceEth, setLoading] = useState(true);
  const [priceEth, setPriceEth] = useState(null);

  let config = {
    method: 'get',
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    headers: {},
  };

  const fetchInfo = () => {
    axios(config)
      .then(function (response) {
        console.log(response.data);
        setPriceEth(response.data.ethereum.usd);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {loadingPriceEth, priceEth};
}
