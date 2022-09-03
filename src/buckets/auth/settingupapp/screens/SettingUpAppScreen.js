import React, {useEffect, useState} from 'react';
import {
  Appearance,
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {GetMyProfileDetails} from '../../../../redux/appcore/MyProfileActions';
import {GetTokenBalances} from '../../../../redux/appcore/MyTokenBalancesActions';
import {AddUserDetails} from '../../../../redux/appcore/UserDetailsActions';
import {LOGIN} from '../../../../redux/types';
import {Amplitude} from '@amplitude/react-native';
import {AddWDeets} from '../../../../redux/appcore/WDeetsActions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function SettingUpAppScreen({dispatch, route}) {
  const {wallet_info} = route.params;
  const [apiDone, setAPIDone] = useState(false);

  useEffect(() => {
    const wallet = {
      wallet_privateKey: null,
      wallet_address: null,
      wallet_phrase: null,
      wallet_connected: false,
      wallet_connected_name: null,
    };
    wallet.wallet_address = wallet_info.accounts[0];
    wallet.wallet_privateKey = '';
    wallet.wallet_phrase = {};
    wallet.wallet_connected = true;
    wallet.wallet_connected_name = wallet_info.peerMeta.name;
    dispatch(AddWDeets(wallet));
    setTimeout(() => {
      dispatch({type: LOGIN});
    }, 5000);
  }, [wallet_info]);

  function RenderBody() {
    if (!apiDone) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.text_highlighted}>
            Setting up blackSpace for you
          </Text>
          <LottieView
            source={require('../../../../../assets/panda_popcorn.json')}
            autoPlay
            loop
            style={{
              marginVertical: 20,
              width: windowWidth * 0.25,
              height: windowWidth * 0.5,
            }}
            resizeMode="cover"
          />
        </View>
      );
    } else {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <LottieView
            source={require('../../../../../assets/success_tick_lottie.json')}
            autoPlay
            loop={false}
            style={{
              marginVertical: 20,
              width: windowWidth * 0.25,
              height: windowWidth * 0.5,
            }}
            resizeMode="cover"
          />
          <Text style={styles.text_highlighted}>You are all set</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <RenderBody />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SettingUpAppScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient_background: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_highlighted: {
    ...themeHere.text.header,
    color: themeHere.colors.foreground,
    marginVertical: 30,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
    lineHeight: 30,
  },
  text_not_highlighted: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginVertical: 30,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
    lineHeight: 30,
  },
});
