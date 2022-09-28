import {useNavigation} from '@react-navigation/native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {Text, useSx, View} from 'dripsy';
import React, {useCallback, useState} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import SpacerVertical from '../../../../../bits/SpacerVertical';
import SquircleButton from '../../../../../bits/SquircleButton';
import {dripsytheme} from '../../../../../theme/DripsyTheme';
import AccordianPortfolioETH from './AccordianPortfolioETH';
import MainDetailsETH from './MainDetailsETH';
import WalletPieETH from './WalletPieETH';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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

  const externalWallet = state_here.WDeetsReducer.wdeets.wallet_connected;
  const externalWalletName =
    state_here.WDeetsReducer.wdeets.wallet_connected_name;
  const externalWalletCurrentlyActive = connector.connected;

  function ExternalEthWallet() {
    if (externalWallet) {
      if (externalWalletCurrentlyActive) {
        return (
          <View
            sx={{
              marginVertical: windowHeight * 0.1,
              alignSelf: 'center',
            }}>
            <Text
              variant={'body_thick'}
              sx={{
                color: 'layout_1',
                opacity: 0.75,
              }}>
              this wallet is connected from {externalWalletName} app.
            </Text>
          </View>
        );
      } else {
        return (
          <View
            sx={{
              marginVertical: windowHeight * 0.1,
              alignSelf: 'center',
            }}>
            <Text
              variant={'body_thick'}
              sx={{
                color: 'layout_1',
                opacity: 0.75,
                textAlign: 'center',
                marginBottom: '$4',
              }}>
              {externalWalletName} wallet lost connection.
            </Text>
            <Bounceable
              onPress={() =>
                connector
                  .connect()
                  .then(wallet_info => {
                    console.log(wallet_info);
                  })
                  .catch(e => console.log(e))
              }>
              <SquircleButton
                buttonColor={dripsytheme.colors.layout_2}
                width={windowWidth * 0.7}
                height={50}
                buttonText={'reconnect'}
                font={dripsytheme.text.body_thick}
                textColor={dripsytheme.colors.success_2}
              />
            </Bounceable>
          </View>
        );
      }
    } else {
      return (
        <View
          sx={{
            marginVertical: windowHeight * 0.1,
            alignSelf: 'center',
          }}
        />
      );
    }
  }

  function ConnectedWalletButtonsETH() {
    if (state_here.WDeetsReducer.wdeets.wallet_connected) {
      return (
        <>
          <SpacerVertical height={30} />
          <ExternalEthWallet />
          <SpacerVertical height={30} />
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
          tintColor={dripsytheme.colors.layout_1}
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
