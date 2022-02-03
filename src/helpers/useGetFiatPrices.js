import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useGetFiatPrice(token_id) {
  const [loadingGetAnyFiat, setLoading] = useState(true);
  const [priceAnyFiat, setPriceAnyFiat] = useState(null);

  // console.log(token_id);

  let config = {
    method: 'get',
    url:
      'https://api.coingecko.com/api/v3/simple/price?ids=' +
      token_id +
      '&vs_currencies=usd',
    headers: {},
  };

  const fetchInfo = () => {
    axios(config)
      .then(function (response) {
        setPriceAnyFiat(response.data[token_id].usd);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {loadingGetAnyFiat, priceAnyFiat};
}
