import React from 'react';
import {
  Appearance,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import BrandStoryTextsAnimation from '../components/BrandStoryTextsAnimation';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function BrandLandingScreen() {
  const navigation = useNavigation();

  return (
    <View variant="layout.full_screen">
      <ImageBackground
        source={require('../../../../assets/space_bg_1.jpeg')}
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {/*<Image*/}
        {/*  sx={{width: windowWidth * 0.6, height: windowWidth * 0.3}}*/}
        {/*  source={require('../../../../assets/blackSpace_logo_full.png')}*/}
        {/*  resizeMode="contain"*/}
        {/*/>*/}
        <View />
        <BrandStoryTextsAnimation />
        <TouchableOpacity
          onLongPress={() => navigation.navigate('SecretScreen')}
          style={{
            width: windowWidth * 0.8,
            height: 75,
            borderRadius: 37.5,
            backgroundColor: themeHere.colors.orange_light + '00',
            marginBottom: 40,
          }}></TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default BrandLandingScreen;
