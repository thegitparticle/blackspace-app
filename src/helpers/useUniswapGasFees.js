import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function useUniswapGasFees() {
  const [loadingUniswapGasFees, setLoadingUniswapGasFees] = useState(true);
  const [uniswapGasFees, setUniswapGasFees] = useState(null);

  function fetchGasFees() {}
}
