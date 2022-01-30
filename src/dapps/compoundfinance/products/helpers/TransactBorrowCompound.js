import React from 'react';
import Compound from '@compound-finance/compound-js';
import {ethers} from 'ethers';
import {INFURA_RINKEBY} from 'react-native-dotenv';

export default function TransactBorrowCompound(
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

  (async function () {
    const daiScaledUp = String(Number(amount) * (10 ^ 18));
    const trxOptions = {mantissa: true};

    console.log('Borrowing Asset from the Compound Protocol...');
    const trx = await compound.borrow(compoundAsset, daiScaledUp, trxOptions);
    console.log('Ethers.js transaction object', trx);
  })().catch(console.error);
}
