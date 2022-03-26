import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, ImageBackground, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { ADD_WDEETS } from "../../../redux/types";
import { connect } from "react-redux";
import "@ethersproject/shims";
import { ethers } from "ethers/src.ts/index";
import { AddWDeets } from "../../../redux/appcore/WDeetsActions";
import { ButterThemeDark, ButterThemeLight } from "../../../theme/ButterTheme";
import { useSharedValue } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { Bounceable } from "rn-bounceable";
import Iconly from "../../../miscsetups/customfonts/Iconly";
import { Amplitude } from "@amplitude/react-native";
import SquircleGlassButton from "../../../bits/SquircleGlassButton";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MakeWalletScreen({dispatch, navigation}) {
  const wallet = {
    wallet_privateKey: null,
    wallet_address: null,
    wallet_phrase: null,
  };
  const [walletDetails, setWalletDetails] = useState(wallet);
  const [walletCreated, setWalletCreated] = useState(false);
  const waitingText1Opacity = useSharedValue(1);
  const [waitingTextOverallOpacity, setWaitingTextOverallOpacity] = useState(1);
  const [
    walletCreatedTextAndButtonOpacity,
    setWalletCreatedTextAndButtonOpacity,
  ] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      createWallet();
    }, 500);
  }, []);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  function createWallet() {
    const walletCreated = ethers.Wallet.createRandom();
    wallet.wallet_address = walletCreated.address;
    wallet.wallet_privateKey = walletCreated.privateKey;
    wallet.wallet_phrase = walletCreated.mnemonic;
    console.log(walletCreated.privateKey);
    console.log(walletCreated.address);
    console.log(walletCreated.mnemonic);
    setWalletDetails(wallet);
    setWalletCreated(true);
    dispatch(AddWDeets(wallet));
    setWaitingTextOverallOpacity(0);
    setWalletCreatedTextAndButtonOpacity(1);
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    Amplitude.getInstance().logEvent('NEW_WALLET_CREATED');
  }

  function WaitingTextShowCase() {
    return (
      <View
        style={{
          ...styles.waiting_text_showcase_view,
          opacity: waitingTextOverallOpacity,
          marginVertical: windowHeight * 0.25,
        }}>
        <Text
          style={{
            ...themeHere.text.header_bold,
            position: 'absolute',
            textAlign: 'center',
            opacity: waitingText1Opacity.value,
            color: 'white',
          }}>
          creating new wallet. {'\n'} this will take 20 seconds...
        </Text>
      </View>
    );
  }

  function CenterText() {
    if (walletCreatedTextAndButtonOpacity === 0) {
      return <WaitingTextShowCase />;
    } else {
      return (
        <View>
          <LottieView
            source={require('../../../../assets/success_tick_lottie.json')}
            autoPlay
            loop={false}
            style={{
              marginVertical: 20,
              width: windowWidth * 0.25,
              height: windowWidth * 0.5,
            }}
            resizeMode="cover"
          />
          <Text
            style={{
              ...themeHere.text.header_bold,
              color: 'white',
              marginVertical: windowHeight * 0.1,
              opacity: walletCreatedTextAndButtonOpacity,
              alignSelf: 'center',
            }}>
            your new wallet, created!
          </Text>
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
          <Text style={styles.heading_text}>CREATE NEW WALLET</Text>
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
        <CenterText />
        <View style={{marginTop: windowHeight * 0.1}}>
          <Bounceable
            onPress={() => {
              navigation.navigate('SaveSeedPhraseScreen');
            }}>
            <SquircleGlassButton
              buttonColor={
                walletCreatedTextAndButtonOpacity === 0
                  ? themeHere.colors.mid_ground + '00'
                  : themeHere.colors.mid_ground
              }
              width={windowWidth * 0.7}
              height={50}
              buttonText={
                walletCreatedTextAndButtonOpacity === 0 ? '' : 'next ✈️'
              }
              font={themeHere.text.subhead_medium}
              textColor={themeHere.colors.light}
              blurType={'ultraThinMaterialDark'}
            />
          </Bounceable>
        </View>
      </ImageBackground>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onMakeWalletClick: () => {
      dispatch({type: ADD_WDEETS});
    },
  };
};

export default connect(mapDispatchToProps)(MakeWalletScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeHere.colors.background,
  },
  gradient_background: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  waiting_text_showcase_view: {
    width: windowWidth * 0.8,
    alignItems: 'center',
  },
  heading_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: windowHeight * 0.1,
  },
});
