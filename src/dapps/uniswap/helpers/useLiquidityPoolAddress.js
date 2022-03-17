import React, {useEffect, useState} from 'react';
import axios from 'axios';
import _ from 'lodash';

export default function useLiquidityPoolAddress(token0Address, token1Address) {
  const [loadingLPAddress, setLoadingLPAddress] = useState(true);
  const [lpAddress, setLPAddress] = useState({
    feeTier: '3000',
    id: '0x290a6a7460b308ee3f19023d2d00de604bcf5b42',
    liquidity: '949973668670527790863439',
    sqrtPrice: '2046379880895743797939048206',
    tick: '-73129',
    token0: {
      decimals: '18',
      name: 'Matic Token',
      symbol: 'MATIC',
      derivedETH: '0.0003617588007247900895195119113110939',
    },
    token0Price: '1498.948295981583083786621023745811',
    token1: {
      decimals: '18',
      name: 'Wrapped Ether',
      symbol: 'WETH',
      derivedETH: '1',
    },
    token1Price: '0.0006671344186326000924924617213326372',
  });

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
      token0 {
        symbol
        name
        derivedETH
      }
      token1 {
        symbol
        name
        derivedETH
      }
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
        // console.log(_.last(response.data.data.pools));
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
