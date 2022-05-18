import React from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function DefiPage() {
  return (
    <View style={styles.parent_view}>
      <Text>Defi page</Text>
    </View>
  );
}

export default DefiPage;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
