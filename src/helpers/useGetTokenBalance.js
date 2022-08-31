import {useEffect, useState} from 'react';
import {Alchemy, Network} from 'alchemy-sdk';
import Config from 'react-native-config';
import {BigNumber} from 'ethers';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: Config.ALCHEMY_MAINNET_TOKEN, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export default function useGetTokenBalance(walletAddress, tokenAddress) {
  const [loadingTokenBalance, setLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState(null);

  //   const web3 = createAlchemyWeb3(
  //     `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_MAINNET_TOKEN}`,
  //   );

  async function getBalance() {
    // The wallet address / token we want to query for:
    const balances = await alchemy.core.getTokenBalances(walletAddress, [
      tokenAddress,
    ]);

    // console.log('BALANCES->');
    // console.log(balances);
    setTokenBalance(BigNumber.from(balances.tokenBalances[0].tokenBalance));
    setLoading(false);
  }

  useEffect(() => {
    getBalance();
  }, []);

  return {loadingTokenBalance, tokenBalance};
}
