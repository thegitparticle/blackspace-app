import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Appearance,
} from 'react-native';
import {LOGIN, LOGOUT} from '../../../redux/types';
import {connect} from 'react-redux';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import SquircleButton from '../../../bits/SquircleButton';
import window from '@react-navigation/native/src/__mocks__/window';
import IntroTextsAnimation from '../components/IntroTextsAnimation';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import BackgroundNftsAnimation from '../components/BackgroundNftsAnimation';
import BottomSpacer from '../../../bits/BottomSpacer';
import {Bounceable} from 'rn-bounceable';
import {Amplitude} from '@amplitude/react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function Welcome1Screen({dispatch, navigation}) {
  const ampInstance = Amplitude.getInstance();
  ampInstance.init('3f8238f4e3a8c083393f5a5c86631f75');

  const buttonOpacity = useSharedValue(0);

  const animatedButton = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    };
  });

  useEffect(() => {
    setTimeout(() => {
      buttonOpacity.value = withTiming(1);
    }, 7500);
  });

  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/space_bg_1.jpeg')}
        style={styles.background_image}>
        <View style={styles.bottom_block}>
          <View>
            <BackgroundNftsAnimation />
          </View>
          <View>
            <IntroTextsAnimation />
            <Animated.View style={[animatedButton]}>
              <View
                style={{
                  marginVertical: windowHeight * 0.1,
                  alignSelf: 'center',
                }}>
                <Bounceable
                  onPress={() => {
                    navigation.navigate('WalletSetupOptionsScreen');
                    ampInstance.logEvent('BUTTON_CLICKED');
                  }}>
                  <SquircleButton
                    buttonColor={themeHere.colors.light}
                    width={windowWidth * 0.7}
                    height={50}
                    buttonText={'LFG! 🚀'}
                    font={themeHere.text.title_3}
                    textColor={themeHere.colors.red}
                  />
                </Bounceable>
              </View>
            </Animated.View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLogInClick: () => {
      dispatch({type: LOGIN});
    },
  };
};

export default connect(mapDispatchToProps)(Welcome1Screen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
  },
  background_image: {
    flex: 1,
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  bottom_block: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
