import React, {useState} from 'react';
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
import WhileImportingProcessShowcase from '../components/WhileImportingProcessShowcase';
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
      // do not save mnemonic in store, wtf!!!
      wallet.wallet_phrase = walletCreated.mnemonic;
      setWalletDetails(wallet);
      setWalletCreating(false);
      console.log(wallet);
      dispatch(AddWDeets(wallet));
      setWaitingTextOverallOpacity(0);
      setWalletCreatedTextAndButtonOpacity(1);
      Amplitude.getInstance().logEvent('OLD_WALLET_IMPORT_SUCCESS');
      ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    } catch (e) {
      console.log(e.toString());
      setWalletCreating(false);
      setRenderErrorBody(true);
      Amplitude.getInstance().logEvent('OLD_WALLET_IMPORT_FAILED');
      ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
    }
  }

  function InputAndImportWalletSeedPhrase() {
    return (
      <View style={styles.input_wallet_button_view}>
        <MaskedView
          style={{
            width: windowWidth - 40,
            height: windowHeight * 0.2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          maskElement={
            <SquircleView
              style={{
                width: windowWidth - 40,
                height: windowHeight * 0.2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              squircleParams={{
                cornerSmoothing: 1,
                cornerRadius: 30,
                fillColor: themeHere.colors.mid_ground,
              }}
            />
          }>
          <BlurView
            style={{
              width: windowWidth - 40,
              height: windowHeight * 0.2,
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            blurType={'thinMaterialDark'}
            blurAmount={10}
            reducedTransparencyFallbackColor="gray"
          />
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
            textAlignVertical={'center'}
            clearButtonMode="always"
            placeholder={
              'type seed phrase words here. \n \n 1. give space between words \n 2. lower or upper case doesnt matter'
            }
            placeholderTextColor={'#FFFFFF50'}
          />
        </MaskedView>
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
            <SquircleGlassButton
              buttonColor={
                walletCreating === true
                  ? 'transparent'
                  : themeHere.colors.mid_ground
              }
              width={windowWidth * 0.7}
              height={50}
              buttonText={
                walletCreating === true ? 'importing ...' : 'import wallet'
              }
              font={themeHere.text.subhead_medium}
              textColor={themeHere.colors.light}
              blurType={'ultraThinMaterialDark'}
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

    if (walletCreatedTextAndButtonOpacity === 0) {
      return <View />;
    } else {
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
          <SquircleGlassButton
            buttonColor={'#282828'}
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
            blurType={'ultraThinMaterialDark'}
          />
        </TouchableOpacity>
      );
    }
  }

  function IfErrorBody() {
    return (
      <>
        <Text
          style={{
            ...themeHere.text.subhead_medium,
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
              <SquircleGlassButton
                buttonColor={'#282828'}
                width={windowWidth * 0.7}
                height={50}
                buttonText={'try again'}
                font={themeHere.text.subhead_medium}
                textColor={themeHere.colors.light}
                blurType={'ultraThinMaterialDark'}
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
              <SquircleGlassButton
                buttonColor={themeHere.colors.red}
                width={windowWidth * 0.7}
                height={50}
                buttonText={'create new wallet'}
                font={themeHere.text.subhead_medium}
                textColor={themeHere.colors.success_green}
                blurType={'ultraThinMaterialDark'}
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
          <Text style={styles.screen_header_text}>IMPORT OLD WALLET</Text>
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
});
