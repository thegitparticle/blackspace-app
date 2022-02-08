import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  TextInput,
  Pressable,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {SquircleView} from 'react-native-figma-squircle';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import useShibaInuPrice from '../../helpers/useShibaInuPrice';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import useDogeCoinPrice from '../../helpers/useDogeCoinPrice';

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
  const navigation = useNavigation();

  const tokens_list = [
    {
      token_name: 'Shiba Inu',
      token_icon: 'https://i.postimg.cc/VkRVsPWV/download-42.jpg',
      token_symbol: 'SHIB',
      current_price: '$0.00003202',
      _24h_change: '15.04%',
      _7d_change: '20.77%',
      market_cap: '17575124678',
      token_gecko_id: 'shiba-inu',
    },
  ];

  function DogeCoinCard() {
    const {loadingGetDogeCoin, priceDogeCoin} = useDogeCoinPrice();

    if (loadingGetDogeCoin) {
      return (
        <Pressable>
          <SquircleView
            style={{
              ...styles.squircle_view_wrap,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}>
            <Bars size={10} color="#FDAAFF" />
          </SquircleView>
        </Pressable>
      );
    } else {
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('TrendingTokensProductDetailsModal', {
              name: 'Doge Coin',
              symbol: 'DOGE',
              logoUri:
                'https://assets.coingecko.com/coins/images/5/thumb_2x/dogecoin.png',
              token: priceDogeCoin,
              tokenIdString: 'dogecoin',
            })
          }>
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
                  uri: 'https://assets.coingecko.com/coins/images/5/thumb_2x/dogecoin.png',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.coin_logo_image}
              />
              <View style={styles.name_ticker_view}>
                <Text style={styles.name_text}>Doge Coin</Text>
                <Text style={styles.ticker_text}>DOGE</Text>
              </View>
            </View>
            <View style={styles.price_change_view}>
              <Text style={styles.price_text}>{priceDogeCoin.usd}</Text>
              <Text
                style={{
                  ...styles.change_percent_text,
                  color:
                    priceDogeCoin.usd_24h_change < 0
                      ? themeHere.colors.danger_red
                      : themeHere.colors.success_green,
                }}>
                {String(priceDogeCoin.usd_24h_change).substring(0, 5)} %
              </Text>
            </View>
          </SquircleView>
        </Pressable>
      );
    }
  }

  function ShibaInuCard() {
    const {loadingGetShibaInu, priceShibaInu} = useShibaInuPrice();

    console.log(priceShibaInu);

    if (loadingGetShibaInu) {
      return (
        <Pressable>
          <SquircleView
            style={{
              ...styles.squircle_view_wrap,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}>
            <Bars size={10} color="#FDAAFF" />
          </SquircleView>
        </Pressable>
      );
    } else {
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('TrendingTokensProductDetailsModal', {
              name: 'Shiba Inu',
              symbol: 'SHIB',
              logoUri: 'https://i.postimg.cc/VkRVsPWV/download-42.jpg',
              token: priceShibaInu,
              tokenIdString: 'shiba-inu',
            })
          }>
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
                  uri: 'https://i.postimg.cc/VkRVsPWV/download-42.jpg',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.coin_logo_image}
              />
              <View style={styles.name_ticker_view}>
                <Text style={styles.name_text}>Shiba Inu</Text>
                <Text style={styles.ticker_text}>SHIB</Text>
              </View>
            </View>
            <View style={styles.price_change_view}>
              <Text style={styles.price_text}>{priceShibaInu.usd}</Text>
              <Text
                style={{
                  ...styles.change_percent_text,
                  color:
                    priceShibaInu.usd_24h_change < 0
                      ? themeHere.colors.danger_red
                      : themeHere.colors.success_green,
                }}>
                {String(priceShibaInu.usd_24h_change).substring(0, 5)} %
              </Text>
            </View>
          </SquircleView>
        </Pressable>
      );
    }
  }

  function TokenCard(token) {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('TrendingTokensProductDetailsModal', {
            token: token,
          })
        }>
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
      </Pressable>
    );
  }

  return (
    <View style={styles.parent_view}>
      <DogeCoinCard />
      <ShibaInuCard />
      {/*{tokens_list.map(item => TokenCard(item))}*/}
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
    marginVertical: 20,
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
