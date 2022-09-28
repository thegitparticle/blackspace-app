import {useEffect, useState} from 'react';
import {Alchemy, Network} from 'alchemy-sdk';
import Config from 'react-native-config';
import {BigNumber} from 'ethers';

const settings = {
  apiKey: Config.ALCHEMY_MAINNET_TOKEN,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function useGetTokenBalance(walletAddress, tokenAddress) {
  const [loadingTokenBalance, setLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState(null);

  async function getBalance() {
    const balances = await alchemy.core.getTokenBalances(walletAddress, [
      tokenAddress,
    ]);

    setTokenBalance(BigNumber.from(balances.tokenBalances[0].tokenBalance));
    setLoading(false);
  }

  useEffect(() => {
    getBalance();
  }, []);

  return {loadingTokenBalance, tokenBalance};
}
