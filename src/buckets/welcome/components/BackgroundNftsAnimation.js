import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  Button,
  Image,
  Easing,
  Animated,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {MotiView} from 'moti';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function BackgroundNftsAnimation() {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });

  return (
    <View style={styles.parent_view}>
      <MotiView
        from={{opacity: 1, transform: [{translateY: -100}, {translateX: 0}]}}
        animate={{
          opacity: 0.25,
          transform: [{translateY: 400}, {translateX: -300}],
        }}
        transition={{
          type: 'timing',
          duration: 3500,
          repeat: -1,
        }}>
        <Image
          source={require('../../../../assets/welcome_nfts/nft_tp_1.png')}
          style={styles.nft_image}
        />
      </MotiView>
      <Animated.View style={{transform: [{rotate: spin}]}}>
        <Image
          source={require('../../../../assets/welcome_nfts/nft_tp_2.png')}
          style={styles.nft_image}
        />
      </Animated.View>
    </View>
  );
}

export default BackgroundNftsAnimation;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'flex-end',
    width: windowWidth,
    height: windowHeight * 0.5,
    backgroundColor: 'pink',
    justifyContent: 'center',
    marginTop: windowHeight * 0.1,
  },
  intro_texts_style: {
    ...themeHere.text.title_3,
    color: 'white',
  },
  nft_image: {
    width: 50,
    height: 50,
  },
});
