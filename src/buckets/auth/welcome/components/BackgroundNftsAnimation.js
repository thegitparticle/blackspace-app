import React, {useEffect, useState} from 'react';
import {
  Animated,
  Appearance,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {MotiImage, MotiView} from 'moti';

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
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });

  function StartPoint1() {
    return (
      <View style={styles.start_point_1}>
        <MotiView
          from={{
            opacity: 1,
            transform: [{translateY: -100}, {translateX: 0}],
          }}
          animate={{
            opacity: 0.25,
            transform: [{translateY: 400}, {translateX: 300}],
          }}
          transition={{
            type: 'timing',
            duration: 20000,
            repeat: -1,
            repeatReverse: false,
          }}>
          <MotiImage
            source={require('../../../../../assets/welcome_nfts/nft_tp_3.png')}
            from={{width: 50, height: 50}}
            animate={{width: 150, height: 150}}
            transition={{
              type: 'timing',
              duration: 10000,
              repeat: -1,
              repeatReverse: false,
            }}
          />
        </MotiView>
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <Image
            source={require('../../../../../assets/welcome_nfts/nft_tp_4.png')}
            style={styles.nft_image}
          />
        </Animated.View>
      </View>
    );
  }

  function StartPoint2() {
    return (
      <View style={styles.start_point_2}>
        <MotiView
          from={{
            opacity: 1,
            transform: [{translateY: -100}, {translateX: 0}],
          }}
          animate={{
            opacity: 0.25,
            transform: [{translateY: 400}, {translateX: -300}],
          }}
          transition={{
            type: 'timing',
            duration: 20000,
            repeat: -1,
            repeatReverse: false,
          }}>
          <Image
            source={require('../../../../../assets/welcome_nfts/nft_tp_1.png')}
            style={styles.nft_image}
          />
        </MotiView>
        <Image
          source={require('../../../../../assets/welcome_nfts/nft_tp_2.png')}
          style={{...styles.nft_image, transform: [{rotate: '135deg'}]}}
        />
      </View>
    );
  }

  function StartPoint3() {
    return (
      <View style={styles.start_point_3}>
        <MotiView
          from={{
            opacity: 1,
            transform: [{translateY: -100}, {translateX: 0}],
          }}
          animate={{
            opacity: 0.25,
            transform: [{translateY: -400}, {translateX: 300}],
          }}
          transition={{
            type: 'timing',
            duration: 9000,
            repeat: -1,
          }}>
          <Image
            source={require('../../../../../assets/welcome_nfts/nft_tp_7.png')}
            style={styles.nft_image}
          />
        </MotiView>
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <Image
            source={require('../../../../../assets/welcome_nfts/nft_tp_8.png')}
            style={styles.nft_image}
          />
        </Animated.View>
      </View>
    );
  }

  function StartPoint4() {
    return (
      <View style={styles.start_point_4}>
        <MotiView
          from={{
            opacity: 1,
            transform: [{translateY: -100}, {translateX: 0}],
          }}
          animate={{
            opacity: 0.25,
            transform: [{translateY: -500}, {translateX: -300}],
          }}
          transition={{
            type: 'timing',
            duration: 15000,
            repeat: -1,
          }}>
          <Image
            source={require('../../../../../assets/welcome_nfts/nft_tp_5.png')}
            style={styles.nft_image}
          />
        </MotiView>
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <Image
            source={require('../../../../../assets/welcome_nfts/nft_tp_6.png')}
            style={{...styles.nft_image, transform: [{rotate: '135deg'}]}}
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <View style={styles.row_block_1}>
        <StartPoint1 />
        <StartPoint2 />
      </View>
      <View style={styles.row_block_1}>
        <StartPoint3 />
        <StartPoint4 />
      </View>
    </View>
  );
}

export default BackgroundNftsAnimation;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'flex-start',
    width: windowWidth,
    height: windowHeight * 0.5,
    justifyContent: 'flex-start',
    marginTop: windowHeight * 0.1,
  },
  row_block_1: {
    flexDirection: 'row',
  },
  start_point_1: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.25,
    // backgroundColor: 'pink',
    zIndex: 10,
  },
  start_point_2: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.25,
    // backgroundColor: 'red',
    alignItems: 'space-between',
    justifyContent: 'space-between',
  },
  row_block_2: {
    flexDirection: 'row',
  },
  start_point_3: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.25,
    // backgroundColor: 'green',
  },
  start_point_4: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.25,
    // backgroundColor: 'brown',
    flexDirection: 'row-reverse',
    alignItems: 'space-between',
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
