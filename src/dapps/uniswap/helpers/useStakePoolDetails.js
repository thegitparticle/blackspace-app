import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useStakePoolDetails(lpAddress) {
  const [loadingLPStakeDetails, setLoadingLPStakeDetails] = useState(true);
  const [lpStakeDetails, setLPStakeDetails] = useState(null);

  console.log(lpAddress);

  const data = JSON.stringify({
    query: `
  {
  pool(id: "${lpAddress}") {
    tick
    token0 {
      symbol
      id
      name
      decimals
      derivedETH
    }
    token1 {
      symbol
      id
      name
      decimals
      derivedETH
    }
    feeTier
    sqrtPrice
    totalValueLockedUSD
  }
}`,
    variables: {address: lpAddress},
  });

  const config = {
    method: 'post',
    url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  const fetchInfo = () => {
    axios(config)
      .then(function (response) {
        setLPStakeDetails(response.data.data.pool);
        // console.log(_.last(response.data.data.pools));
        setLoadingLPStakeDetails(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, [lpAddress]);

  return {loadingLPStakeDetails, lpStakeDetails};
}
