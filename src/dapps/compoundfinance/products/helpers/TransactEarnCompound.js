import React from 'react';
import Compound from '@compound-finance/compound-js';
import {INFURA_RINKEBY} from 'react-native-dotenv';

export default function TransactEarnCompound(
  walletAddress,
  privateKey,
  amount,
  supplyAsset, // Compound.ETH, etc
) {
  let compoundAsset = null;

  if (supplyAsset === 'ETH') {
    compoundAsset = Compound.ETH;
  } else if (supplyAsset === 'DAI') {
    compoundAsset = Compound.DAI;
  } else if (supplyAsset === 'BAT') {
    compoundAsset = Compound.BAT;
  } else if (supplyAsset === 'USDC') {
    compoundAsset = Compound.USDC;
  } else if (supplyAsset === 'USDT') {
    compoundAsset = Compound.USDT;
  } else {
    compoundAsset = null;
  }

  const compound = new Compound(INFURA_RINKEBY, {
    privateKey: privateKey, // preferably with environment variable
  });

  // Ethers.js overrides are an optional 3rd parameter for `supply`
  // const trxOptions = { gasLimit: 250000, mantissa: false };

  (async function () {
    console.log('Supplying Asset to the Compound Protocol...');
    const trx = await compound.supply(compoundAsset, Number(amount));
    console.log('Ethers.js transaction object', trx);
  })().catch(console.error);
}
