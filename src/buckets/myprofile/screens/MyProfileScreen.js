import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Appearance, Dimensions, Pressable, RefreshControl} from 'react-native';
import {Text, useSx, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
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
import MainDetailsETH from '../components/MainDetailsETH';
import WalletPieETH from '../components/WalletPieETH';
import AccordianPortfolioETH from '../components/AccordianPortfolioETH';
import RenderAppBluePrintHelper from '../../miniapp/helpers/RenderAppBluePrintHelper';
import RenderAppJargonBusterHelper from '../../miniapp/helpers/RenderAppJargonBusterHelper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import LottieView from 'lottie-react-native';
import SquircleButton from '../../../bits/SquircleButton';
import bs58 from 'bs58';
import nacl from 'tweetnacl';
import SolanaWalletComponent from '../components/SolanaWalletComponent';

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
  const sxCustom = useSx();

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

  function RenderETHWallet() {
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

  const [index, setIndex] = useState(0);

  const ETHWallet = useMemo(
    () =>
      function ETHWallet() {
        return <RenderETHWallet />;
      },
    [],
  );

  const renderSceneMultipleWallets = SceneMap({
    first: ETHWallet,
  });

  const [routes] = React.useState([
    {key: 'first', title: 'Ethereum'},
  ]);

  function renderLabelMultipleWallets({route, focused}) {
    if (route.title === 'Ethereum') {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'red'}}>
              Ethereum
            </Text>
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'foreground'}}>
              Ethereum
            </Text>
          </View>
        );
      }
    } else if (route.title === 'Solana') {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'red'}}>
              Solana
            </Text>
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'foreground'}}>
              Solana
            </Text>
          </View>
        );
      }
    } else {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'red'}}>
              ---
            </Text>
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'foreground'}}>
              ---
            </Text>
          </View>
        );
      }
    }
  }

  const renderTabBarMultipleWallets = props => (
    <TabBar
      {...props}
      indicatorStyle={sxCustom({
        width: 0,
      })}
      style={sxCustom({
        backgroundColor: themeHere.colors.off_background,
        position: 'absolute',
        color: '#000',
        height: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        width: windowWidth * 0.8,
        marginBottom: windowHeight * 0.05,
        borderRadius: 30,
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
      })}
      renderLabel={renderLabelMultipleWallets}
      tabStyle={{backgroundColor: 'transparent'}}
    />
  );

  return (
    <View variant="layout.full_screen">
      <HeaderHere />
      <TabView
        navigationState={{index, routes}}
        renderTabBar={renderTabBarMultipleWallets}
        renderScene={renderSceneMultipleWallets}
        onIndexChange={setIndex}
        initialLayout={{width: windowWidth}}
        tabBarPosition="bottom"
      />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MyProfileScreen);
