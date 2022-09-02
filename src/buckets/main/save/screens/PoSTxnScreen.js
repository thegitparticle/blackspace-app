// PoSTxnScreen
import {useNavigation} from '@react-navigation/native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {Alchemy, Network} from 'alchemy-sdk';
import {Text, useSx, View} from 'dripsy';
import {ethers} from 'ethers';
import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import Config from 'react-native-config';
import {connect} from 'react-redux';

const settings = {
  apiKey: Config.ALCHEMY_MAINNET_TOKEN,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy();

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

function PoSTxnScreen({route}) {
  const sxCustom = useSx();
  const navigation = useNavigation();
  const connector = useWalletConnect();

  const {swapQuote} = route.params;

  const ethersProvider = ethers.getDefaultProvider('mainnet', {
    alchemy: Config.ALCHEMY_MAINNET_TOKEN,
  });

  useEffect(() => {
    connector
      .sendTransaction(swapQuote)
      .then(info => console.log(info))
      .catch(e => console.log(e));
  }, [swapQuote]);

  return (
    <View variant="layout.full_screen">
      <Text
        variant="body_thick"
        sx={{color: 'layout_2', marginHorizontal: '$4'}}>
        transactions happen here
      </Text>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(PoSTxnScreen);
