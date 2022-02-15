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
import {Chip} from 'react-native-elements';
import {Bounceable} from 'rn-bounceable';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function SaveSeedPhraseScreen({dispatch, navigation}) {
  const [seedPhraseList, setSeedPhraseList] = useState([]);

  useEffect(() => {
    console.log(state_here.WDeetsReducer.wdeets.wallet_phrase);
    setSeedPhraseList(
      _.split(state_here.WDeetsReducer.wdeets.wallet_phrase.phrase, ' '),
    );
  }, []);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  function CenterText() {
    if (seedPhraseList.length === 0) {
      return <Bubbles size={10} color="#FFF" />;
    } else {
      return (
        <View style={{marginVertical: windowHeight * 0.1}}>
          <Text
            style={{
              ...themeHere.text.subhead_i,
              color: 'white',
              alignSelf: 'center',
              textAlign: 'center',
              marginBottom: windowHeight * 0.1,
              maxWidth: windowWidth * 0.8,
            }}>
            note your seed phrase down carefully in the exact order and put it
            in securely. this is all you need to access your wallet from
            blackSpace or any other Ethereum wallet app
          </Text>
          <View
            style={{
              marginVertical: windowHeight * 0.01,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {seedPhraseList.slice(0, 3).map((item, id) => (
              <View
                style={{
                  backgroundColor: themeHere.colors.red_light,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 120,
                  marginHorizontal: 5,
                }}>
                <Text
                  style={{
                    ...themeHere.text.subhead_bold,
                    color: 'white',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {id + 1}. {item}
                </Text>
              </View>
            ))}
          </View>
          <View
            style={{
              marginVertical: windowHeight * 0.01,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {seedPhraseList.slice(3, 6).map((item, id) => (
              <View
                style={{
                  backgroundColor: themeHere.colors.red_light,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 120,
                  marginHorizontal: 5,
                }}>
                <Text
                  style={{
                    ...themeHere.text.subhead_bold,
                    color: 'white',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {id + 4}. {item}
                </Text>
              </View>
            ))}
          </View>
          <View
            style={{
              marginVertical: windowHeight * 0.01,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {seedPhraseList.slice(6, 9).map((item, id) => (
              <View
                style={{
                  backgroundColor: themeHere.colors.red_light,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 120,
                  marginHorizontal: 5,
                }}>
                <Text
                  style={{
                    ...themeHere.text.subhead_bold,
                    color: 'white',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {id + 7}. {item}
                </Text>
              </View>
            ))}
          </View>
          <View
            style={{
              marginVertical: windowHeight * 0.01,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {seedPhraseList.slice(9, 12).map((item, id) => (
              <View
                style={{
                  backgroundColor: themeHere.colors.red_light,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 120,
                  marginHorizontal: 5,
                }}>
                <Text
                  style={{
                    ...themeHere.text.subhead_bold,
                    color: 'white',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {id + 10}. {item}
                </Text>
              </View>
            ))}
          </View>
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
        <View
          style={{
            marginVertical: windowHeight * 0.1,
          }}>
          <Bounceable
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
          </Bounceable>
        </View>
      </LinearGradient>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SaveSeedPhraseScreen);

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
    marginTop: windowHeight * 0.1,
  },
});
