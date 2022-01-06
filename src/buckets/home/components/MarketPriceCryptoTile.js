import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import window from '@react-navigation/native/src/__mocks__/window';
import {SquircleView} from 'react-native-figma-squircle/src/index';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MarketPriceCryptoTile(props) {
  return (
    <View style={styles.parent_view}>
      <SquircleView
        style={styles.squircle_view_wrap}
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 15,
          fillColor: themeHere.colors.mid_ground + '25',
        }}>
        <Text style={{color: 'white'}}>₹</Text>
      </SquircleView>
    </View>
  );
}

export default MarketPriceCryptoTile;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: windowWidth - 40,
    height: 50,
  },
  squircle_view_wrap: {
    width: windowWidth - 40,
    height: 50,
  },
});
