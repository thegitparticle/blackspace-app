import {useEffect, useState} from 'react';
import {Alchemy, Network} from 'alchemy-sdk';
import Config from 'react-native-config';
import {BigNumber, ethers} from 'ethers';

const settings = {
  apiKey: Config.ALCHEMY_MAINNET_TOKEN,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function useGetETHBalance(walletAddress) {
  const [loadingTokenBalance, setLoading] = useState(true);
  const [ethBalance, setETHBalance] = useState(null);

  async function getBalance() {
    const balances = await alchemy.core.getBalance(walletAddress);

    setETHBalance(ethers.utils.formatEther(BigNumber.from(balances)));
    setLoading(false);
  }

  useEffect(() => {
    getBalance();
  }, []);

  return {loadingTokenBalance, ethBalance};
}
