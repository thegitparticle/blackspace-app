import React from 'react';
import {Appearance, Dimensions} from 'react-native';
import {Text, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Spacer from '../../../bits/Spacer';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function OkayBearsHoldings() {
  return (
    <View sx={{alignItems: 'center', justifyContent: 'center'}}>
      <Spacer height={40} />
      <Text style={{color: 'orange'}}>Here, we see holdings of kay bears</Text>
    </View>
  );
}

export default OkayBearsHoldings;
