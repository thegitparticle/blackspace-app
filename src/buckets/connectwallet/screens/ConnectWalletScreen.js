import React, {useEffect, useState} from 'react';
import {
  Appearance,
  Dimensions,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ADD_WDEETS} from '../../../redux/types';
import {connect} from 'react-redux';
import '@ethersproject/shims';
import {ethers} from 'ethers/src.ts/index';
import {AddWDeets} from '../../../redux/appcore/WDeetsActions';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {Bounceable} from 'rn-bounceable';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {Bars} from 'react-native-loader';
import axios from 'axios';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {Amplitude} from '@amplitude/react-native';
import {SquircleView} from 'react-native-figma-squircle';
import SquircleGlassButton from '../../../bits/SquircleGlassButton';
import {BlurView} from '@react-native-community/blur';
import MaskedView from '@react-native-masked-view/masked-view';
import LottieView from 'lottie-react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function ConnectWalletScreen({dispatch, navigation, route}) {
  const {walletInfo} = route.params;

  const wallet = {
    wallet_privateKey: null,
    wallet_address: null,
    wallet_phrase: null,
  };
  // const [walletDetails, setWalletDetails] = useState(wallet);

  const [savedWalletToStore, setSavedWalletToStore] = useState(false);
  const [verifying, setVerifying] = useState(true);

  function saveWallet() {
    wallet.wallet_address = walletInfo.accounts[0];
    wallet.wallet_privateKey = '';
    wallet.wallet_phrase = '';

    dispatch(AddWDeets(wallet));

    setSavedWalletToStore(true);
  }

  function checkUserExistsOrNot() {
    const config = {
      method: 'get',
      url:
        'https://suprblack.xyz/api/users/check_wallet_address_presence/' +
        walletInfo.accounts[0],
      headers: {},
    };

    axios(config)
      .then(function (response) {
        if (response.data.user_exists === 'False') {
          console.log('user does not exist in blackspace db');
          setVerifying(false);
          // navigation.navigate('UserDetailsInputScreen');
        } else {
          setVerifying(false);
          // navigation.navigate('SettingUpAppScreen');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    saveWallet();
    if (savedWalletToStore) {
      checkUserExistsOrNot();
    }
  }, [savedWalletToStore]);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  function RenderBody() {
    if (verifying) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.text_highlighted}>Verifying your wallet</Text>
          <LottieView
            source={require('../../../../assets/panda_popcorn.json')}
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
          <Text style={styles.text_highlighted}>Verification success!</Text>
          {/*<LottieView*/}
          {/*  source={require('../../../../assets/panda_popcorn.json')}*/}
          {/*  autoPlay*/}
          {/*  loop*/}
          {/*  style={{*/}
          {/*    marginVertical: 20,*/}
          {/*    width: windowWidth * 0.25,*/}
          {/*    height: windowWidth * 0.5,*/}
          {/*  }}*/}
          {/*  resizeMode="cover"*/}
          {/*/>*/}
        </View>
      );
    }
  }

  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/colors_background_1.png')}
        resizeMode="cover"
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: windowWidth * 0.9,
          }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: 25,
            }}>
            <Iconly name="ChevronLeftBroken" color="#FFFFFF" size={30} />
          </Pressable>
          <Text style={styles.screen_header_text}>WALLET CONNECTED</Text>
          <Pressable
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: 25,
            }}>
            <Iconly name="CloseSquareBold" color="#FFFFFF00" size={30} />
          </Pressable>
        </View>
        <RenderBody />
      </ImageBackground>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onImportWalletClick: () => {
      dispatch({type: ADD_WDEETS});
    },
  };
};

export default connect(mapDispatchToProps)(ConnectWalletScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
  },
  gradient_background: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  waiting_text_showcase_view: {
    width: windowWidth * 0.8,
    alignItems: 'center',
  },
  input_wallet_button_view: {
    width: windowWidth,
    alignItems: 'center',
  },
  input_wrap_view: {
    width: windowWidth - 40,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen_header_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: windowHeight * 0.1,
  },
  text_highlighted: {
    ...themeHere.text.header,
    color: themeHere.colors.foreground,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
  },
});
