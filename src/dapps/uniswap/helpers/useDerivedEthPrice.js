import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useDerivedEthPrice(token_address) {
  const [loadingDerivedETH, setLoading] = useState(true);
  const [derivedETH, setDerivedETH] = useState(null);

  const data = JSON.stringify({
    query: `query token($id: ID!){
  token(id: $id) {
    name
    symbol
    derivedETH
  }
  }`,
    variables: {id: token_address},
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
        setDerivedETH(response.data.data.token.derivedETH);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, [token_address]);

  return {loadingDerivedETH, derivedETH};
}