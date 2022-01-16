import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../theme/ButterTheme';
import FastImage from 'react-native-fast-image';
import {FamousTokensList} from '../dapps/uniswap/helpers/FamousTokensList';
import {SquircleView} from 'react-native-figma-squircle';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function TokenWithIconBadge(props) {
  // symbol, icon - image link
  return (
    <SquircleView
      style={styles.token_item_view}
      squircleParams={{
        cornerSmoothing: 1,
        cornerRadius: 15,
        fillColor: themeHere.colors.mid_ground + '25',
      }}>
      <FastImage
        source={{
          uri: props.icon,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.token_item_logo}
      />
      <Text style={styles.token_item_symbol}>{props.symbol}</Text>
    </SquircleView>
  );
}

export default TokenWithIconBadge;

const styles = StyleSheet.create({
  token_item_view: {
    width: (windowWidth - 80) / 3,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  token_item_logo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  token_item_symbol: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.foreground,
    textAlign: 'center',
    marginHorizontal: 10,
  },
});
