import {Text, useSx, View} from 'dripsy';
import {Bounceable} from 'rn-bounceable';
import SquircleGlassButton from '../../../../bits/SquircleGlassButton';
import SpacerVertical from '../../../../bits/SpacerVertical';
import Animated from 'react-native-reanimated';
import {Appearance, Dimensions, RefreshControl} from 'react-native';
import MainDetailsETH from '../ethereum/MainDetailsETH';
import React, {useCallback, useState} from 'react';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {Bars} from 'react-native-loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function RenderBSCWallet({dispatch}) {
  const navigation = useNavigation();
  const sxCustom = useSx();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const connector = useWalletConnect();
  const externalWallet = state_here.WDeetsReducer.wdeets.wallet_connected;

  // Checking, ExternalBSCEnabled, ExternalBSCNotEnabled, InternalWallet
  const [BSCWalletStatus, setBSCWalletStatus] = useState(
    'ExternalBSCNotEnabled',
  );

  const status = connector.accounts;
  console.log(status + 'status');

  function RenderWalletBody() {
    if (BSCWalletStatus === 'Checking') {
      return (
        <View sx={{width: windowWidth, alignItems: 'center'}}>
          <SpacerVertical height={50} />
          <Bars size={10} color="#FDAAFF" />
        </View>
      );
    } else if (BSCWalletStatus === 'ExternalBSCEnabled') {
      return (
        <View sx={{width: windowWidth, alignItems: 'center'}}>
          <SpacerVertical height={50} />
          <Text sx={{...themeHere.text.subhead_medium, color: 'foreground'}}>
            fetch bsc wallet tokens and balances from server
          </Text>
        </View>
      );
    } else if (BSCWalletStatus === 'ExternalBSCNotEnabled') {
      return (
        <View sx={{width: windowWidth, alignItems: 'center'}}>
          <SpacerVertical height={50} />
          <Text
            sx={{
              ...themeHere.text.subhead_medium,
              color: 'foreground',
              width: windowWidth * 0.8,
              textAlign: 'center',
            }}>
            Binance Smart Chain (BSC) has not been enabled in your wallet
          </Text>
          <SpacerVertical height={20} />
          <Text
            sx={{
              ...themeHere.text.subhead_medium,
              color: 'foreground',
              width: windowWidth * 0.8,
              textAlign: 'center',
            }}>
            please go to your wallet and setup it up to use DApps that run on
            BSC
          </Text>
        </View>
      );
    } else if (BSCWalletStatus === 'InternalWallet') {
      return (
        <View sx={{width: windowWidth, alignItems: 'center'}}>
          <SpacerVertical height={50} />
          <Text sx={{...themeHere.text.subhead_medium, color: 'foreground'}}>
            fetch bsc wallet tokens and balances from server
          </Text>
        </View>
      );
    } else {
      return (
        <View sx={{width: windowWidth, alignItems: 'center'}}>
          <SpacerVertical height={50} />
          <Bars size={10} color="#FDAAFF" />
        </View>
      );
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
      <RenderWalletBody />
      <SpacerVertical height={50} />
    </Animated.ScrollView>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(RenderBSCWallet);
