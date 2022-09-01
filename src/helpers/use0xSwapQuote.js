import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Decimal from 'decimal.js';

export default function use0xSwapQuote(
  token0,
  token1,
  sellAmount,
  token0Decimals,
  walletAddress,
) {
  const [loading0xSwapQuote, setLoading0xSwapQuote] = useState(true);
  const [quoteDetails0xRaw, setQuoteDetails0xRaw] = useState(null);
  const [quoteDetails0x, setQuoteDetails0x] = useState(null);

  let sellAmountInBaseUnits = new Decimal(
    Number(sellAmount) * 10 ** Number(token0Decimals),
  ).toFixed();

  const apiConfig = {
    method: 'get',
    url:
      'https://api.0x.org/swap/v1/quote?buyToken=' +
      token1 +
      '&sellToken=' +
      token0 +
      '&sellAmount=' +
      String(sellAmountInBaseUnits),
    //   '&takerAddress=' +
    //   String(walletAddress),
  };

  const fetchInfo = () => {
    axios(apiConfig)
      .then(function (response) {
        setQuoteDetails0x(response.data);
        setQuoteDetails0xRaw(response);
        setLoading0xSwapQuote(false);
      })
      .catch(function (error) {
        console.log(error + '0x quote error');
      });
  };

  useEffect(() => {
    fetchInfo();
  }, [token0, token1, sellAmount]);

  return {loading0xSwapQuote, quoteDetails0x, quoteDetails0xRaw};
}
