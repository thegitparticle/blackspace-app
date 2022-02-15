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
import {Bounceable} from 'rn-bounceable';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import axios from 'axios';

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
  const [walletCreating, setWalletCreating] = useState(false);
  const [phrase, setPhrase] = useState('');
  const [waitingTextOverallOpacity, setWaitingTextOverallOpacity] = useState(1);
  const [
    walletCreatedTextAndButtonOpacity,
    setWalletCreatedTextAndButtonOpacity,
  ] = useState(0);
  const [renderInputBody, setRenderInputBody] = useState(true);
  const [renderErrorBody, setRenderErrorBody] = useState(false);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  function importWallet() {
    try {
      const walletCreated = ethers.Wallet.fromMnemonic(phrase);
      wallet.wallet_address = walletCreated.address;
      wallet.wallet_privateKey = walletCreated.privateKey;
      wallet.wallet_phrase = walletCreated.mnemonic;
      setWalletDetails(wallet);
      setWalletCreating(false);
      console.log(wallet);
      dispatch(AddWDeets(wallet));
      setWaitingTextOverallOpacity(0);
      setWalletCreatedTextAndButtonOpacity(1);
      ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    } catch (e) {
      console.log(e.toString());
      setWalletCreating(false);
      setRenderErrorBody(true);
      ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
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
              ...themeHere.text.subhead_medium,
            }}
            onChangeText={setPhrase}
            value={phrase}
            multiline={true}
            autoFocus={true}
            textAlign={'center'}
            placeholder={'type seed phrase words with space in between them'}
            placeholderTextColor={'#FFFFFF50'}
          />
        </View>
        <View
          style={{
            marginVertical: windowHeight * 0.1,
          }}>
          <Bounceable
            onPress={() => {
              setWalletCreating(true);
              setRenderInputBody(false);
              setTimeout(() => {
                importWallet();
              }, 1000);
            }}>
            <SquircleButton
              buttonColor={walletCreating === true ? '#28282800' : '#282828'}
              width={windowWidth * 0.7}
              height={50}
              buttonText={
                walletCreating === true ? 'importing ...' : 'import wallet'
              }
              font={themeHere.text.subhead_medium}
              textColor={themeHere.colors.light}
            />
          </Bounceable>
        </View>
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
    const [checkingUserExists, setCheckingUserExists] = useState(false);
    const [userStatus, setUserStatus] = useState('');

    function checkUserExistsOrNot() {
      const config = {
        method: 'get',
        url:
          'https://suprblack.xyz/api/users/check_wallet_address_presence/' +
          walletDetails.wallet_address,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          if (response.data.user_exists === 'False') {
            navigation.navigate('UserDetailsInputScreen');
          } else {
            navigation.navigate('SettingUpAppScreen');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function ShowBars() {
      if (checkingUserExists) {
        return <Bars size={10} color="#FDAAFF" />;
      } else {
        return <View />;
      }
    }

    return (
      <TouchableOpacity
        style={{
          marginVertical: windowHeight * 0.1,
          alignItems: 'center',
        }}
        onPress={() => {
          setCheckingUserExists(true);
          checkUserExistsOrNot();
        }}>
        <ShowBars />
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
          <View
            style={{
              marginBottom: windowHeight * 0.01,
            }}>
            <Bounceable
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
            </Bounceable>
          </View>
          <View
            style={{
              marginBottom: windowHeight * 0.01,
            }}>
            <Bounceable
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
            </Bounceable>
          </View>
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
