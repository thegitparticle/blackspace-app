import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  TextInput,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {SquircleView} from 'react-native-figma-squircle';
import FastImage from 'react-native-fast-image';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
blocks
1. top stars - list of coins with cards
2. hot coins - list of cards

each card
a. icon
b. name
c. current price
d. 24h change
e. 7d change
f. market cap

 */

function TrendingTokensProduct() {
  const [amount, setAmount] = useState('');

  const tokens_list = [
    {
      token_name: 'Shiba Inu',
      token_icon: 'https://i.postimg.cc/VkRVsPWV/download-42.jpg',
      token_symbol: 'SHIB',
      current_price: '$0.00003202',
      _24h_change: '15.04%',
      _7d_change: '20.77%',
      market_cap: '17575124678',
    },
  ];

  function TokenCard(token) {
    return (
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
              uri: token.token_icon,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.coin_logo_image}
          />
          <View style={styles.name_ticker_view}>
            <Text style={styles.name_text}>{token.token_name}</Text>
            <Text style={styles.ticker_text}>
              {token.token_symbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.price_change_view}>
          <Text style={styles.price_text}>{token.current_price}</Text>
          <Text
            style={{
              ...styles.change_percent_text,
              color:
                token._24h_change < 0
                  ? themeHere.colors.danger_red
                  : themeHere.colors.success_green,
            }}>
            {token._24h_change.substring(0, 5)} %
          </Text>
        </View>
      </SquircleView>
    );
  }

  return (
    <View style={styles.parent_view}>
      {tokens_list.map(item => TokenCard(item))}
    </View>
  );
}

export default TrendingTokensProduct;

const styles = StyleSheet.create({
  parent_view: {},
  token_card_view: {
    width: windowWidth - 40,
  },
  token_title: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
    marginVertical: 30,
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
