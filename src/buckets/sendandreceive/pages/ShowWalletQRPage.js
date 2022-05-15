import React from 'react';
import {StyleSheet, Dimensions, Appearance} from 'react-native';
import {View, Text} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function ShowWalletQRPage() {
  // props - ChangeBodyBack
  return (
    <View sx={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text sx={{color: 'white'}}>Show Barcode of your ETH Wallet</Text>
    </View>
  );
}

export default ShowWalletQRPage;
