import React, {useState} from 'react';
import {BigNumber, ethers} from 'ethers';
import {Pool} from '@uniswap/v3-sdk';
import {CurrencyAmount, Percent, Token, TradeType} from '@uniswap/sdk-core';
import {abi as IUniswapV3PoolABI} from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import {Route} from '@uniswap/v3-sdk';
import {Trade} from '@uniswap/v3-sdk';
import {abi as QuoterABI} from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import {getPriceUniswapV3} from '@thanpolas/uniswap-chain-queries';
import {AlphaRouter} from '@uniswap/smart-order-router';

const provider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

export default async function SetupUniswapPool(
  lpDetails,
  walletAddress,
  privateKey,
) {
  const poolContract = new ethers.Contract(
    lpDetails.id !== undefined || null ? lpDetails.id : '',
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

  if (lpDetails !== undefined || null) {
    // create instances of the Token object to represent the two tokens in the given pool
    const TokenA = new Token(
      1,
      immutables.token0,
      6,
      lpDetails.token0.symbol,
      lpDetails.token0.name,
    );

    const TokenB = new Token(
      1,
      immutables.token1,
      18,
      lpDetails.token1.symbol,
      lpDetails.token1.name,
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

    // assign an input amount for the swap
    const amountIn = 100;

    // call the quoter contract to determine the amount out of a swap, given an amount in
    const quotedAmountOut =
      await quoterContract.callStatic.quoteExactInputSingle(
        immutables.token0,
        immutables.token1,
        immutables.fee,
        amountIn.toString(),
        0,
      );

    // create an instance of the route object in order to construct a trade object
    const swapRoute = new Route([poolExampleHere], TokenA, TokenB);

    // create an unchecked trade instance
    const uncheckedTradeExample = await Trade.createUncheckedTrade({
      route: swapRoute,
      inputAmount: CurrencyAmount.fromRawAmount(TokenA, amountIn.toString()),
      outputAmount: CurrencyAmount.fromRawAmount(
        TokenB,
        quotedAmountOut.toString(),
      ),
      tradeType: TradeType.EXACT_INPUT,
    });

    const router = new AlphaRouter({chainId: 1, provider: provider});

    let wallet = new ethers.Wallet(privateKey);

    let walletSigner = wallet.connect(provider);

    let gas_price = provider.getGasPrice();

    const route = await router.route(amountIn, TokenB, 18, {
      recipient: walletAddress,
      slippageTolerance: new Percent(5, 100),
      deadline: 100,
    });

    const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';

    const transaction = {
      data: route.methodParameters.calldata,
      to: V3_SWAP_ROUTER_ADDRESS,
      value: BigNumber.from(route.methodParameters.value),
      from: walletAddress,
      gasPrice: BigNumber.from(route.gasPriceWei),
    };

    walletSigner.sendTransaction(transaction).then(transaction => {
      console.dir(transaction);
      alert('Send finished!');
    });

    // console.log('The quoted amount out is', quotedAmountOut.toString());
    // console.log('The unchecked trade object is', uncheckedTradeExample);
    // console.log(poolExample.token0Price);
    // console.log(poolExample.token1Price);
  }

  // console.log(poolExample);

  // print the quote and the unchecked trade instance in the console
  // console.log('The quoted amount out is', quotedAmountOut.toString());
  // console.log(poolExample.token0Price);
  // console.log(poolExample.token1Price);
  // console.log('The unchecked trade object is', uncheckedTradeExample);
}
