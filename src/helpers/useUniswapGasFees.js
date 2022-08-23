import {useState} from 'react';

export default function useUniswapGasFees() {
  const [loadingUniswapGasFees, setLoadingUniswapGasFees] = useState(true);
  const [uniswapGasFees, setUniswapGasFees] = useState(null);

  function fetchGasFees() {}
}
