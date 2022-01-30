import React from 'react';
import Compound from '@compound-finance/compound-js';
import {ethers} from 'ethers';
import {INFURA_RINKEBY} from 'react-native-dotenv';

const provider = new ethers.providers.JsonRpcProvider(
  'https://rinkeby.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

export default function TransactEarnCompound(
  walletAddress,
  privateKey,
  amount,
  supplyAsset, // Compound.ETH, etc
) {
  const compound = new Compound(INFURA_RINKEBY, {
    privateKey: privateKey, // preferably with environment variable
  });

  // Ethers.js overrides are an optional 3rd parameter for `supply`
  // const trxOptions = { gasLimit: 250000, mantissa: false };

  (async function () {
    console.log('Supplying Asset to the Compound Protocol...');
    const trx = await compound.supply(supplyAsset, Number(amount));
    console.log('Ethers.js transaction object', trx);
  })().catch(console.error);
}
