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
import {AddWDeets} from '../../../redux/appcore/WDeetsActions';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {useSharedValue} from 'react-native-reanimated';
import SquircleButton from '../../../bits/SquircleButton';
import LinearGradient from 'react-native-linear-gradient';
import WhileImportingProcessShowcase from '../components/WhileImportingProcessShowcase';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

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
  const [renderErrorBody, setRenderErrorBody] = useState(false);

  function importWallet() {
    try {
      const walletCreated = ethers.Wallet.fromMnemonic(phrase);
      wallet.wallet_address = walletCreated.address;
      wallet.wallet_privateKey = walletCreated.privateKey;
      wallet.wallet_phrase = walletCreated.mnemonicCiphertext;
      setWalletDetails(wallet);
      setWalletCreated(true);
      dispatch(AddWDeets(wallet));
      setWaitingTextOverallOpacity(0);
      setWalletCreatedTextAndButtonOpacity(1);
    } catch (e) {
      console.log(e.toString());
      setRenderErrorBody(true);
    }
  }

  function InputAndImportWalletSeedPhrase() {
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

  function CenterTextWhileImportingAndDone() {
    if (walletCreatedTextAndButtonOpacity === 0) {
      return <WhileImportingProcessShowcase />;
    } else {
      return (
        <Text
          style={{
            ...themeHere.text.body,
            color: 'white',
            marginVertical: windowHeight * 0.1,
            opacity: walletCreatedTextAndButtonOpacity,
          }}>
          done, imported!
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
          navigation.navigate('UserDetailsInputScreen', {
            wallet_address: walletDetails.wallet_address,
          });
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

  function IfErrorBody() {
    return (
      <>
        <Text
          style={{
            ...themeHere.text.body,
            color: themeHere.colors.danger_red,
            marginVertical: windowHeight * 0.1,
            width: windowWidth * 0.7,
            textAlign: 'center',
          }}>
          cannot find wallet with the typed seed phrase, try again!
        </Text>
        <View style={{marginVertical: windowHeight * 0.1}}>
          <TouchableOpacity
            style={{
              marginBottom: windowHeight * 0.01,
            }}
            onPress={() => {
              setRenderErrorBody(false);
              setRenderInputBody(true);
            }}>
            <SquircleButton
              buttonColor={'#282828'}
              width={windowWidth * 0.7}
              height={50}
              buttonText={'try again'}
              font={themeHere.text.subhead_medium}
              textColor={themeHere.colors.light}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: windowHeight * 0.01,
            }}
            onPress={() => {
              setRenderErrorBody(false);
              navigation.navigate('MakeWalletScreen');
            }}>
            <SquircleButton
              buttonColor={themeHere.colors.red + '75'}
              width={windowWidth * 0.7}
              height={50}
              buttonText={'create new wallet'}
              font={themeHere.text.subhead_medium}
              textColor={themeHere.colors.light}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }

  function RenderBody() {
    if (renderErrorBody) {
      return <IfErrorBody />;
    } else {
      if (renderInputBody) {
        return <InputAndImportWalletSeedPhrase />;
      } else {
        return (
          <>
            <CenterTextWhileImportingAndDone />
            <NextButtonWhenDone />
          </>
        );
      }
    }
  }

  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#050505', '#1F1F1F']}
        style={styles.gradient_background}>
        <Text style={styles.screen_header_text}>IMPORT OLD WALLET</Text>
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
  screen_header_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: windowHeight * 0.1,
  },
});
