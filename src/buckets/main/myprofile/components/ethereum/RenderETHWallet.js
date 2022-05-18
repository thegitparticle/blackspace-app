import {useSx, View} from 'dripsy';
import {Bounceable} from 'rn-bounceable';
import SquircleGlassButton from '../../../../../bits/SquircleGlassButton';
import SpacerVertical from '../../../../../bits/SpacerVertical';
import Animated from 'react-native-reanimated';
import {Appearance, Dimensions, RefreshControl} from 'react-native';
import MainDetailsETH from './MainDetailsETH';
import WalletPieETH from './WalletPieETH';
import AccordianPortfolioETH from './AccordianPortfolioETH';
import React, {useCallback, useState} from 'react';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function RenderETHWallet({dispatch}) {
  const navigation = useNavigation();
  const sxCustom = useSx();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const connector = useWalletConnect();

  function ConnectExternalEthWallet() {
    if (connector.connected) {
      return (
        <View
          style={{
            marginVertical: windowHeight * 0.1,
            alignSelf: 'center',
          }}>
          <Bounceable
            onPress={() => {
              connector
                .killSession()
                .then(info => console.log(info))
                .catch(e => console.log(e));
              // Amplitude.getInstance().logEvent(
              //   'LFG_WELCOME_BUTTON_CLICKED',
              // );
            }}>
            <SquircleGlassButton
              buttonColor={themeHere.colors.light}
              width={windowWidth * 0.7}
              height={50}
              buttonText={'Disconnect Wallet'}
              font={themeHere.text.subhead_medium_i}
              textColor={themeHere.colors.red}
            />
          </Bounceable>
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginVertical: windowHeight * 0.1,
            alignSelf: 'center',
          }}>
          <Bounceable
            onPress={() => {
              connector
                .connect()
                .then(info => console.log(info))
                .catch(e => console.log(e));
              // Amplitude.getInstance().logEvent(
              //   'LFG_WELCOME_BUTTON_CLICKED',
              // );
            }}>
            <SquircleGlassButton
              buttonColor={themeHere.colors.light}
              width={windowWidth * 0.7}
              height={50}
              buttonText={'Connect Metamask'}
              font={themeHere.text.subhead_medium_i}
              textColor={themeHere.colors.red}
            />
          </Bounceable>
        </View>
      );
    }
  }

  function DoExternalTransactionETH() {
    let txData = {
      from: '0x2811a48be8872b7d4eeed7205c1df2e15c76bd08',
      to: '0x14a28bD398B5b282a363f53A2c28e0E8ed211469',
      gas: '',
      gasPrice: '', // Required
      value: '1000000000000000',
      data: '',
      nonce: '',
    };

    return (
      <View
        style={{
          marginVertical: windowHeight * 0.1,
          alignSelf: 'center',
        }}>
        <Bounceable
          onPress={() => {
            connector
              .sendTransaction(txData)
              .then(info => console.log(info))
              .catch(e => console.log(e));
          }}>
          <SquircleGlassButton
            buttonColor={themeHere.colors.light}
            width={windowWidth * 0.7}
            height={50}
            buttonText={'Send ETH'}
            font={themeHere.text.subhead_medium_i}
            textColor={themeHere.colors.red}
          />
        </Bounceable>
      </View>
    );
  }

  function ConnectedWalletButtonsETH() {
    // console.log(state_here.WDeetsReducer.wdeets);
    if (state_here.WDeetsReducer.wdeets.wallet_connected) {
      return (
        <>
          <SpacerVertical height={30} />
          <ConnectExternalEthWallet />
          <SpacerVertical height={30} />
          <DoExternalTransactionETH />
        </>
      );
    } else {
      return <></>;
    }
  }

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={themeHere.colors.foreground}
        />
      }>
      <SpacerVertical height={60} />
      <MainDetailsETH />
      <WalletPieETH />
      <AccordianPortfolioETH />
      <ConnectedWalletButtonsETH />
      <SpacerVertical height={50} />
    </Animated.ScrollView>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(RenderETHWallet);
