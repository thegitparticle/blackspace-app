import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Appearance,
} from 'react-native';
import {ADD_WDEETS, LOGIN} from '../../../redux/types';
import {connect} from 'react-redux';
import '@ethersproject/shims';
import {ethers} from 'ethers/src.ts/index';
import {AddWDeets} from '../../../redux/WDeetsActions';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {useSharedValue} from 'react-native-reanimated';
import SquircleButton from '../../../bits/SquircleButton';
import LinearGradient from 'react-native-linear-gradient';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

// basic setup and input box with keyboard auto up to take the seed phrase
// on click done - checks for 12 words - if not, throws error and keeps focus on input box,
// if 12 words - calls importWallet function - and sets the waitingTextShowcase = true/1
// when importWallet is done, set the opacity of waiting text = 0 and button and done text = 1

function ImportWalletScreen({dispatch, navigation}) {
  const wallet = {
    wallet_privateKey: null,
    wallet_address: null,
    wallet_phrase: null,
  };
  const [walletDetails, setWalletDetails] = useState(wallet);
  const [walletCreated, setWalletCreated] = useState(false);
  const [phrase, setPhrase] = useState('');
  const waitingText1Opacity = useSharedValue(1);
  const waitingText2Opacity = useSharedValue(0);
  const waitingText3Opacity = useSharedValue(0);
  const [waitingTextOverallOpacity, setWaitingTextOverallOpacity] = useState(1);
  const [
    walletCreatedTextAndButtonOpacity,
    setWalletCreatedTextAndButtonOpacity,
  ] = useState(0);
  const [renderInputBody, setRenderInputBody] = useState(true);

  function importWallet() {
    try {
      const walletCreated = ethers.Wallet.fromMnemonic(phrase);
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
    } catch (e) {
      console.log(e.toString());
      setRenderInputBody(true);
    }

    // navigation.navigate('UserDetailsInputScreen');
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

  function CenterTextWhenDone() {
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

  function NextButtonWhenDone() {
    return (
      <TouchableOpacity
        style={{
          marginVertical: windowHeight * 0.1,
        }}
        onPress={() => {
          navigation.navigate('UserDetailsInputScreen');
        }}>
        <SquircleButton
          buttonColor={'#282828'}
          width={windowWidth * 0.7}
          height={50}
          buttonText={walletCreatedTextAndButtonOpacity === 0 ? '' : 'next ✈️'}
          font={themeHere.text.subhead_medium}
          textColor={themeHere.colors.light}
          style={{
            opacity: walletCreatedTextAndButtonOpacity,
          }}
        />
      </TouchableOpacity>
    );
  }

  function InputWalletSeedPhrase() {
    return (
      <View style={styles.input_wallet_button_view}>
        <View style={styles.input_wrap_view}>
          <TextInput
            style={{
              backgroundColor: 'transparent',
              maxWidth: windowWidth * 0.7,
              color: 'white',
            }}
            onChangeText={setPhrase}
            value={phrase}
            multiline={true}
            autoFocus={true}
            textAlign={'center'}
            placeholder={'type seed phrase words with space'}
            placeholderTextColor={'#FFFFFF50'}
          />
        </View>
        <TouchableOpacity
          style={{
            marginVertical: windowHeight * 0.1,
          }}
          onPress={() => {
            setRenderInputBody(false);
            importWallet();
          }}>
          <SquircleButton
            buttonColor={'#282828'}
            width={windowWidth * 0.7}
            height={50}
            buttonText={'import wallet'}
            font={themeHere.text.subhead_medium}
            textColor={themeHere.colors.light}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function RenderBody() {
    if (renderInputBody) {
      return <InputWalletSeedPhrase />;
    } else {
      return (
        <>
          <CenterTextWhenDone />
          <NextButtonWhenDone />
        </>
      );
    }
  }

  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#050505', '#1F1F1F']}
        style={styles.gradient_background}>
        <Text
          style={{
            ...themeHere.text.title_3,
            color: 'white',
            marginVertical: windowHeight * 0.1,
          }}>
          IMPORT OLD WALLET
        </Text>
        <RenderBody />
      </LinearGradient>
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

export default connect(mapDispatchToProps)(ImportWalletScreen);

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
    backgroundColor: 'transparent',
    width: windowWidth,
    alignItems: 'center',
    marginVertical: windowHeight * 0.075,
  },
});
