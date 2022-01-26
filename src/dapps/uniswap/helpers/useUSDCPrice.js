import React from 'react';
import {ethers} from 'ethers';
import {INFURA_RINKEBY} from 'react-native-dotenv';
import {abi as IUniswapV3PoolABI} from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import univ3prices from '@thanpolas/univ3prices';
import sqrtPrice from '@thanpolas/univ3prices';

export const useUSDCPrice = () => {
  console.log('use usdc price hook called');
};
