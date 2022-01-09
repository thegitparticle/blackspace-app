import React from 'react';
import axios from 'axios';

export function getPoolDetails(poolid) {
  const data = JSON.stringify({
    query: `query Pool($poolID: ID!){
  pool(id: $poolID) {
    tick
    token0 {
      symbol
      id
      decimals
      feesUSD
      volumeUSD
      derivedETH
    }
    token1 {
      symbol
      id
      decimals
      feesUSD
      volumeUSD
      derivedETH
    }
    feeTier
    sqrtPrice
    liquidity
    token0Price
    token1Price
  }
}`,
    variables: {poolID: poolid},
  });

  const config = {
    method: 'post',
    url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
