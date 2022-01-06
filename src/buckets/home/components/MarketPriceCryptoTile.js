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
        <View style={styles.name_ticker_view}>
          <Text style={styles.name_text}>{props.coinDetails.coin_name}</Text>
          <Text style={styles.ticker_text}>COIN</Text>
        </View>
        <View style={styles.price_change_view}>
          <Text style={styles.price_text}>
            {props.coinDetails.coin_details.usd}
          </Text>
          <Text
            style={{
              ...styles.change_percent_text,
              color:
                props.coinDetails.coin_details.usd_24h_change < 0
                  ? themeHere.colors.danger_red
                  : themeHere.colors.success_green,
            }}>
            {props.coinDetails.coin_details.usd_24h_change.toFixed(2)} %
          </Text>
        </View>
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
    height: 75,
    marginVertical: 10,
    alignSelf: 'center',
  },
  squircle_view_wrap: {
    width: windowWidth - 40,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name_ticker_view: {
    flexDirection: 'column',
    marginHorizontal: 20,
    justifyContent: 'space-around',
    height: 50,
  },
  name_text: {
    ...themeHere.text.header,
    color: themeHere.colors.foreground,
  },
  ticker_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
  },
  price_change_view: {
    flexDirection: 'column',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    height: 50,
  },
  price_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    textAlign: 'right',
  },
  change_percent_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
    textAlign: 'right',
  },
});

// <Text style={{color: 'white'}}>₹</Text> - Rupee symbol as text
