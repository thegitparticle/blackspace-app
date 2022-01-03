import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function LeverageEthProduct() {
  return (
    <View style={styles.parent_view}>
      <Text style={{color: 'white'}}>Leverage eth</Text>
    </View>
  );
}

export default LeverageEthProduct;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
  },
});
