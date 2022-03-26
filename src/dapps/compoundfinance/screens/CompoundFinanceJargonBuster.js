import React from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function CompoundFinanceJargonBuster() {
  return (
    <View style={styles.parent_view}>
      <Text style={{color: 'orange'}}>jargons will be slayed</Text>
    </View>
  );
}

export default CompoundFinanceJargonBuster;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
