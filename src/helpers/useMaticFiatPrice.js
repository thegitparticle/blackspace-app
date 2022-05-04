import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useMaticFiatPrice() {
  const [loadingPriceMatic, setLoading] = useState(true);
  const [priceMatic, setPriceMatic] = useState(null);

  let config = {
    method: 'get',
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd',
    headers: {},
  };

  const fetchInfo = () => {
    axios(config)
      .then(function (response) {
        // console.log(response.data);
        setPriceMatic(response.data['matic-network'].usd);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {loadingPriceMatic, priceMatic};
}
