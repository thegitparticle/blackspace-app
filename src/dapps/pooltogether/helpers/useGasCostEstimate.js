import {BigNumber} from 'ethers';
import {parseUnits} from '@ethersproject/units';
import {useGasCosts} from './useGasCosts';
import useEthFiatPrice from '../../../helpers/useGetEthFiatPrice';

export const useGasCostEstimate = (gasAmount: BigNumber, chainId: number) => {
  const {loadingEth, priceEth} = useEthFiatPrice();
  const {gasCosts, gasCostsIsFetched} = useGasCosts(chainId);

  let totalGasUsd, totalGasWei, isApproveFetched;
  if (gasCostsIsFetched && !loadingEth) {
    totalGasWei = calculateTotalGasWei(gasCosts, gasAmount);
    // console.log(totalGasWei + ' ' + 'total gas');
    totalGasUsd = calculateTotalGasUsd(
      priceEth,
      chainId,
      calculateTotalGasWei(gasCosts, gasAmount),
    );
    isApproveFetched = true;
  }

  return {totalGasWei, totalGasUsd, isApproveFetched};
};

const calculateTotalGasUsd = (priceEth, chainId, totalGasWei) => {
  return totalGasWei
    .mul(Math.round(Number(priceEth) * 100).toString())
    .div(100);
};

const calculateTotalGasWei = (gasCosts, gasAmount) => {
  const standardGasCostGwei = Number(gasCosts.result.ProposeGasPrice);
  // const standardGasCostGwei = Number('62');

  // Convert gwei to wei
  const standardGasCostWei = BigNumber.from(
    Math.round(standardGasCostGwei * 1000),
  )
    .mul(parseUnits('1', 9))
    .div(1000);

  return gasAmount.mul(standardGasCostWei);
};
