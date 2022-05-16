import React from 'react';
import {StyleSheet, Dimensions, Appearance} from 'react-native';
import {View, Text} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function ShowSendPage() {
  // props - ChangeBodyBack
  return (
    <View sx={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text sx={{color: 'white'}}>Send tokens from here</Text>
    </View>
  );
}

export default ShowSendPage;
