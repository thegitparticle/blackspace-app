import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useLiquidityPoolAddress(token0Address, token1Address) {
  const [loadingLPAddress, setLoadingLPAddress] = useState(true);
  const [lpAddress, setLPAddress] = useState('');

  if (token0Address < token1Address) {
    console.log(
      token0Address + 'is smaller than' + token1Address + 'token0 big',
    );
  } else {
    console.log(
      token1Address + 'is smaller than' + token0Address + 'token1 big',
    );
  }

  return {loadingLPAddress, lpAddress};
}
