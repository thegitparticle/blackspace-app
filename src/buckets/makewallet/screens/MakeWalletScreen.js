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
import {AddWDeets} from '../../../redux/WDeetsActions';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import LinearGradient from 'react-native-linear-gradient';
import SquircleButton from '../../../bits/SquircleButton';
import {useSharedValue} from 'react-native-reanimated';

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
  const waitingText2Opacity = useSharedValue(0);
  const waitingText3Opacity = useSharedValue(0);
  const [waitingTextOverallOpacity, setWaitingTextOverallOpacity] = useState(1);
  const [
    walletCreatedTextAndButtonOpacity,
    setWalletCreatedTextAndButtonOpacity,
  ] = useState(0);

  useEffect(() => {
    WaitingTextChanger();
    createWallet();
  }, []);

  function createWallet() {
    console.log('create wallet called');
    const walletCreated = ethers.Wallet.createRandom();
    wallet.wallet_address = walletCreated.address;
    wallet.wallet_privateKey = walletCreated.privateKey;
    wallet.wallet_phrase = walletCreated.mnemonicCiphertext;
    console.log(walletCreated.privateKey);
    console.log(walletCreated.address);
    console.log(walletCreated.mnemonic);
    setWalletDetails(wallet);
    setWalletCreated(true);
    dispatch(AddWDeets(wallet));
    setWaitingTextOverallOpacity(0);
    setWalletCreatedTextAndButtonOpacity(1);
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
            ...themeHere.text.body,
            position: 'absolute',
            textAlign: 'center',
            opacity: waitingText1Opacity.value,
            color: 'white',
          }}>
          creating new wallet ...
        </Text>
        <Text
          style={{
            ...themeHere.text.body,
            position: 'absolute',
            textAlign: 'center',
            opacity: waitingText2Opacity.value,
            color: 'white',
          }}>
          fetching details from blockchain ...
        </Text>
        <Text
          style={{
            ...themeHere.text.body,
            position: 'absolute',
            textAlign: 'center',
            opacity: waitingText3Opacity.value,
            color: 'white',
          }}>
          how long? you could be asking!!!
        </Text>
      </View>
    );
  }

  function WaitingTextChanger() {
    setTimeout(() => {
      console.log('1 sec done');
      waitingText1Opacity.value = 0;
      waitingText2Opacity.value = 1;
    }, 1000);
    setTimeout(() => {
      waitingText2Opacity.value = 0;
      waitingText3Opacity.value = 1;
    }, 2000);
  }

  function CenterText() {
    if (walletCreatedTextAndButtonOpacity === 0) {
      return <WaitingTextShowCase />;
    } else {
      return (
        <Text
          style={{
            ...themeHere.text.body,
            color: 'white',
            marginVertical: windowHeight * 0.1,
            opacity: walletCreatedTextAndButtonOpacity,
          }}>
          finally, created!
        </Text>
      );
    }
  }

  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#FF5B3A', '#FF3293']}
        style={styles.gradient_background}>
        <Text
          style={{
            ...themeHere.text.title_3,
            color: 'white',
            marginVertical: windowHeight * 0.1,
          }}>
          CREATE NEW WALLET
        </Text>
        <CenterText />
        <TouchableOpacity
          style={{
            marginVertical: windowHeight * 0.1,
          }}
          onPress={() => {
            navigation.navigate('UserDetailsInputScreen');
          }}>
          <SquircleButton
            buttonColor={themeHere.colors.red_light}
            width={windowWidth * 0.7}
            height={50}
            buttonText={
              walletCreatedTextAndButtonOpacity === 0 ? '' : 'next ✈️'
            }
            font={themeHere.text.subhead_medium}
            textColor={themeHere.colors.light}
            style={{
              opacity: walletCreatedTextAndButtonOpacity,
            }}
          />
        </TouchableOpacity>
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
});
