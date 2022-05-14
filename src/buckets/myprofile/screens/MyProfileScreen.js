import React, {useCallback, useEffect, useState} from 'react';
import {Appearance, Dimensions, Pressable, RefreshControl} from 'react-native';
import {Text, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import MainDetails from '../components/MainDetails';
import WalletPie from '../components/WalletPie';
import AccordianPortfolio from '../components/AccordianPortfolio';
import Animated from 'react-native-reanimated';
import SpacerVertical from '../../../bits/SpacerVertical';
import {connect} from 'react-redux';
import {GetMyProfileDetails} from '../../../redux/appcore/MyProfileActions';
import {GetTokenBalances} from '../../../redux/appcore/MyTokenBalancesActions';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';
import {Amplitude} from '@amplitude/react-native';
import {GetMyNfts} from '../../../redux/appcore/MyNFTsActions';
import {Bounceable} from 'rn-bounceable';
import SquircleGlassButton from '../../../bits/SquircleGlassButton';
import {useWalletConnect} from '@walletconnect/react-native-dapp';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function MyProfileScreen({dispatch}) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const connector = useWalletConnect();

  // console.log(state_here.UserDetailsReducer.userdetails.wallet_address);

  useEffect(() => {
    dispatch(GetMyProfileDetails(state_here.UserDetailsReducer.userdetails.id));
    dispatch(
      GetTokenBalances(
        state_here.UserDetailsReducer.userdetails.wallet_address,
      ),
    );
    dispatch(GetMyNfts(state_here.UserDetailsReducer.userdetails.id));
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function HeaderHere() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: windowWidth,
          flexDirection: 'row',
          height: 75,
        }}>
        <Pressable
          style={{padding: 20}}
          onPress={() => {
            Amplitude.getInstance().logEvent('SETTINGS_OPEN_BUTTON_CLICK');
            navigation.navigate('SettingsStack');
          }}>
          <Iconly
            name="SettingBold"
            color={themeHere.colors.foreground}
            size={25}
          />
        </Pressable>
        <Text
          style={{
            ...themeHere.text.title_3,
            color: themeHere.colors.foreground,
          }}>
          MY WALLET
        </Text>
        <Pressable style={{padding: 20}} onPress={() => navigation.goBack()}>
          <Iconly
            name="ChevronDownBroken"
            color={themeHere.colors.foreground}
            size={25}
          />
        </Pressable>
      </View>
    );
  }

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

  return (
    <View variant="layout.full_screen">
      <HeaderHere />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={themeHere.colors.foreground}
          />
        }>
        <MainDetails />
        <WalletPie />
        <AccordianPortfolio />
        <SpacerVertical height={30} />
        <ConnectExternalEthWallet />
        <SpacerVertical height={30} />
        <DoExternalTransactionETH />
        <SpacerVertical height={50} />
      </Animated.ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MyProfileScreen);
