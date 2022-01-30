import React from 'react';
import Compound from '@compound-finance/compound-js';
import {ethers} from 'ethers';
import {INFURA_RINKEBY} from 'react-native-dotenv';

export default function EnterMarketsCompound(walletAddress, privateKey) {
  const compound = new Compound(INFURA_RINKEBY, {
    privateKey: privateKey, // preferably with environment variable
  });

  (async function () {
    const trx = await compound.enterMarkets([
      Compound.ETH,
      Compound.DAI,
      Compound.USDC,
      Compound.USDT,
      Compound.BAT,
    ]); // Use [] for multiple
    console.log('Ethers.js transaction object', trx);
  })().catch(console.error);
}
