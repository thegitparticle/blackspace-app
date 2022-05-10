import React from 'react';
import {Appearance, Dimensions} from 'react-native';
import {Text, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import SpacerVertical from '../../../bits/SpacerVertical';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function OkayBearsHome() {
  return (
    <View sx={{alignItems: 'center', justifyContent: 'center'}}>
      <SpacerVertical height={40} />
      <Text style={{color: 'orange'}}>only real mints, no rugs</Text>
    </View>
  );
}

export default OkayBearsHome;
