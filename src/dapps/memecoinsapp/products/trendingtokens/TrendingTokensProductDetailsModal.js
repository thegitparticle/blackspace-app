import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import axios from 'axios';
import {LineChart} from 'react-native-wagmi-charts';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import ModalGoBackHeader from '../../../../bits/ModalGoBackHeader';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import BottomSpacer from '../../../../bits/BottomSpacer';
import {useNavigation} from '@react-navigation/native';
import {Bars} from 'react-native-loader';
import {Bounceable} from 'rn-bounceable';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function TrendingTokensProductDetailsModal({route, dispatch}) {
  const navigation = useNavigation();
  const {name, symbol, logoUri, tokenDetails, tokenIdString} = route.params;

  const [loadingChartData, setLoadingChartData] = useState(true);
  const [currentChartData, setCurrentChartData] = useState([]);
  const [currentChartRange, setCurrentChartRange] = useState(1);

  let refinedChartInfo = [];

  function getCoinChartInfo(coin_id) {
    let chartInfo = [];

    const config = {
      method: 'get',
      url:
        'https://api.coingecko.com/api/v3/coins/' +
        tokenIdString +
        '/market_chart?vs_currency=usd&days=' +
        String(currentChartRange),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(response => {
        chartInfo = response.data.prices;
      })
      .then(() => {
        for (let i = 0; i < chartInfo.length; i++) {
          // let x_here = Object.assign({timestamp: 0, value: 0}, chartInfo[i]);
          let x_here = {timestamp: chartInfo[i][0], value: chartInfo[i][1]};
          refinedChartInfo.push(x_here);
        }
        setCurrentChartData(refinedChartInfo);
      })
      .then(() => setLoadingChartData(false))
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getCoinChartInfo(tokenIdString);
  }, [currentChartRange]);

  function RenderChartView() {
    if (loadingChartData) {
      return (
        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Bars size={10} color="#FDAAFF" />
        </View>
      );
    } else {
      return (
        <LineChart.Provider data={currentChartData}>
          <LineChart>
            <LineChart.Path
              color={
                _.last(currentChartData).value -
                  _.head(currentChartData).value >
                0
                  ? themeHere.colors.success_green
                  : themeHere.colors.danger_red
              }>
              <LineChart.Gradient
                color={
                  _.last(currentChartData).value -
                    _.head(currentChartData).value >
                  0
                    ? themeHere.colors.success_green
                    : themeHere.colors.danger_red
                }
              />
            </LineChart.Path>
          </LineChart>
        </LineChart.Provider>
      );
    }
  }

  function RenderChartRangeButtons() {
    return (
      <View
        style={{
          width: windowWidth,
          justifyContent: 'space-evenly',
          marginVertical: 30,
          flexDirection: 'row',
        }}>
        <Bounceable onPress={() => setCurrentChartRange(1)}>
          <Text
            style={{
              ...themeHere.text.subhead_medium,
              color: themeHere.colors.foreground,
            }}>
            24h
          </Text>
        </Bounceable>
        <Bounceable onPress={() => setCurrentChartRange(7)}>
          <Text
            style={{
              ...themeHere.text.subhead_medium,
              color: themeHere.colors.foreground,
            }}>
            7d
          </Text>
        </Bounceable>
        <Bounceable onPress={() => setCurrentChartRange(30)}>
          <Text
            style={{
              ...themeHere.text.subhead_medium,
              color: themeHere.colors.foreground,
            }}>
            30d
          </Text>
        </Bounceable>
        <Bounceable onPress={() => setCurrentChartRange(365)}>
          <Text
            style={{
              ...themeHere.text.subhead_medium,
              color: themeHere.colors.foreground,
            }}>
            1y
          </Text>
        </Bounceable>
      </View>
    );
  }

  function RenderTokenDetails() {
    return (
      <View style={styles.token_details_view_wrap}>
        <View style={styles.token_details_left_side_view}>
          <FastImage
            source={{
              uri: logoUri,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.token_details_coin_logo_image}
          />
          <View style={styles.token_details_name_ticker_view}>
            <Text style={styles.token_details_name_text}>{name}</Text>
            <Text style={styles.token_details_ticker_text}>
              {symbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.token_details_price_change_view}>
          <Text style={styles.token_details_price_text}>{token.usd}</Text>
        </View>
      </View>
    );
  }

  function RenderPriceDetails() {
    return (
      <View style={styles.price_details_view_wrap}>
        <View style={styles.price_details_block_view}>
          <Text style={styles.price_details_title_text}>
            last 24 hours change (%)
          </Text>
          <Text style={styles.price_details_value_text}>
            <Text
              style={{
                color:
                  token.usd_24h_change < 0
                    ? themeHere.colors.danger_red
                    : themeHere.colors.success_green,
              }}>
              {String(token.usd_24h_change).substring(0, 5)} %
            </Text>
          </Text>
        </View>
        {/*<View style={styles.price_details_block_view}>*/}
        {/*  <Text style={styles.price_details_title_text}>*/}
        {/*    last 7 days change (%)*/}
        {/*  </Text>*/}
        {/*  <Text style={styles.price_details_value_text}>*/}
        {/*    <Text*/}
        {/*      style={{*/}
        {/*        color:*/}
        {/*          token._24h_change < 0*/}
        {/*            ? themeHere.colors.danger_red*/}
        {/*            : themeHere.colors.success_green,*/}
        {/*      }}>*/}
        {/*      {token._7d_change.substring(0, 5)} %*/}
        {/*    </Text>*/}
        {/*  </Text>*/}
        {/*</View>*/}
        <View style={styles.price_details_block_view}>
          <Text style={styles.price_details_title_text}>market cap ($)</Text>
          <Text style={styles.price_details_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              ${' '}
              {token.usd_market_cap
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <ModalGoBackHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>...</Text>
        <RenderChartView />
        <RenderChartRangeButtons />
        {/*<RenderTokenDetails />*/}
        {/*<RenderPriceDetails />*/}
        {/*<Button*/}
        {/*  title={'buy'}*/}
        {/*  type={'solid'}*/}
        {/*  onPress={() =>*/}
        {/*    navigation.navigate('TrendingTokensTransactionModal', {*/}
        {/*      token: token,*/}
        {/*    })*/}
        {/*  }*/}
        {/*  containerStyle={styles.buy_button_container}*/}
        {/*  buttonStyle={styles.buy_button_style}*/}
        {/*  titleStyle={styles.buy_button_title}*/}
        {/*  ViewComponent={LinearGradient}*/}
        {/*  linearGradientProps={{*/}
        {/*    colors: [*/}
        {/*      themeHere.colors.success_green_dark,*/}
        {/*      themeHere.colors.success_green,*/}
        {/*    ],*/}
        {/*  }}*/}
        {/*/>*/}
        <BottomSpacer height={50} />
      </ScrollView>
    </View>
  );
}

export default TrendingTokensProductDetailsModal;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    backgroundColor: themeHere.colors.background,
  },
  token_details_view_wrap: {
    marginTop: 60,
    marginBottom: 30,
    width: windowWidth - 40,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  token_details_left_side_view: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  token_details_coin_logo_image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  token_details_name_ticker_view: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 50,
    marginHorizontal: 20,
  },
  token_details_name_text: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
  },
  token_details_ticker_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
  },
  token_details_price_change_view: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 50,
    marginHorizontal: 20,
  },
  token_details_price_text: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
    textAlign: 'right',
  },
  token_details_change_percent_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
    textAlign: 'right',
  },
  price_details_view_wrap: {
    marginVertical: 30,
    width: windowWidth - 40,
    alignSelf: 'center',
  },
  price_details_block_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
    width: windowWidth - 80,
  },
  price_details_title_text: {
    ...themeHere.text.body,
    color: themeHere.colors.foreground + '50',
  },
  price_details_value_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
  },
  buy_button_container: {
    marginVertical: 30,
    alignSelf: 'center',
  },
  buy_button_style: {
    width: windowWidth * 0.5,
    height: 50,
    borderRadius: 25,
  },
  buy_button_title: {
    ...themeHere.text.body_medium,
    color: 'white',
  },
});
