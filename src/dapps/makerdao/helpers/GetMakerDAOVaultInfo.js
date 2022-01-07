import React from 'react';
import Maker from '@makerdao/dai';
import {INFURA_MAINNET} from 'react-native-dotenv';
import {McdPlugin} from '@makerdao/dai-plugin-mcd';

async function GetMakerDAOVaultInfo(wallet_address) {
  const ownerAddress = wallet_address;
  const maker = await Maker.create('http', {
    plugins: [McdPlugin],
    url: 'https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
  });

  // const manager = maker.service('mcd:cdpManager');
  // const proxyAddress = maker.service('proxy').getProxyAddress(ownerAddress);
  // const data = await manager.getCdpIds(proxyAddress); // returns list of { id, ilk } objects
  // const vault = await manager.getCdp(data[0].id);

  // console.log(
  //   [
  //     vault.collateralAmount, // amount of collateral tokens
  //     vault.collateralValue, // value in USD, using current price feed values
  //     vault.debtValue, // amount of Dai debt
  //     vault.collateralizationRatio, // collateralValue / debt
  //     vault.liquidationPrice, // vault becomes unsafe at this price
  //   ].map(x => x.toString()),
  // );
}

export default GetMakerDAOVaultInfo;
