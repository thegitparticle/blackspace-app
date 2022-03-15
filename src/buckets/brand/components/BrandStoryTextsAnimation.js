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

function BrandStoryTextsAnimation() {
  useEffect(() => {
    HapticsRunner();
  }, []);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  function HapticsRunner() {
    setTimeout(() => {
      ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    }, 5000);
    setTimeout(() => {
      ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    }, 9000);
    setTimeout(() => {
      ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    }, 12500);
  }

  return (
    <View style={styles.parent_view}>
      <MotiView
        from={{
          translateY: 0,
          scale: 1,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          translateY: [
            {value: 0, delay: 0, type: 'timing', duration: 100},
            {value: -500, delay: 500, type: 'timing', duration: 18000},
          ],
          opacity: [
            {value: 1, delay: 0, type: 'timing', duration: 0},
            {value: 0, delay: 1000, type: 'timing', duration: 18000},
          ],
        }}
        transition={{
          repeat: 0,
          repeatReverse: false,
        }}>
        <Text style={styles.intro_texts_style}>IN THE YEAR, 2022</Text>
      </MotiView>
      <MotiView
        from={{
          translateY: 0,
          scale: 1,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          translateY: [
            {value: 0, delay: 100, type: 'timing', duration: 100},
            {value: -500, delay: 5000, type: 'timing', duration: 16000},
          ],
          opacity: [
            {value: 1, delay: 5000, type: 'timing', duration: 0},
            {value: 0, delay: 1500, type: 'timing', duration: 16000},
          ],
        }}
        transition={{
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
          opacity: 0,
        }}
        animate={{
          scale: 1,
          translateY: [
            {value: 0, delay: 100, type: 'timing', duration: 100},
            {value: -500, delay: 9000, type: 'timing', duration: 14000},
          ],
          opacity: [
            {value: 1, delay: 9000, type: 'timing', duration: 0},
            {value: 0, delay: 1500, type: 'timing', duration: 14000},
          ],
        }}
        transition={{
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
          opacity: 0,
        }}
        animate={{
          scale: 1,
          translateY: [
            {value: 0, delay: 100, type: 'timing', duration: 100},
            {value: -500, delay: 12500, type: 'timing', duration: 12000},
          ],
          opacity: [
            {value: 1, delay: 12500, type: 'timing', duration: 0},
            {value: 0, delay: 1500, type: 'timing', duration: 12000},
          ],
        }}
        transition={{
          repeat: 0,
          repeatReverse: false,
        }}>
        <Text style={styles.intro_texts_style}>
          TODAY, ITS MORE EASIER THAN BEFORE WITH
        </Text>
      </MotiView>
      <MotiView
        from={{
          translateY: 0,
          scale: 1,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          translateY: [
            {value: 0, delay: 100, type: 'timing', duration: 100},
            {value: -100, delay: 15000, type: 'timing', duration: 12000},
          ],
          opacity: [
            {value: 0, delay: 50, type: 'timing', duration: 0},
            {value: 0.1, delay: 15000, type: 'timing', duration: 0},
            {value: 1, delay: 100, type: 'timing', duration: 500},
          ],
        }}
        transition={{
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

export default BrandStoryTextsAnimation;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro_texts_style: {
    ...themeHere.text.title_3,
    color: 'white',
    maxWidth: windowWidth * 0.75,
    textAlign: 'center',
  },
});
