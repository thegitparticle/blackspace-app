import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Appearance,
} from 'react-native';
import {ADD_WDEETS, LOGIN} from '../../../redux/types';
import {connect} from 'react-redux';
import '@ethersproject/shims';
import {ethers} from 'ethers/src.ts/index';
import {AddWDeets} from '../../../redux/appcore/WDeetsActions';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import LinearGradient from 'react-native-linear-gradient';
import SquircleButton from '../../../bits/SquircleButton';
import {useSharedValue} from 'react-native-reanimated';
import {Bars} from 'react-native-loader';
import LottieView from 'lottie-react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {Bounceable} from 'rn-bounceable';

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
    createWallet();
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
  }

  function WaitingTextShowCase() {
    return (
      <View
        style={{
          ...styles.waiting_text_showcase_view,
          opacity: waitingTextOverallOpacity,
          marginVertical: windowHeight * 0.1,
        }}>
        <Text
          style={{
            ...themeHere.text.header_bold,
            position: 'absolute',
            textAlign: 'center',
            opacity: waitingText1Opacity.value,
            color: 'white',
          }}>
          creating new wallet ...
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
            loop
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
      <LinearGradient
        colors={['#FF5B3A', '#FF3293']}
        style={styles.gradient_background}>
        <Text style={styles.heading_text}>CREATE NEW WALLET</Text>
        <CenterText />
        <Bounceable
          style={{
            marginVertical: windowHeight * 0.1,
          }}
          onPress={() => {
            navigation.navigate('SaveSeedPhraseScreen');
          }}>
          <SquircleButton
            buttonColor={
              walletCreatedTextAndButtonOpacity === 0
                ? themeHere.colors.red_light + '00'
                : themeHere.colors.red_light + '99'
            }
            width={windowWidth * 0.7}
            height={50}
            buttonText={
              walletCreatedTextAndButtonOpacity === 0 ? '' : 'next ✈️'
            }
            font={themeHere.text.subhead_medium}
            textColor={themeHere.colors.light}
          />
        </Bounceable>
      </LinearGradient>
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
    backgroundColor: 'tomato',
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
