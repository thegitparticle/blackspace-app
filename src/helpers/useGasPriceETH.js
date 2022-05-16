import {useEffect, useState} from 'react';
import axios from 'axios';

export const useGasPriceETH = () => {
  const [gasPriceIsFetched, setGasPriceIsFetched] = useState(false);
  const [gasPrice, setGasPrice] = useState(null);

  let config = {
    method: 'get',
    url: `https://pooltogether-api.com/gas/1`,
    headers: {},
  };

  const fetchInfo = () => {
    axios(config)
      .then(function (response) {
        setGasPrice(response.data);
        setGasPriceIsFetched(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {gasPrice, gasPriceIsFetched};
};
