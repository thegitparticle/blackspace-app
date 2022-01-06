import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import window from '@react-navigation/native/src/__mocks__/window';
import {SquircleView} from 'react-native-figma-squircle/src/index';
import FastImage from 'react-native-fast-image';

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
        <View style={styles.left_side_view}>
          <FastImage
            source={{
              uri: props.coinDetails.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.coin_logo_image}
          />
          <View style={styles.name_ticker_view}>
            <Text style={styles.name_text}>{props.coinDetails.name}</Text>
            <Text style={styles.ticker_text}>
              {props.coinDetails.symbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.price_change_view}>
          <Text style={styles.price_text}>
            ${props.coinDetails.current_price}
          </Text>
          <Text
            style={{
              ...styles.change_percent_text,
              color:
                props.coinDetails.price_change_percentage_24h < 0
                  ? themeHere.colors.danger_red
                  : themeHere.colors.success_green,
            }}>
            {props.coinDetails.price_change_percentage_24h.toFixed(2)} %
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
  left_side_view: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coin_logo_image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  name_ticker_view: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 50,
    marginHorizontal: 20,
  },
  name_text: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
  },
  ticker_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
  },
  price_change_view: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 50,
    marginHorizontal: 20,
  },
  price_text: {
    ...themeHere.text.subhead_medium,
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
