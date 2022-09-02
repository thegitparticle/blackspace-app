import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Decimal from 'decimal.js';
import {BigNumber, ethers} from 'ethers';
import ERC20_ABI from '../utils/erc20.abi.json';

export function use0xSwapQuote(
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

export function use0xSwapQuoteWithBalanceChecks(
  token0,
  token1,
  sellAmount,
  token0Decimals,
  walletAddress,
) {
  const [loading0xSwapQuoteWithChecks, setLoading0xSwapQuoteWithChecks] =
    useState(true);

  const [quoteDetails0xRawWithChecks, setQuoteDetails0xRawWithChecks] =
    useState(null);
  const [quoteDetails0xWithChecks, setQuoteDetails0xWithChecks] =
    useState(null);
  const [quoteError0xWithChecks, setQuoteError0xWithChecks] = useState(null);

  console.log(' with checks quote ask called');

  let sellAmountInBaseUnits = new Decimal(
    Number(sellAmount) * 10 ** Number(token0Decimals),
  ).toFixed();

  const apiConfig = {
    method: 'get',
    url:
      'https://ropsten.api.0x.org/swap/v1/quote?buyToken=' +
      '0xaD6D458402F60fD3Bd25163575031ACDce07538D' +
      // token1 +
      '&sellToken=' +
      '0x07865c6E87B9F70255377e024ace6630C1Eaa37F' +
      // token0 +
      '&sellAmount=' +
      String(sellAmountInBaseUnits) +
      '&takerAddress=' +
      String(walletAddress),
  };

  console.log(
    'https://ropsten.api.0x.org/swap/v1/quote?buyToken=' +
      '0xaD6D458402F60fD3Bd25163575031ACDce07538D' +
      // token1 +
      '&sellToken=' +
      '0x07865c6E87B9F70255377e024ace6630C1Eaa37F' +
      // token0 +
      '&sellAmount=' +
      String(sellAmountInBaseUnits) +
      '&takerAddress=' +
      String(walletAddress),
  );

  const ZERO_EX_ADDRESS = '0xdef1c0ded9bec7f1a1670819833240f027b25eff';

  async function ErcTokenPermissions() {
    // Set up a DAI allowance on the 0x contract if needed.
    const ercToken = new ethers.Contract(ERC20_ABI, token0);
    const currentAllowance = new BigNumber(
      ercToken.allowance(walletAddress, ZERO_EX_ADDRESS).call(),
    );
    if (currentAllowance.isLessThan(String(sellAmountInBaseUnits))) {
      await ercToken
        .approve(ZERO_EX_ADDRESS, String(sellAmountInBaseUnits))
        .send({from: walletAddress});
    }
  }

  if (token0 !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    ErcTokenPermissions();
  }

  const fetchInfo = () => {
    axios(apiConfig)
      .then(function (response) {
        setQuoteDetails0xWithChecks(response.data);
        setQuoteDetails0xRawWithChecks(response);
        setLoading0xSwapQuoteWithChecks(false);
        setQuoteError0xWithChecks(false);
      })
      .catch(function (error) {
        console.log(error + ' 0x quote with checks error');
        setLoading0xSwapQuoteWithChecks(false);
        setQuoteError0xWithChecks(false);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, [token0, token1, sellAmount]);

  return {
    loading0xSwapQuoteWithChecks,
    quoteDetails0xWithChecks,
    quoteDetails0xRawWithChecks,
    quoteError0xWithChecks,
  };
}
