import React from 'react';
import {BigNumber, ethers} from 'ethers';
import {CurrencyAmount, Fraction, Percent, Token} from '@uniswap/sdk-core';
import {
  nearestUsableTick,
  NonfungiblePositionManager,
  Pool,
  Position,
} from '@uniswap/v3-sdk';
import {AlphaRouter, SwapToRatioStatus} from '@uniswap/smart-order-router';
import {abi as IUniswapV3PoolABI} from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';

const provider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

export default async function UniswapStakeSetupAndExecute(
  info,
  lpStakeDetails,
  walletAddress,
  privateKey,
  txHashCallback,
) {
  const poolContract = new ethers.Contract(
    info !== undefined || null ? info.contract_address : '',
    IUniswapV3PoolABI,
    provider,
  );

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

    const immutables = {
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

    const PoolState = {
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

  // const position = new Position({
  //   pool: poolExampleHere,
  //   liquidity: state.liquidity * 0.0002,
  //   tickLower:
  //     nearestUsableTick(state.tick, immutables.tickSpacing) -
  //     immutables.tickSpacing * 2,
  //   tickUpper:
  //     nearestUsableTick(state.tick, immutables.tickSpacing) +
  //     immutables.tickSpacing * 2,
  // });
  //
  // const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  //
  // const {calldata, value} = NonfungiblePositionManager.addCallParameters(
  //   position,
  //   {
  //     slippageTolerance: new Percent(50, 10_000),
  //     recipient: walletAddress,
  //     deadline: deadline,
  //   },
  // );
  //
  // const router = new AlphaRouter({chainId: 1, provider: provider});
  //
  // const token0Balance = CurrencyAmount.fromRawAmount(TokenA, '5000000000');
  // const token1Balance = CurrencyAmount.fromRawAmount(TokenB, '0');
  //
  // const swapAndAddConfig = {
  //   ratioErrorTolerance: new Fraction(1, 100),
  //   maxIterations: 6,
  // };
  //
  // const swapAndAddOptions = {
  //   swapConfig: {
  //     recipient: '0x21dFB0b871Bd9055AE13e918f81B6580E090DB2E',
  //     slippage: new Percent(5, 100),
  //     deadline: 100,
  //   },
  //   addLiquidityOptions: {
  //     tokenId: 10,
  //   },
  // };
  //
  // const routeToRatioResponse = await router.routeToRatio(
  //   token0Balance,
  //   token1Balance,
  //   position,
  //   swapAndAddConfig,
  //   // swapAndAddOptions,
  // );
  //
  // const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
  // const MY_ADDRESS = walletAddress;
  //
  // if (routeToRatioResponse.status === SwapToRatioStatus.SUCCESS) {
  //   const route = routeToRatioResponse.result;
  //   const transaction = {
  //     data: route.methodParameters.calldata,
  //     to: V3_SWAP_ROUTER_ADDRESS,
  //     value: BigNumber.from(route.methodParameters.value),
  //     from: MY_ADDRESS,
  //     gasPrice: BigNumber.from(route.gasPriceWei),
  //   };
  //
  //   let wallet = new ethers.Wallet(privateKey);
  //
  //   let walletSigner = wallet.connect(provider);
  //
  //   await walletSigner
  //     .sendTransaction(transaction)
  //     .then(transaction => {
  //       console.dir(transaction);
  //       txHashCallback(transaction);
  //       console.log('Stake finished!');
  //     })
  //     .catch(e => console.log(String(e) + 'transaction failed bruh!'));
  // }
}
