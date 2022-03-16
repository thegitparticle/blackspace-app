import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import axios from 'axios';
// import {LineChart} from 'react-native-wagmi-charts';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import ModalGoBackHeader from '../../../../bits/ModalGoBackHeader';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Spacer from '../../../../bits/Spacer';
import {useNavigation} from '@react-navigation/native';
import {Bars} from 'react-native-loader';
import {Bounceable} from 'rn-bounceable';
import {Modal, ModalContent, ScaleAnimation} from 'react-native-modals';
import {SquircleView} from 'react-native-figma-squircle';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import {LineChart, Grid} from 'react-native-svg-charts';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function TrendingTokensProductDetailsModal({route, dispatch}) {
  const navigation = useNavigation();
  const {name, symbol, logoUri, tokenDetails, tokenIdString, contractAddress} =
    route.params;

  const [showDogePopup, setShowDogePopup] = useState(false);
  const [showBuyPopup, setShowBuyPopup] = useState(false);

  const [amountToBuy, setAmountToBuy] = useState('');
  const [amountToBuyFiat, setAmountToBuyFiat] = useState('');

  function computeFiatToken(value) {
    setAmountToBuyFiat(Number(value) * Number(tokenDetails.usd));
  }

  const [loadingChartData, setLoadingChartData] = useState(true);
  const [currentChartRange, setCurrentChartRange] = useState(1);

  const [currentChartData1, setCurrentChartData1] = useState([]);
  const [currentChartData7, setCurrentChartData7] = useState([]);
  const [currentChartData30, setCurrentChartData30] = useState([]);
  const [currentChartData365, setCurrentChartData365] = useState([]);

  function getCoinChartInfo1() {
    const config = {
      method: 'get',
      url:
        'https://api.coingecko.com/api/v3/coins/' +
        tokenIdString +
        '/market_chart?vs_currency=usd&days=1',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(response => {
        let refinedChartInfo = [];
        for (let i = 0; i < response.data.prices.length; i++) {
          // let x_here = Object.assign({timestamp: 0, value: 0}, chartInfo[i]);
          // let x_here = {
          //   timestamp: response.data.prices[i][0],
          //   value: response.data.prices[i][1],
          // };
          let x_here = response.data.prices[i][1];
          refinedChartInfo.push(x_here);
        }
        setCurrentChartData1(refinedChartInfo);
      })
      .then(() => setLoadingChartData(false))
      .catch(function (error) {
        console.log(error);
      });
  }

  function getCoinChartInfo7() {
    const config = {
      method: 'get',
      url:
        'https://api.coingecko.com/api/v3/coins/' +
        tokenIdString +
        '/market_chart?vs_currency=usd&days=7',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(response => {
        let refinedChartInfo = [];
        for (let i = 0; i < response.data.prices.length; i++) {
          // let x_here = Object.assign({timestamp: 0, value: 0}, chartInfo[i]);
          // let x_here = {
          //   timestamp: response.data.prices[i][0],
          //   value: response.data.prices[i][1],
          // };
          let x_here = response.data.prices[i][1];
          refinedChartInfo.push(x_here);
        }
        setCurrentChartData7(refinedChartInfo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getCoinChartInfo30() {
    const config = {
      method: 'get',
      url:
        'https://api.coingecko.com/api/v3/coins/' +
        tokenIdString +
        '/market_chart?vs_currency=usd&days=30',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(response => {
        let refinedChartInfo = [];
        for (let i = 0; i < response.data.prices.length; i++) {
          // let x_here = Object.assign({timestamp: 0, value: 0}, chartInfo[i]);
          // let x_here = {
          //   timestamp: response.data.prices[i][0],
          //   value: response.data.prices[i][1],
          // };
          let x_here = response.data.prices[i][1];
          refinedChartInfo.push(x_here);
        }
        setCurrentChartData30(refinedChartInfo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getCoinChartInfo365() {
    const config = {
      method: 'get',
      url:
        'https://api.coingecko.com/api/v3/coins/' +
        tokenIdString +
        '/market_chart?vs_currency=usd&days=365',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(response => {
        let refinedChartInfo = [];
        for (let i = 0; i < response.data.prices.length; i++) {
          // let x_here = Object.assign({timestamp: 0, value: 0}, chartInfo[i]);
          // let x_here = {
          //   timestamp: response.data.prices[i][0],
          //   value: response.data.prices[i][1],
          // };
          let x_here = response.data.prices[i][1];
          refinedChartInfo.push(x_here);
        }
        setCurrentChartData365(refinedChartInfo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getCoinChartInfo1();
    getCoinChartInfo7();
    getCoinChartInfo30();
    getCoinChartInfo365();
  }, []);

  const RenderChartView = useMemo(
    () =>
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
          if (currentChartRange === 1) {
            return (
              <LineChart
                style={{height: 200}}
                data={currentChartData1}
                svg={{
                  stroke:
                    _.last(currentChartData1) - _.head(currentChartData1) > 0
                      ? themeHere.colors.success_green
                      : themeHere.colors.danger_red,
                }}
                contentInset={{top: 20, bottom: 20}}>
                <Grid />
              </LineChart>
            );
          } else if (currentChartRange === 7) {
            return (
              <LineChart
                style={{height: 200}}
                data={currentChartData7}
                svg={{
                  stroke:
                    _.last(currentChartData7) - _.head(currentChartData7) > 0
                      ? themeHere.colors.success_green
                      : themeHere.colors.danger_red,
                }}
                contentInset={{top: 20, bottom: 20}}>
                <Grid />
              </LineChart>
            );
          } else if (currentChartRange === 30) {
            return (
              <LineChart
                style={{height: 200}}
                data={currentChartData30}
                svg={{
                  stroke:
                    _.last(currentChartData30) - _.head(currentChartData30) > 0
                      ? themeHere.colors.success_green
                      : themeHere.colors.danger_red,
                }}
                contentInset={{top: 20, bottom: 20}}>
                <Grid />
              </LineChart>
            );
          } else {
            return (
              <LineChart
                style={{height: 200}}
                data={currentChartData365}
                svg={{
                  stroke:
                    _.last(currentChartData365) - _.head(currentChartData365) >
                    0
                      ? themeHere.colors.success_green
                      : themeHere.colors.danger_red,
                }}
                contentInset={{top: 20, bottom: 20}}>
                <Grid />
              </LineChart>
            );
          }
        }
      },
    [loadingChartData, currentChartRange],
  );

  const RenderChartRangeButtons = useMemo(
    () =>
      function RenderChartRangeButtons() {
        return (
          <View
            style={{
              width: windowWidth,
              justifyContent: 'space-evenly',
              marginVertical: 30,
              flexDirection: 'row',
            }}>
            <Bounceable
              onPress={() => {
                setCurrentChartRange(1);
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...themeHere.text.subhead_medium,
                    color:
                      currentChartRange === 1
                        ? themeHere.colors.success_green_light
                        : themeHere.colors.foreground,
                  }}>
                  24h
                </Text>
              </View>
            </Bounceable>
            <Bounceable
              onPress={() => {
                setCurrentChartRange(7);
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...themeHere.text.subhead_medium,
                    color:
                      currentChartRange === 7
                        ? themeHere.colors.success_green_light
                        : themeHere.colors.foreground,
                  }}>
                  7d
                </Text>
              </View>
            </Bounceable>
            <Bounceable
              onPress={() => {
                setCurrentChartRange(30);
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...themeHere.text.subhead_medium,
                    color:
                      currentChartRange === 30
                        ? themeHere.colors.success_green_light
                        : themeHere.colors.foreground,
                  }}>
                  30d
                </Text>
              </View>
            </Bounceable>
            <Bounceable onPress={() => setCurrentChartRange(365)}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...themeHere.text.subhead_medium,
                    color:
                      currentChartRange === 365
                        ? themeHere.colors.success_green_light
                        : themeHere.colors.foreground,
                  }}>
                  1y
                </Text>
              </View>
            </Bounceable>
          </View>
        );
      },
    [currentChartRange],
  );

  const RenderTokenDetails = useMemo(
    () =>
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
              <Text style={styles.token_details_price_text}>
                {tokenDetails.usd}
              </Text>
            </View>
          </View>
        );
      },
    [],
  );

  const RenderPriceDetails = useMemo(
    () =>
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
                      tokenDetails.usd_24h_change < 0
                        ? themeHere.colors.danger_red
                        : themeHere.colors.success_green,
                  }}>
                  {String(tokenDetails.usd_24h_change).substring(0, 5)} %
                </Text>
              </Text>
            </View>
            <View style={styles.price_details_block_view}>
              <Text style={styles.price_details_title_text}>
                market cap ($)
              </Text>
              <Text style={styles.price_details_value_text}>
                <Text style={{color: themeHere.colors.foreground}}>
                  ${' '}
                  {Number(tokenDetails.usd_market_cap)
                    .toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </Text>
            </View>
          </View>
        );
      },
    [],
  );

  return (
    <View style={styles.parent_view}>
      <ModalGoBackHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>...</Text>
        <RenderTokenDetails />
        <RenderChartView />
        <RenderChartRangeButtons />
        <RenderPriceDetails />
        <Spacer height={150} />
      </ScrollView>
      <Button
        title={'buy'}
        type={'solid'}
        onPress={() =>
          // navigation.navigate('TrendingTokensTransactionModal', {
          //   tokenDetails: tokenDetails,
          //   contractAddress,
          // })

          {
            if (tokenIdString === 'dogecoin') {
              setShowDogePopup(true);
            } else {
              setShowBuyPopup(true);
            }
          }
        }
        containerStyle={styles.buy_button_container}
        buttonStyle={styles.buy_button_style}
        titleStyle={styles.buy_button_title}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: [
            themeHere.colors.success_green_dark,
            themeHere.colors.success_green,
          ],
        }}
      />
      <Modal
        visible={showDogePopup}
        initialValue={0}
        useNativeDriver={true}
        modalStyle={{backgroundColor: 'transparent'}}
        modalAnimation={new ScaleAnimation()}
        onTouchOutside={() => {
          setShowDogePopup(false);
        }}>
        <ModalContent>
          <View
            style={{
              backgroundColor: themeHere.colors.off_background,
              borderColor: themeHere.colors.off_background,
              justifyContent: 'center',
              alignItems: 'center',
              width: windowWidth - 40,
              borderRadius: 15,
            }}>
            <Text
              style={{
                color: themeHere.colors.foreground,
                marginVertical: 40,
                ...themeHere.text.header,
              }}>
              Doge Coin buying coming soon
            </Text>
          </View>
        </ModalContent>
      </Modal>
      <Modal
        visible={showBuyPopup}
        initialValue={0}
        useNativeDriver={true}
        modalStyle={{backgroundColor: 'transparent'}}
        modalAnimation={new ScaleAnimation()}
        onTouchOutside={() => {
          setShowBuyPopup(false);
        }}>
        <ModalContent>
          <View
            style={{
              backgroundColor: themeHere.colors.off_background,
              borderColor: themeHere.colors.off_background,
              justifyContent: 'center',
              alignItems: 'center',
              width: windowWidth - 40,
              borderRadius: 15,
              paddingVertical: 30,
            }}>
            <Text
              style={{
                color: themeHere.colors.foreground,
                marginBottom: 40,
                ...themeHere.text.header,
              }}>
              How much do you wanna buy?
            </Text>
            <View style={styles.want_token_view}>
              <TextInput
                numberOfLines={1}
                onChangeText={value => {
                  setAmountToBuy(value);
                  computeFiatToken(value);
                }}
                value={amountToBuy}
                style={styles.enter_amount_input}
                placeholder={'0.0'}
                placeholderTextColor={themeHere.colors.foreground + 50}
                keyboardType={'decimal-pad'}
                onEndEditing={() => {}}
              />
              <SquircleView
                style={styles.famous_token_item_view}
                squircleParams={{
                  cornerSmoothing: 1,
                  cornerRadius: 15,
                  fillColor: themeHere.colors.mid_ground + '25',
                }}>
                <FastImage
                  source={{
                    uri: logoUri,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.famous_token_item_logo}
                />
                <Text style={styles.famous_token_item_symbol}>{symbol}</Text>
              </SquircleView>
            </View>
            <View style={{flexDirection: 'row', width: windowWidth - 40}}>
              <Text style={{...styles.fiat_price_text, marginBottom: 30}}>
                ~ ${' '}
                {Number(amountToBuyFiat)
                  .toFixed(0)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>
            <Button
              title={'buy'}
              type={'solid'}
              onPress={() => {
                if (amountToBuy.length > 0) {
                  setShowBuyPopup(false);
                  navigation.navigate('TrendingTokensTransactionModal', {
                    tokenDetails: tokenDetails,
                    name: name,
                    symbol: symbol,
                    logoUri: logoUri,
                    tokenIdString: tokenIdString,
                    contractAddress: contractAddress,
                    amountToBuy: amountToBuy,
                  });
                } else {
                }
              }}
              containerStyle={{alignSelf: 'center'}}
              buttonStyle={styles.buy_button_style}
              titleStyle={styles.buy_button_title}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: [
                  themeHere.colors.success_green_dark,
                  themeHere.colors.success_green,
                ],
              }}
            />
          </View>
        </ModalContent>
      </Modal>
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
    marginTop: 5,
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
    marginVertical: 50,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
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
  want_token_view: {
    flexDirection: 'row',
    marginTop: 30,
  },
  enter_amount_input: {
    backgroundColor: 'transparent',
    ...themeHere.text.header_bold,
    color: themeHere.colors.foreground,
    width: (windowWidth - 40) / 2,
    height: 50,
    marginHorizontal: 20,
  },
  fiat_price_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginHorizontal: 20,
  },
  famous_token_item_view: {
    width: (windowWidth - 80) / 3,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  famous_token_item_logo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  famous_token_item_symbol: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.foreground,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  famous_tokens_wrap_view: {
    marginVertical: 15,
  },
  famous_tokens_line_view: {
    width: windowWidth - 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
