import React, {useEffect, useState} from 'react';
import axios from 'axios';
import _ from 'lodash';

export default function useLiquidityPoolAddress(token0Address, token1Address) {
  const [loadingLPAddress, setLoadingLPAddress] = useState(true);
  const [lpAddress, setLPAddress] = useState('');

  let token0Here = '';
  let token1Here = '';

  if (token0Address > token1Address) {
    token0Here = token1Address;
    token1Here = token0Address;
  }

  const data = JSON.stringify({
    query: `{
    pools(orderBy: feeTier, where: {
        token0: "${token0Here}",
        token1: "${token1Here}"}) {
      id
      tick
      sqrtPrice
      feeTier
      liquidity
      token0Price
      token1Price
    }
  }`,
    variables: {token0: token0Here, token1: token1Here},
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
        setLPAddress(_.last(response.data.data.pools));
        console.log(_.last(response.data.data.pools) + 'lp');
        setLoadingLPAddress(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, [token0Address, token1Address]);

  return {loadingLPAddress, lpAddress};
}
