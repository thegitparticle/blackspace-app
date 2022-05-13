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

  console.log(state_here.UserDetailsReducer.userdetails.wallet_address);

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
    return (
      <View
        style={{
          marginVertical: windowHeight * 0.1,
          alignSelf: 'center',
        }}>
        <Bounceable
          onPress={() => {
            navigation.navigate('WalletSetupOptionsScreen');
            // Amplitude.getInstance().logEvent(
            //   'LFG_WELCOME_BUTTON_CLICKED',
            // );
          }}>
          <SquircleGlassButton
            buttonColor={themeHere.colors.light}
            width={windowWidth * 0.7}
            height={50}
            buttonText={'LFG! 🚀'}
            font={themeHere.text.title_3}
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
