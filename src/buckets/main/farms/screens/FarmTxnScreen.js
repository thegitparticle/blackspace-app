// FarmTxnScreen
import {useNavigation} from '@react-navigation/native';
import {Text, useSx, View} from 'dripsy';
import React, {useCallback, useState, useEffect} from 'react';
import {Dimensions, Pressable, RefreshControl, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import homoraBank from '../../../../utils/HomoraBank.json';
import curveSpell from '../../../../utils/CurveSpellV1.json';
import sushiswapSpell from '../../../../utils/SushiswapSpellV1.json';
import uniswapSpell from '../../../../utils/UniswapV2SpellV1.json';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {ethers} from 'ethers';
import {Alchemy, Network} from 'alchemy-sdk';
import Config from 'react-native-config';
import {
  TxnCancelledBit,
  TxnHappeningBit,
  TxnSentBit,
} from '../../../../bits/TxnProcessBits';

const settings = {
  apiKey: Config.ALCHEMY_MAINNET_TOKEN,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy();

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

function FarmTxnScreen({route}) {
  const sxCustom = useSx();
  const navigation = useNavigation();
  const connector = useWalletConnect();

  // 3 statuses - Processing, Done, Error
  const [status, setStatus] = useState('Processing');

  const {farmData, amountStake1, amountStake2} = route.params;

  const dex = farmData.exchange.name;

  //   const bank = homoraBank.abi;
  //   const spell = uniswapSpell.abi;

  const ethersProvider = ethers.getDefaultProvider('mainnet', {
    alchemy: Config.ALCHEMY_MAINNET_TOKEN,
  });

  const bank = new ethers.Contract(
    '0xba5eBAf3fc1Fcca67147050Bf80462393814E54B',
    homoraBank.abi,
    ethersProvider,
  );
  const spell = new ethers.Contract(
    '0x00b1a4e7f217380a7c9e6c12f327ac4a1d9b6a14',
    uniswapSpell.abi,
    ethersProvider,
  );

  //   const [spell, setSpell] = useState(null);

  let token0 = farmData.tokens[0];
  let token1 = farmData.tokens[1];
  let amount0 = amountStake1;
  let amount1 = amountStake2;
  let amount_lp = 0;
  let amount0_borrow = 0;
  let amount1_borrow = 0;

  //   useEffect(() => {
  //     if (dex === 'Uniswap V2') {
  //       setSpell(uniswapSpell.abi);
  //     } else if (dex === 'Sushiswap') {
  //       setSpell(sushiswapSpell.abi);
  //     } else if (dex === 'Curve') {
  //       setSpell(curveSpell.abi);
  //     } else {
  //     }
  //   }, [farmData]);

  useEffect(() => {
    if (dex === 'Uniswap V2' && spell) {
      let txHere = bank.execute(
        0,
        spell,
        // spell.addLiquidityWERC20.encode_input(token0, token1, [
        spell.addLiquidityWERC20(token0, token1, [
          amount0,
          amount1,
          amount_lp,
          amount0_borrow,
          amount1_borrow,
          0,
          0,
          0,
        ]),
      );

      console.log(txHere);
      // connector
      //   .sendTransaction(txHere)
      //   .then(info => console.log(info))
      //   .catch(e => console.log(e));
    }
  }, [spell]);

  function RenderBody() {
    if (status === 'Processing') {
      return <TxnHappeningBit />;
    } else if (status === 'Done') {
      return <TxnSentBit />;
    } else {
      return <TxnCancelledBit />;
    }
  }

  return (
    <View
      variant="layout.full_screen"
      sx={{justifyContent: 'center', alignItems: 'center'}}>
      <RenderBody />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(FarmTxnScreen);
