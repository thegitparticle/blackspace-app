import {Amplitude} from '@amplitude/react-native';
import {useNavigation} from '@react-navigation/native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {Text, useSx, View} from 'dripsy';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Appearance, Dimensions, Pressable} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {connect} from 'react-redux';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {GetMyNfts} from '../../../../redux/appcore/MyNFTsActions';
import {GetMyProfileDetails} from '../../../../redux/appcore/MyProfileActions';
import {GetTokenBalances} from '../../../../redux/appcore/MyTokenBalancesActions';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import RenderBSCWallet from '../components/bsc/RenderBSCWallet';
import RenderETHWallet from '../components/ethereum/RenderETHWallet';

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

  const [index, setIndex] = useState(0);

  const ETHWallet = useMemo(
    () =>
      function ETHWallet() {
        return <RenderETHWallet />;
      },
    [],
  );

  const BSCWallet = useMemo(
    () =>
      function BSCWallet() {
        return <RenderBSCWallet />;
      },
    [],
  );

  const renderSceneMultipleWallets = SceneMap({
    first: ETHWallet,
    second: BSCWallet,
  });

  const [routes] = React.useState([
    {key: 'first', title: 'Ethereum'},
    {key: 'second', title: 'BSC'},
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
    } else if (route.title === 'BSC') {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'red'}}>
              BSC
            </Text>
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Text variant="subhead_bold" sx={{color: 'foreground'}}>
              BSC
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
