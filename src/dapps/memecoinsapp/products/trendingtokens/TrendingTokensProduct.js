import React, {useEffect} from 'react';
import {
  Appearance,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {SquircleView} from 'react-native-figma-squircle';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import useShibaInuPrice from '../../helpers/useShibaInuPrice';
import {Bars} from 'react-native-loader';
import useDogeCoinPrice from '../../helpers/useDogeCoinPrice';
import {Bounceable} from 'rn-bounceable';
import {GetMemeCoinsList} from '../../../../redux/dapps/memecoins/MemeCoinsListActions';
import {connect} from 'react-redux';
import useCoinGeckoDetails from '../../helpers/useCoinGeckoDetails';

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

let state_here = {};

function TrendingTokensProduct({dispatch}) {
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(GetMemeCoinsList());
  }, []);

  function DogeCoinCard() {
    const {loadingGetDogeCoin, priceDogeCoin} = useDogeCoinPrice();

    if (loadingGetDogeCoin) {
      return (
        <Bounceable>
          <SquircleView
            style={{
              ...styles.squircle_view_wrap,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '50',
            }}>
            <Bars size={10} color="#FDAAFF" />
          </SquircleView>
        </Bounceable>
      );
    } else {
      return (
        <Bounceable
          onPress={() =>
            navigation.navigate('TrendingTokensProductDetailsModal', {
              name: 'Doge Coin',
              symbol: 'DOGE',
              logoUri:
                'https://assets.coingecko.com/coins/images/5/thumb_2x/dogecoin.png',
              tokenDetails: priceDogeCoin,
              tokenIdString: 'dogecoin',
              contractAddress: '',
            })
          }>
          <SquircleView
            style={styles.squircle_view_wrap}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '50',
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
        </Bounceable>
      );
    }
  }

  function ShibaInuCard() {
    const {loadingGetShibaInu, priceShibaInu} = useShibaInuPrice();

    if (loadingGetShibaInu) {
      return (
        <Bounceable>
          <SquircleView
            style={{
              ...styles.squircle_view_wrap,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '50',
            }}>
            <Bars size={10} color="#FDAAFF" />
          </SquircleView>
        </Bounceable>
      );
    } else {
      return (
        <Bounceable
          onPress={() =>
            navigation.navigate('TrendingTokensProductDetailsModal', {
              name: 'Shiba Inu',
              symbol: 'SHIB',
              logoUri: 'https://i.postimg.cc/VkRVsPWV/download-42.jpg',
              tokenDetails: priceShibaInu,
              tokenIdString: 'shiba-inu',
              contractAddress: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce', // erc-20 address
            })
          }>
          <SquircleView
            style={styles.squircle_view_wrap}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '50',
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
        </Bounceable>
      );
    }
  }

  function TokenCard(token) {
    const {loadingCoinGeckoDetails, priceCoin} = useCoinGeckoDetails(
      token.coingecko_id,
    );

    useEffect(() => {
      console.log(priceCoin);
    }, [priceCoin]);

    if (loadingCoinGeckoDetails) {
      return (
        <Bounceable>
          <SquircleView
            style={{
              ...styles.squircle_view_wrap,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '50',
            }}>
            <Bars size={10} color="#FDAAFF" />
          </SquircleView>
        </Bounceable>
      );
    } else {
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('TrendingTokensProductDetailsModal', {
              name: token.memecoin_name,
              symbol: token.symbol,
              logoUri: token.profile_picture_link,
              tokenDetails: priceCoin,
              tokenIdString: token.coingecko_id,
              contractAddress: token.erc20_contract_address, // erc-20 address
            })
          }>
          <SquircleView
            style={styles.squircle_view_wrap}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '50',
            }}>
            <View style={styles.left_side_view}>
              <FastImage
                source={{
                  uri: token.profile_picture_link,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.coin_logo_image}
              />
              <View style={styles.name_ticker_view}>
                <Text style={styles.name_text}>{token.memecoin_name}</Text>
                <Text style={styles.ticker_text}>
                  {token.symbol.toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={styles.price_change_view}>
              <Text style={styles.price_text}>{priceCoin.usd}</Text>
              <Text
                style={{
                  ...styles.change_percent_text,
                  color:
                    priceCoin.usd_24h_change < 0
                      ? themeHere.colors.danger_red
                      : themeHere.colors.success_green,
                }}>
                {String(priceCoin.usd_24h_change).substring(0, 5)} %
              </Text>
            </View>
          </SquircleView>
        </Pressable>
      );
    }
  }

  function RenderTokenList() {
    let tokenList = state_here.MemeCoinsListReducer.memecoinslist;

    // console.log(tokenList);

    if (tokenList.length > 0) {
      return <View>{tokenList.map(item => TokenCard(item))}</View>;
    } else {
      return <View />;
    }
  }

  return (
    <View style={styles.parent_view}>
      <DogeCoinCard />
      <ShibaInuCard />
      <RenderTokenList />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(TrendingTokensProduct);

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
