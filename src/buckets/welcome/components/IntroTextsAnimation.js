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
import {MotiView} from 'moti';
import {Image} from 'dripsy';

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
    // AnimationRunner();
  }, []);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  function AnimationRunner() {
    setTimeout(() => {
      offsetText1.value = withTiming(windowHeight, 3000);
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
      <MotiView
        from={{
          translateY: 0,
          scale: 1,
          opacity: 1,
        }}
        animate={{
          scale: 1,
          translateY: -300,
          opacity: 0.05,
        }}
        transition={{
          type: 'timing',
          duration: 18000,
          repeat: 0,
          repeatReverse: false,
        }}>
        <Text style={styles.intro_texts_style}>IN THE YEAR, 2022</Text>
      </MotiView>
      <MotiView
        from={{
          translateY: 0,
          scale: 1,
          opacity: 1,
        }}
        animate={{
          scale: 1,
          translateY: -300,
          opacity: 0.05,
        }}
        transition={{
          type: 'timing',
          duration: 18000,
          delay: 5000,
          repeat: 0,
          repeatReverse: false,
        }}>
        <Text style={styles.intro_texts_style}>
          HODLing CRYPTO IS ANTIQUATED
        </Text>
      </MotiView>
      <MotiView
        from={{
          translateY: 0,
          scale: 1,
          opacity: 1,
        }}
        animate={{
          scale: 1,
          translateY: -300,
          opacity: 0.05,
        }}
        transition={{
          type: 'timing',
          duration: 18000,
          delay: 10000,
          repeat: 0,
          repeatReverse: false,
        }}>
        <Text style={styles.intro_texts_style}>
          USEing CRYPTO IS THE NEW COOL
        </Text>
      </MotiView>
      <MotiView
        from={{
          translateY: 0,
          scale: 1,
          opacity: 1,
        }}
        animate={{
          scale: 1,
          translateY: -300,
          opacity: 0.05,
        }}
        transition={{
          type: 'timing',
          duration: 18000,
          delay: 15000,
          repeat: 0,
          repeatReverse: false,
        }}>
        <Text style={styles.intro_texts_style}>
          TODAY, ITS MORE EASIER THAN BEFORE
        </Text>
      </MotiView>
      <MotiView
        from={{
          translateY: 0,
          scale: 1,
          opacity: 1,
        }}
        animate={{
          scale: 1,
          translateY: -300,
          opacity: 0.05,
        }}
        transition={{
          type: 'timing',
          duration: 18000,
          delay: 20000,
          repeat: 0,
          repeatReverse: false,
        }}>
        <Image
          source={require('../../../../assets/blackSpace_logo_full.png')}
          sx={{
            width: windowWidth * 0.55,
            height: windowWidth * 0.081,
            alignSelf: 'center',
          }}
        />
      </MotiView>
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
