import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Appearance,
  ImageBackground,
} from 'react-native';
import {Text, View, Image} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import BrandStoryTextsAnimation from '../components/BrandStoryTextsAnimation';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function BrandLandingScreen() {
  return (
    <View variant="layout.full_screen">
      <ImageBackground
        source={require('../../../../assets/space_bg_1.jpeg')}
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/*<Image*/}
        {/*  sx={{width: windowWidth * 0.6, height: windowWidth * 0.3}}*/}
        {/*  source={require('../../../../assets/blackSpace_logo_full.png')}*/}
        {/*  resizeMode="contain"*/}
        {/*/>*/}
        <BrandStoryTextsAnimation />
      </ImageBackground>
    </View>
  );
}

export default BrandLandingScreen;
