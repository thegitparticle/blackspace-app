import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useLUSDFiatPrice() {
  const [loadingPriceLUSD, setLoading] = useState(true);
  const [priceLUSD, setPriceLUSD] = useState(null);

  let config = {
    method: 'get',
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=liquity-usd&vs_currencies=usd',
    headers: {},
  };

  const fetchInfo = () => {
    axios(config)
      .then(function (response) {
        setPriceLUSD(response.data['liquity-usd'].usd);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {loadingPriceLUSD, priceLUSD};
}
