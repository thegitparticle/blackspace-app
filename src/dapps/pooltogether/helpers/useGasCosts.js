import {useEffect, useState} from 'react';
import axios from 'axios';

export const useGasCosts = (chainId: number) => {
  const [gasCostsIsFetched, setGasCostsIsFetched] = useState(false);
  const [gasCosts, setGasCosts] = useState(null);

  let config = {
    method: 'get',
    url: `https://pooltogether-api.com/gas/${chainId}`,
    headers: {},
  };

  const fetchInfo = () => {
    axios(config)
      .then(function (response) {
        setGasCosts(response.data);
        setGasCostsIsFetched(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {gasCosts, gasCostsIsFetched};
};
