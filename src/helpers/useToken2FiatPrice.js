import axios from 'axios';
import {useEffect, useState} from 'react';

export default function useToken2FiatPrice(token_id) {
  const [loadingToken2FiatPrice, setLoading] = useState(true);
  const [token2FiatPrice, setToken2FiatPrice] = useState(null);

  const config = {
    method: 'get',
    url:
      'https://rest.coinapi.io/v1/exchangerate/' +
      String(token_id) +
      '/' +
      'USD',
    headers: {'X-CoinAPI-Key': 'A679B835-1F61-416D-86F4-7906DECCFBE6'},
  };

  const fetchInfo = () => {
    axios(config)
      .then(function (response) {
        setToken2FiatPrice(response.data.rate);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {loadingToken2FiatPrice, token2FiatPrice};
}
