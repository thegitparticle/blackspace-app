import {ethers} from 'ethers';
import {ChainId, UniswapPair} from 'simple-uniswap-sdk';

const providerBasic = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

export default async function ExecuteASwap(
  amountPaid,
  amountNeeded,
  token0,
  token1,
  lpDetails,
  walletAddress,
  privateKey,
  txHashCallback,
) {
  const uniswapPair = new UniswapPair({
    // the contract address of the token you want to convert FROM
    fromTokenContractAddress: token0.contractAddress,
    // fromTokenContractAddress: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
    // the contract address of the token you want to convert TO
    toTokenContractAddress: token1.address,
    // toTokenContractAddress: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea', // dai in rinkeby
    // toTokenContractAddress: ETH.RINKEBY().contractAddress,
    // toTokenContractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f', // dai on mainet
    // the ethereum address of the user using this part of the dApp
    ethereumAddress: walletAddress,
    // you can pass in the provider url as well if you want
    providerUrl:
      'https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
    // OR if you want to inject your own ethereum provider (no need for chainId if so)
    // ethereumProvider: provider,
    chainId: ChainId.MAINNET,
  });

  // now to create the factory you just do
  const uniswapPairFactory = await uniswapPair.createFactory();

  // the amount is the proper entered amount
  // so if they enter 10 pass in 10
  // it will work it all out for you
  const trade = await uniswapPairFactory.trade(String(amountPaid));

  // if (!trade.fromBalance.hasEnough) {
  //   console.log('You do not have enough from balance to execute this swap');
  // }

  // subscribe to quote changes this is just in example so your dont miss it
  trade.quoteChanged$.subscribe((value: TradeContext) => {
    // value will hold the same info as below but obviously with
    // the new trade info.
  });

  // console.log(
  //   (await providerBasic.estimateGas(trade.transaction)).toString() +
  //     'gas estimate from ethers',
  // );

  // obviously dont create your provider + wallet everytime again and again!
  // this is just like this for ease of reading!
  const provider = new ethers.providers.JsonRpcProvider(
    uniswapPairFactory.providerUrl,
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  if (trade.approvalTransaction) {
    const approved = await wallet.sendTransaction(trade.approvalTransaction);
    console.log('approved txHash', approved.hash);
    const approvedReceipt = await approved.wait();
    console.log('approved receipt', approvedReceipt);
  }

  const tradeTransaction = await wallet.sendTransaction(trade.transaction);
  console.log('trade txHash in execute a swap file', tradeTransaction.hash);
  const tradeReceipt = await tradeTransaction.wait();
  console.log('trade receipt', tradeReceipt);

  txHashCallback(tradeTransaction.hash);

  // once done with trade aka they have sent it and you don't need it anymore call
  trade.destroy();
}
