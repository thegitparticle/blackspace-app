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

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme == 'dark' ? ButterThemeDark : ButterThemeLight;

function IntroTextsAnimation() {
  const offset = useSharedValue(0);

  const animatedStylesText1 = useAnimatedStyle(() => {
    return {
      transform: [{translateY: -offset.value}],
    };
  });

  const animatedStylesText2 = useAnimatedStyle(() => {
    return {
      transform: [{translateY: -offset.value}],
      opacity: 0,
    };
  });

  const animatedStylesText3 = useAnimatedStyle(() => {
    return {
      transform: [{translateY: -offset.value}],
      opacity: 0,
    };
  });

  useEffect(() => {
    AnimationRunner();
  });

  function AnimationRunner() {
    setTimeout(() => {
      offset.value = withSpring(windowHeight * 0.075);
    }, 2500);
  }

  return (
    <View style={styles.parent_view}>
      <Animated.View style={[animatedStylesText1]}>
        <Text style={{...themeHere.text.title_3, color: 'white'}}>
          A NEW WORLD IS EMERGING!
        </Text>
      </Animated.View>
      <Animated.View style={[animatedStylesText2]}>
        <Text style={{...themeHere.text.title_3, color: 'white'}}>
          A NEW WORLD IS EMERGING!
        </Text>
      </Animated.View>
      <Animated.View style={[animatedStylesText3]}>
        <Text style={{...themeHere.text.title_3, color: 'white'}}>
          A NEW WORLD IS EMERGING!
        </Text>
      </Animated.View>
      {/*<Button*/}
      {/*  onPress={() => {*/}
      {/*    offset.value = withSpring(windowHeight * 0.075);*/}
      {/*  }}*/}
      {/*  title="Move"*/}
      {/*/>*/}
    </View>
  );
}

export default IntroTextsAnimation;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
