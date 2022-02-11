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
import {Bubbles} from 'react-native-loader';
import LottieView from 'lottie-react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import _ from 'lodash';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function SeedPhraseScreen({dispatch, navigation}) {
  const [seedPhraseList, setSeedPhraseList] = useState([]);

  useEffect(() => {
    setSeedPhraseList(
      _.split(state_here.WDeetsReducer.wdeets.wallet_phrase, ' '),
    );
  }, []);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  function CenterText() {
    if (walletCreatedTextAndButtonOpacity === 0) {
      return <Bubbles size={10} color="#FFF" />;
    } else {
      return (
        <View style={{marginVertical: windowHeight * 0.1}}>
          <Text
            style={{
              ...themeHere.text.header_bold,
              color: 'white',
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            note your seed phrase down carefully and put it in securely. this is
            all you need to access your wallet from blackSpace or any other
            Ethereum wallet app
          </Text>
          {seedPhraseList.map(item => (
            <View style={{backgroundColor: themeHere.colors.blue, padding: 10}}>
              <Text
                style={{
                  ...themeHere.text.header_bold,
                  color: 'white',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                {item}
              </Text>
            </View>
          ))}
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
        <Text style={styles.heading_text}>SEED PHRASE</Text>
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
            buttonText={'I have noted it down'}
            font={themeHere.text.subhead_medium}
            textColor={themeHere.colors.light}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SeedPhraseScreen);

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
