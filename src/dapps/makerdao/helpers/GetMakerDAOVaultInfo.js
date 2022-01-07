import React from 'react';
import Maker from '@makerdao/dai';
import {INFURA_MAINNET} from '@env';

async function GetMakerDAOVaultInfo() {
  const maker = await Maker.create('http', {
    url: INFURA_MAINNET,
  });

  const manager = maker.service('mcd:cdpManager');
  const proxyAddress = maker.service('proxy').getProxyAddress(ownerAddress);
  const data = await manager.getCdpIds(proxyAddress); // returns list of { id, ilk } objects
  const vault = await manager.getCdp(data[0].id);

  console.log(
    [
      vault.collateralAmount, // amount of collateral tokens
      vault.collateralValue, // value in USD, using current price feed values
      vault.debtValue, // amount of Dai debt
      vault.collateralizationRatio, // collateralValue / debt
      vault.liquidationPrice, // vault becomes unsafe at this price
    ].map(x => x.toString()),
  );
}

export default GetMakerDAOVaultInfo;
