import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../Desktop/soupapp/src/theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function IDAppTestLanding() {
  return (
    <View style={styles.parent_view}>
      <Text>...</Text>
    </View>
  );
}

export default IDAppTestLanding;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
