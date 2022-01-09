import React from 'react';
import {ethers} from 'ethers';
import {Address} from 'cluster';
import {Pool} from '@uniswap/v3-sdk';
import {Token} from '@uniswap/sdk-core';
import {abi as QuoterABI} from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import {abi as IUniswapV3PoolABI} from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';

const provider = new ethers.providers.JsonRpcProvider(
  'https://rinkeby.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

const poolAddress = '0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8';

const poolImmutablesAbi = [
  'function factory() external view returns (address)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
  'function fee() external view returns (uint24)',
  'function tickSpacing() external view returns (int24)',
  'function maxLiquidityPerTick() external view returns (uint128)',
];

const poolContract = new ethers.Contract(
  poolAddress,
  // poolImmutablesAbi,
  IUniswapV3PoolABI,
  provider,
);

interface Immutables {
  factory: Address;
  token0: Address;
  token1: Address;
  fee: number;
  tickSpacing: number;
  maxLiquidityPerTick: number;
}

interface State {
  liquidity: ethers.BigNumber;
  sqrtPriceX96: ethers.BigNumber;
  tick: number;
  observationIndex: number;
  observationCardinality: number;
  observationCardinalityNext: number;
  feeProtocol: number;
  unlocked: boolean;
}

export async function getPoolImmutables() {
  const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
    await Promise.all([
      poolContract.factory(),
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.maxLiquidityPerTick(),
    ]);

  const immutables: Immutables = {
    factory,
    token0,
    token1,
    fee,
    tickSpacing,
    maxLiquidityPerTick,
  };

  return immutables;
}

export async function getPoolState() {
  const [liquidity, slot] = await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  const PoolState: State = {
    liquidity: liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  };

  return PoolState;
}

export async function getSpotPricesOfPool() {
  const immutables = await getPoolImmutables();
  const state = await getPoolState();
  const DAI = new Token(1, immutables.token0, 18, 'DAI', 'Stablecoin');
  const USDC = new Token(1, immutables.token1, 18, 'USDC', 'USD Coin');
  const block = await provider.getBlock(provider.getBlockNumber());
  const deadline = block.timestamp + 200;

  const DAI_USDC_POOL = new Pool(
    DAI,
    USDC,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick,
  );

  const token0Price = DAI_USDC_POOL.token0Price;
  const token1Price = DAI_USDC_POOL.token1Price;

  console.log(token0Price);
  console.log(token1Price);
}
