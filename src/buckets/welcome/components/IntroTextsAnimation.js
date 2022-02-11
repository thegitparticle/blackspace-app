import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  Button,
} from 'react-native';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function IntroTextsAnimation() {
  const offsetText1 = useSharedValue(0);
  const offsetText2 = useSharedValue(0);
  const offsetText3 = useSharedValue(0);
  const text1Opacity = useSharedValue(1);
  const text2Opacity = useSharedValue(0);
  const text3Opacity = useSharedValue(0);

  const animatedStylesText1 = useAnimatedStyle(() => {
    return {
      transform: [{translateY: -offsetText1.value}],
      opacity: text1Opacity.value,
    };
  });

  const animatedStylesText2 = useAnimatedStyle(() => {
    return {
      transform: [{translateY: -offsetText2.value}],
      opacity: text2Opacity.value,
    };
  });

  const animatedStylesText3 = useAnimatedStyle(() => {
    return {
      transform: [{translateY: -offsetText3.value}],
      opacity: text3Opacity.value,
    };
  });

  useEffect(() => {
    AnimationRunner();
  }, []);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  function AnimationRunner() {
    setTimeout(() => {
      offsetText1.value = withSpring(windowHeight * 0.075);
      text1Opacity.value = 0.5;
      text2Opacity.value = withTiming(1);
      ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    }, 2500);
    setTimeout(() => {
      offsetText1.value = withSpring(windowHeight * 0.15);
      offsetText2.value = withSpring(windowHeight * 0.075);
      text1Opacity.value = 0.1;
      text2Opacity.value = withTiming(0.5);
      text3Opacity.value = withTiming(1);
      ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    }, 5000);
    setTimeout(() => {
      text1Opacity.value = 0;
      text2Opacity.value = withTiming(0);
      ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    }, 7500);
  }

  return (
    <View style={styles.parent_view}>
      <Animated.View style={[animatedStylesText1]}>
        <Text style={styles.intro_texts_style}>A NEW WORLD IS EMERGING!</Text>
      </Animated.View>
      <Animated.View style={[animatedStylesText2]}>
        <Text style={styles.intro_texts_style}>
          ON TOP OF YOUR FAV INTERNET
        </Text>
      </Animated.View>
      <Animated.View style={[animatedStylesText3]}>
        <Text style={styles.intro_texts_style}>WELCOME TO CRYPTO INTERNET</Text>
      </Animated.View>
    </View>
  );
}

export default IntroTextsAnimation;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro_texts_style: {
    ...themeHere.text.title_3,
    color: 'white',
  },
});
