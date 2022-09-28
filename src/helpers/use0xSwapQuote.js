import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Decimal from 'decimal.js';
import {BigNumber, ethers, providers} from 'ethers';
import ERC20_ABI from '../utils/erc20.abi.json';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import {
  useWalletConnect,
  withWalletConnect,
} from '@walletconnect/react-native-dapp';

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

const erc20abi = [
  {
    inputs: [
      {internalType: 'string', name: 'name', type: 'string'},
      {internalType: 'string', name: 'symbol', type: 'string'},
      {internalType: 'uint256', name: 'max_supply', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'address', name: 'spender', type: 'address'},
    ],
    name: 'allowance',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'approve',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'account', type: 'address'}],
    name: 'balanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'account', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'subtractedValue', type: 'uint256'},
    ],
    name: 'decreaseAllowance',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'addedValue', type: 'uint256'},
    ],
    name: 'increaseAllowance',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'transfer',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'sender', type: 'address'},
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'transferFrom',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

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

  // ropsten testnet
  // const apiConfig = {
  //   method: 'get',
  //   url:
  //     'https://ropsten.api.0x.org/swap/v1/quote?buyToken=' +
  //     '0xaD6D458402F60fD3Bd25163575031ACDce07538D' +
  //     // token1 +
  //     '&sellToken=' +
  //     '0x07865c6E87B9F70255377e024ace6630C1Eaa37F' +
  //     // token0 +
  //     '&sellAmount=' +
  //     String(sellAmountInBaseUnits) +
  //     '&takerAddress=' +
  //     String(walletAddress),
  // };

  // mainnet
  const apiConfig = {
    method: 'get',
    url:
      'https://api.0x.org/swap/v1/quote?buyToken=' +
      token1 +
      '&sellToken=' +
      token0 +
      '&sellAmount=' +
      String(sellAmountInBaseUnits) +
      '&takerAddress=' +
      String(walletAddress),
  };

  const ZERO_EX_ADDRESS = '0xdef1c0ded9bec7f1a1670819833240f027b25eff';

  async function ErcTokenPermissions() {
    // Set up a DAI allowance on the 0x contract if needed.
    const connector = useWalletConnect();

    console.log(connector.connected);

    // const provider = new WalletConnectProvider({
    //   infuraId: '386b45a4924042a29ae0f2cf0d61d7f5',
    // });

    const web3Provider = new providers.JsonRpcProvider(
      'https://ropsten.infura.io/v3/386b45a4924042a29ae0f2cf0d61d7f5',
    );

    const ercToken = new ethers.Contract(
      erc20abi,
      '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
      web3Provider.getSigner(),
    );

    console.log('contract setup');

    const currentAllowance = new BigNumber(
      ercToken.allowance(walletAddress, ZERO_EX_ADDRESS).call(),
    );

    console.log('current allowance checked for');

    if (currentAllowance.isLessThan(BigNumber.from(sellAmountInBaseUnits))) {
      console.log('current allowance is less than needed');

      const maxApproval = new BigNumber(2).pow(256).minus(1);

      console.log('maxApproval setup');

      await ercToken
        .approve(ZERO_EX_ADDRESS, BigNumber.from(sellAmountInBaseUnits))
        .send({from: walletAddress});
    } else {
      console.log('current allowance is more than needed it seems');
    }
  }

  if (token0 !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    console.log('erc token persmission called');
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
