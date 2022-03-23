import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function use0xSwapQuote(
  token0,
  token1,
  buyAmount,
  token1Decimals,
) {
  const [loading0xSwapQuote, setLoading0xSwapQuote] = useState(true);
  const [quoteDetails0x, setQuoteDetails0x] = useState(null);

  let buyAmountInBaseUnits = Number(buyAmount) * 10 ** Number(token1Decimals);

  const apiConfig = {
    method: 'get',
    url:
      'https://api.0x.org/swap/v1/quote?buyToken=' +
      token1 +
      '&sellToken=' +
      token0 +
      '&buyAmount=' +
      String(buyAmountInBaseUnits) +
      '&excludedSources=0x,Native,Uniswap_V2,Eth2Dai,Kyber,Curve,LiquidityProvider,MultiBridge,Balancer,Balancer_V2,CREAM,Bancor,MakerPsm,mStable,Mooniswap,MultiHop,Shell,Swerve,SnowSwap,SushiSwap,DODO,DODO_V2,CryptoCom,Linkswap,KyberDMM,Smoothy,Component,Saddle,xSigma,Curve_V2,Lido,ShibaSwap,Clipper,Uniswap',
  };

  const fetchInfo = () => {
    axios(apiConfig)
      .then(function (response) {
        setQuoteDetails0x(response.data);
        setLoading0xSwapQuote(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, [token0, token1, buyAmount]);

  return {loading0xSwapQuote, quoteDetails0x};
}
