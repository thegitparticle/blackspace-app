import React, {useState} from 'react';
import {BigNumber, ethers} from 'ethers';
import {CurrencyAmount, Percent, Token, TradeType} from '@uniswap/sdk-core';
import {Pool, Route, Trade} from '@uniswap/v3-sdk';
import {AlphaRouter} from '@uniswap/smart-order-router';
import {abi as IUniswapV3PoolABI} from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import {abi as QuoterABI} from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import {getPriceUniswapV3} from '@thanpolas/uniswap-chain-queries';

const provider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

export default async function UniswapStakeSetupAndExecute(
  info,
  lpStakeDetails,
  walletAddress,
  privateKey,
) {
  const poolContract = new ethers.Contract(
    info.contract_address !== undefined || null ? info.contract_address : '',
    IUniswapV3PoolABI,
    provider,
  );

  const quoterContract = new ethers.Contract(
    '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    QuoterABI,
    provider,
  );

  interface Immutables {
    factory: string;
    token0: string;
    token1: string;
    fee: number;
    tickSpacing: number;
    maxLiquidityPerTick: ethers.BigNumber;
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

  async function getPoolImmutables() {
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

  async function getPoolState() {
    // note that data here can be desynced if the call executes over the span of two or more blocks.
    const [liquidity, slot] = await Promise.all([
      poolContract.liquidity(),
      poolContract.slot0(),
    ]);

    const PoolState: State = {
      liquidity,
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
  // query the state and immutable variables of the pool
  const [immutables, state] = await Promise.all([
    getPoolImmutables(),
    getPoolState(),
  ]);

  // create instances of the Token object to represent the two tokens in the given pool
  const TokenA = new Token(
    1,
    immutables.token0,
    18,
    lpStakeDetails.token0.symbol,
    lpStakeDetails.token0.name,
  );

  const TokenB = new Token(
    1,
    immutables.token1,
    18,
    lpStakeDetails.token1.symbol,
    lpStakeDetails.token1.name,
  );

  // create an instance of the pool object for the given pool
  const poolExampleHere = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(), //note the description discrepancy - sqrtPriceX96 and sqrtRatioX96 are interchangable values
    state.liquidity.toString(),
    state.tick,
  );
}
