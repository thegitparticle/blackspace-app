import {Amplitude} from '@amplitude/react-native';
import {BlurView} from '@react-native-community/blur';
import {Image} from 'dripsy';
import React, {useEffect} from 'react';
import {
  Appearance,
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {Text, View} from 'dripsy';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import SquircleGlassButton from '../../../../bits/SquircleGlassButton';
import {LOGIN} from '../../../../redux/types';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {dripsytheme} from '../../../../theme/DripsyTheme';
import IntroTextsAnimation from '../components/IntroTextsAnimation';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;
const statusBarHeight = getStatusBarHeight();

function Welcome1Screen({dispatch, navigation}) {
  const buttonOpacity = useSharedValue(0);
  const logoOnSkipOpacity = useSharedValue(0);
  const introTextsOpacity = useSharedValue(1);
  const skipOpacity = useSharedValue(1);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const animatedButton = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    };
  });

  const animatedLogoOnSkip = useAnimatedStyle(() => {
    return {
      opacity: logoOnSkipOpacity.value,
    };
  });

  const animatedIntroTexts = useAnimatedStyle(() => {
    return {
      opacity: introTextsOpacity.value,
    };
  });

  const animatedSkipButton = useAnimatedStyle(() => {
    return {
      opacity: skipOpacity.value,
      width: windowWidth,
      justifyContent: 'flex-end',
      flexDirection: 'row',
      marginVertical: statusBarHeight + 20,
    };
  });

  useEffect(() => {
    setTimeout(() => {
      ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
      buttonOpacity.value = withTiming(1);
      skipOpacity.value = withSpring(0);
    }, 22500);
  });

  const skipStory = () => {
    buttonOpacity.value = withTiming(1);
    logoOnSkipOpacity.value = withTiming(1);
    introTextsOpacity.value = withSpring(0);
    skipOpacity.value = withSpring(0);
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
  };

  function SkipButton() {
    return (
      <Animated.View style={[animatedSkipButton]}>
        <Bounceable onPress={() => skipStory()}>
          <BlurView
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
            style={{
              width: 60,
              height: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 20,
            }}>
            <Text
              variant={'caption_thick'}
              sx={{
                color: 'white',
                alignSelf: 'center',
              }}>
              Skip
            </Text>
          </BlurView>
        </Bounceable>
      </Animated.View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../../../../assets/space_bg_1.jpeg')}
        style={styles.background_image}>
        <View style={styles.bottom_block}>
          <View>{/*<BackgroundNftsAnimation />*/}</View>
          <View>
            <Animated.View style={[animatedIntroTexts]}>
              <IntroTextsAnimation />
            </Animated.View>
            <Animated.View style={[animatedLogoOnSkip]}>
              <Image
                source={require('../../../../../assets/blackSpace_logo_full.png')}
                sx={{
                  width: windowWidth * 0.55,
                  height: windowWidth * 0.081,
                  alignSelf: 'center',
                }}
              />
            </Animated.View>
            <Animated.View style={[animatedButton]}>
              <View
                sx={{
                  marginVertical: windowHeight * 0.1,
                  alignSelf: 'center',
                }}>
                <Bounceable
                  onPress={() => {
                    navigation.navigate('WalletSetupOptionsScreen');
                    Amplitude.getInstance().logEvent(
                      'LFG_WELCOME_BUTTON_CLICKED',
                    );
                  }}>
                  <SquircleGlassButton
                    buttonColor={dripsytheme.colors.layout_4}
                    width={windowWidth * 0.7}
                    height={50}
                    buttonText={'Lets go 🚀'}
                    font={dripsytheme.text.body_thick}
                    textColor={dripsytheme.colors.brand_orange}
                  />
                </Bounceable>
              </View>
            </Animated.View>
          </View>
        </View>
        <SkipButton />
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
