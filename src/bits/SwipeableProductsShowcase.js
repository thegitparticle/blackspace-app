import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*

what does it component have?
1. title of the product (1 tab)
2. indicator of how many and which one is currently viewed
3. content render for each of them

variables to pass
1. list of items
  a. title
  b. id
  c. component to render - name

 */

function SwipeableProductsShowcase(products_list) {
  return (
    <View style={styles.parent_view}>
      <Text>swipe</Text>
    </View>
  );
}

export default SwipeableProductsShowcase;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
