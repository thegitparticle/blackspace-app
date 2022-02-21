import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {SquircleView} from 'react-native-figma-squircle';
import {connect} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import {GetUniswapTokenList} from '../../../../redux/dapps/uniswap/UniswapTokenListActions';
import {Portal} from 'react-native-portalize';
import {FamousTokensList} from '../../helpers/FamousTokensList';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import useDerivedEthPrice from '../../helpers/useDerivedEthPrice';
import useEthFiatPrice from '../../../../helpers/useGetEthFiatPrice';
import useLiquidityPoolAddress from '../../helpers/useLiquidityPoolAddress';
import SetupUniswapPool from '../../helpers/UniswapPoolSetup';
import usePoolPricesFromChain from '../../helpers/usePoolPricesFromChain';
import _ from 'lodash';
import Iconly from '../../../../miscsetups/customfonts/Iconly';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

/*
blocks
1. choose token you want and type amount - "choose token you want to buy"
-> get approx price from coingecko or something in USD or fiat of choice - write approx price (can change
based on trade pair)
2. pick token to trade from your holdings (or) you dont have any holdings to trade with
3. If picked one of the holdings
-> then get the pair pricing from uniswap and update the order info (prices) - updates the second
token requirement
Order Info
a. just write you get ...... this for  .....
b. mini amount you'd get (after slippage) =
c. estimated fees = .....

payment method - token0
token you wanna buy - token1
 */

function BuyTokenUniswapProduct({dispatch}) {
  const navigation = useNavigation();

  const [token1Amount, setToken1Amount] = useState('');
  const [token1Fiat, setToken1Fiat] = useState(0);

  const wallet_address =
    state_here.UserDetailsReducer.userdetails.wallet_address;
  const myProfileDetails = state_here.MyProfileReducer.myProfileDetails;
  const myTokens = state_here.MyTokenBalancesReducer.tokens;
  let uniswapTokensFromReduxState =
    state_here.UniswapTokenListReducer.token_list;

  const [uniswapTokens, setUniswapTokens] = useState(
    uniswapTokensFromReduxState,
  );

  let ethTokenObject = {
    name: 'Ethereum',
    symbol: 'ETH',
    logoURI:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    tokenBalance_decimal: Number(myProfileDetails.eth_balance),
    token_price_usd: Number(myProfileDetails.eth_balance) * priceEth,
  };

  const [token1Coin, setToken1Coin] = useState(FamousTokensList[4]);
  const [token0Coin, setToken0Coin] = useState(ethTokenObject);

  const {loadingDerivedETH, derivedETH} = useDerivedEthPrice(
    token1Coin.address,
  );

  const {loadingEth, priceEth} = useEthFiatPrice();

  let {loadingLPAddress, lpAddress} = useLiquidityPoolAddress(
    token0Coin === null ? '' : token0Coin.contractAddress,
    token1Coin.address || '',
  );

  let {loadingPoolPrices, token0PoolPrice, token1PoolPrice} =
    usePoolPricesFromChain(
      lpAddress,
      token0Coin === null ? '' : token0Coin.contractAddress,
      token1Coin === null ? '' : token1Coin.address,
    );

  function computeFiatToken1(value) {
    setToken1Fiat(Number(value) * derivedETH * priceEth);
  }

  function changeToken0(token0) {
    setToken0Coin(token0);
  }

  const modalizePickToken1CoinRef = useRef(null);

  const onOpenPickToken1 = () => {
    modalizePickToken1CoinRef.current?.open();
  };

  const onClosePickToken1 = () => {
    modalizePickToken1CoinRef.current?.close();
  };

  const modalizePickPaymentMethodCoinRef = useRef(null);

  const onOpenPickPaymentMethod = () => {
    modalizePickPaymentMethodCoinRef.current?.open();
  };

  const onClosePickPaymentMethod = () => {
    modalizePickPaymentMethodCoinRef.current?.close();
  };

  function PickToken0Header() {
    return (
      <SquircleView
        style={styles.pick_coin_overlay_view}
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 15,
          fillColor: themeHere.colors.off_background,
        }}>
        <Text style={styles.pick_coin_overlay_title}>pay using?</Text>
      </SquircleView>
    );
  }

  function PickToken1Header() {
    const [searchText, setSearchText] = useState('');

    const filter = e => {
      const keyword = e.nativeEvent.text;

      if (keyword !== '') {
        const results = uniswapTokensFromReduxState.filter(token => {
          return token.name.toLowerCase().startsWith(keyword.toLowerCase());
          // Use the toLowerCase() method to make it case-insensitive
        });
        setUniswapTokens(results);
      } else {
        setUniswapTokens(uniswapTokensFromReduxState);
        // If the text field is empty, show all users
      }

      setSearchText(keyword);
    };

    return (
      <SquircleView
        style={styles.pick_coin_overlay_view}
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 15,
          fillColor: themeHere.colors.off_background,
        }}>
        <Text style={styles.pick_coin_overlay_title}>pick a coin</Text>
        <SquircleView
          style={styles.pick_coin_overlay_input_view}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: themeHere.colors.mid_ground + '25',
          }}>
          <TextInput
            numberOfLines={1}
            onChange={e => filter(e)}
            value={searchText}
            style={styles.pick_coin_overlay_input}
            placeholder={'search coins'}
            placeholderTextColor={themeHere.colors.foreground + 50}
          />
        </SquircleView>
        <View style={styles.famous_tokens_wrap_view}>
          <View style={styles.famous_tokens_line_view}>
            <TouchableOpacity
              onPress={() => {
                setToken1Coin(FamousTokensList[0]);
                onClosePickToken1();
              }}>
              <SquircleView
                style={styles.famous_token_item_view}
                squircleParams={{
                  cornerSmoothing: 1,
                  cornerRadius: 15,
                  fillColor: themeHere.colors.mid_ground + '25',
                }}>
                <FastImage
                  source={{
                    uri: FamousTokensList[0].logoURI,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.famous_token_item_logo}
                />
                <Text style={styles.famous_token_item_symbol}>
                  {FamousTokensList[0].symbol}
                </Text>
              </SquircleView>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setToken1Coin(FamousTokensList[1]);
                onClosePickToken1();
              }}>
              <SquircleView
                style={styles.famous_token_item_view}
                squircleParams={{
                  cornerSmoothing: 1,
                  cornerRadius: 15,
                  fillColor: themeHere.colors.mid_ground + '25',
                }}>
                <FastImage
                  source={{
                    uri: FamousTokensList[1].logoURI,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.famous_token_item_logo}
                />
                <Text style={styles.famous_token_item_symbol}>
                  {FamousTokensList[1].symbol}
                </Text>
              </SquircleView>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setToken1Coin(FamousTokensList[2]);
                onClosePickToken1();
              }}>
              <SquircleView
                style={styles.famous_token_item_view}
                squircleParams={{
                  cornerSmoothing: 1,
                  cornerRadius: 15,
                  fillColor: themeHere.colors.mid_ground + '25',
                }}>
                <FastImage
                  source={{
                    uri: FamousTokensList[2].logoURI,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.famous_token_item_logo}
                />
                <Text style={styles.famous_token_item_symbol}>
                  {FamousTokensList[2].symbol}
                </Text>
              </SquircleView>
            </TouchableOpacity>
          </View>
          <View style={styles.famous_tokens_line_view}>
            <TouchableOpacity
              onPress={() => {
                setToken1Coin(FamousTokensList[3]);
                onClosePickToken1();
              }}>
              <SquircleView
                style={styles.famous_token_item_view}
                squircleParams={{
                  cornerSmoothing: 1,
                  cornerRadius: 15,
                  fillColor: themeHere.colors.mid_ground + '25',
                }}>
                <FastImage
                  source={{
                    uri: FamousTokensList[3].logoURI,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.famous_token_item_logo}
                />
                <Text style={styles.famous_token_item_symbol}>
                  {FamousTokensList[3].symbol}
                </Text>
              </SquircleView>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setToken1Coin(FamousTokensList[4]);
                onClosePickToken1();
              }}>
              <SquircleView
                style={styles.famous_token_item_view}
                squircleParams={{
                  cornerSmoothing: 1,
                  cornerRadius: 15,
                  fillColor: themeHere.colors.mid_ground + '25',
                }}>
                <FastImage
                  source={{
                    uri: FamousTokensList[4].logoURI,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.famous_token_item_logo}
                />
                <Text style={styles.famous_token_item_symbol}>
                  {FamousTokensList[4].symbol}
                </Text>
              </SquircleView>
            </TouchableOpacity>
          </View>
        </View>
      </SquircleView>
    );
  }

  function RenderToken0ListItem(item) {
    return (
      <TouchableOpacity
        style={styles.render_token_item_view}
        onPress={() => {
          setToken0Coin(item.item);
          onClosePickPaymentMethod();
        }}>
        <>
          <FastImage
            source={{
              uri: item.item.logoURI,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.render_token_item_logo}
          />
          <Text style={styles.render_token_item_title}>{item.item.name}</Text>
        </>
        <Text style={styles.render_token_item_symbol}>{item.item.symbol}</Text>
      </TouchableOpacity>
    );
  }

  function RenderToken1ListItem(item) {
    return (
      <TouchableOpacity
        style={styles.render_token_item_view}
        onPress={() => {
          setToken1Coin(item.item);
          onClosePickToken1();
          // checkAndCallPoolInfo();
        }}>
        <>
          <FastImage
            source={{
              uri: item.item.logoURI,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.render_token_item_logo}
          />
          <Text style={styles.render_token_item_title}>{item.item.name}</Text>
        </>
        <Text style={styles.render_token_item_symbol}>{item.item.symbol}</Text>
      </TouchableOpacity>
    );
  }

  const RenderPaymentOptions = useMemo(
    () =>
      function RenderPaymentOptions() {
        function PaymentOptionItem(item) {
          const [selected, setSelected] = useState(false);

          if (selected) {
            return (
              <TouchableOpacity onPress={() => setSelected(!selected)}>
                <SquircleView
                  style={styles.payment_option_item_view}
                  squircleParams={{
                    cornerSmoothing: 1,
                    cornerRadius: 15,
                    fillColor: themeHere.colors.neon_blue + '75',
                  }}>
                  <View style={styles.itemholding_leftside_view}>
                    <FastImage
                      style={styles.itemholding_icon}
                      source={{
                        uri: item.logoURI,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <Text style={styles.itemholding_title}>{item.name}</Text>
                  </View>
                  <View style={styles.itemholding_rightside_view}>
                    <Text style={styles.itemholding_balance}>
                      {item.tokenBalance_decimal.toFixed(4)}
                    </Text>
                    <Text style={styles.itemholding_converted_balance}>
                      ${item.token_price_usd}
                    </Text>
                  </View>
                </SquircleView>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelected(!selected);
                  changeToken0(item);
                }}>
                <SquircleView
                  style={styles.payment_option_item_view}
                  squircleParams={{
                    cornerSmoothing: 1,
                    cornerRadius: 15,
                    fillColor: themeHere.colors.mid_ground + '25',
                  }}>
                  <View style={styles.itemholding_leftside_view}>
                    <FastImage
                      style={styles.itemholding_icon}
                      source={{
                        uri: item.logoURI,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <Text style={styles.itemholding_title}>{item.name}</Text>
                  </View>
                  <View style={styles.itemholding_rightside_view}>
                    <Text style={styles.itemholding_balance}>
                      {item.tokenBalance_decimal.toFixed(4)}
                    </Text>
                    <Text style={styles.itemholding_converted_balance}>
                      ${item.token_price_usd}
                    </Text>
                  </View>
                </SquircleView>
              </TouchableOpacity>
            );
          }
        }

        return (
          <View style={styles.payment_token_pick_view}>
            {PaymentOptionItem(ethTokenObject)}
            {myTokens.map(item => PaymentOptionItem(item))}
          </View>
        );
      },
    [],
  );

  const RenderOrderInfo = useMemo(
    () =>
      function RenderOrderInfo() {
        if (
          token1Amount.length > 0 &&
          token1Coin.address.length > 0 &&
          token0Coin
        ) {
          return (
            <View style={styles.order_info_view}>
              <View
                style={{
                  ...styles.order_info_block_view,
                  justifyContent: 'center',
                  marginBottom: 40,
                }}>
                <Text style={styles.order_info_value_text}>
                  <Text style={{color: themeHere.colors.foreground}}>
                    1 {token1Coin.symbol} = {token1PoolPrice}{' '}
                    {token0Coin.symbol}
                  </Text>
                </Text>
              </View>
              <View style={styles.order_info_block_view}>
                <Text style={styles.order_info_title_text}>you get</Text>
                <Text style={styles.order_info_value_text}>
                  <Text style={{color: themeHere.colors.foreground}}>
                    {token1Amount} {token1Coin.symbol}
                  </Text>
                </Text>
              </View>
              <View style={styles.order_info_block_view}>
                <Text style={styles.order_info_title_text}>by paying</Text>
                <Text style={styles.order_info_value_text}>
                  <Text style={{color: themeHere.colors.foreground}}>
                    {Number(token1Amount) * Number(token1PoolPrice)}{' '}
                    {token0Coin.symbol}
                  </Text>
                </Text>
              </View>
              <View style={styles.order_info_block_view}>
                <Text style={styles.order_info_title_text}>
                  max expected slippage
                </Text>
                <Text style={styles.order_info_value_text}>
                  <Text style={{color: themeHere.colors.foreground}}>
                    0.76%
                  </Text>
                </Text>
              </View>
              <View style={styles.order_info_block_view}>
                <Text style={styles.order_info_title_text}>
                  Ethereum Gas Fees
                </Text>
                <Text style={styles.order_info_value_text}>
                  <Text style={{color: themeHere.colors.foreground}}>
                    ~$49.94
                  </Text>
                </Text>
              </View>
              <Button
                title={'start buy process'}
                type={'solid'}
                onPress={() =>
                  navigation.navigate('BuyTokensUniswapTransactionModal', {
                    token0Coin: token0Coin,
                    token1Coin: token1Coin,
                    token0Amount:
                      Number(token1Amount) * Number(token1PoolPrice),
                    token1Amount: token1Amount,
                    token1Fiat: token1Fiat,
                    lpDetails: lpAddress,
                  })
                }
                containerStyle={styles.next_button_container}
                buttonStyle={styles.next_button_style}
                titleStyle={styles.next_button_title}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: [themeHere.colors.pink, themeHere.colors.pink + '90'],
                }}
              />
            </View>
          );
        } else {
          return (
            <View style={styles.order_info_view}>
              <View
                style={{
                  ...styles.order_info_block_view,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...styles.order_info_value_text,
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  <Text style={{color: themeHere.colors.blue_light}}>
                    enter # of tokens you want
                  </Text>
                </Text>
              </View>
            </View>
          );
        }
      },
    [
      token0Coin,
      token1Amount,
      token1Coin,
      token1PoolPrice,
      token0PoolPrice,
      lpAddress,
    ],
  );

  function RenderPaymentOption() {
    return (
      <TouchableOpacity
        onPress={() => {
          onOpenPickPaymentMethod();
        }}>
        <SquircleView
          style={styles.payment_option_item_view}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: themeHere.colors.mid_ground + '25',
          }}>
          <View style={styles.itemholding_leftside_view}>
            <FastImage
              style={styles.itemholding_icon}
              source={{
                uri: token0Coin.logoURI,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.itemholding_title}>{token0Coin.name}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.itemholding_rightside_view}>
              <Text style={styles.itemholding_balance}>
                {Number(token0Coin.tokenBalance_decimal) * 10 ** -18}
              </Text>
              {/*<Text style={styles.itemholding_converted_balance}>*/}
              {/*  ${token0Coin.token_price_usd}*/}
              {/*</Text>*/}
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Iconly
                name="ChevronDownBroken"
                color={themeHere.colors.foreground}
                size={25}
              />
            </View>
          </View>
        </SquircleView>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.parent_view}>
      <Text style={{...styles.block_sub_title, marginTop: 40}}>
        choose token you want to buy
      </Text>
      <View style={styles.want_token_view}>
        <TextInput
          numberOfLines={1}
          onChangeText={value => {
            setToken1Amount(value);
            computeFiatToken1(value);
          }}
          value={token1Amount}
          style={styles.enter_amount_input}
          placeholder={'0.0'}
          placeholderTextColor={themeHere.colors.foreground + 50}
          keyboardType={'decimal-pad'}
          onEndEditing={() => {}}
        />
        <TouchableOpacity
          style={{color: 'transparent'}}
          onPress={() => onOpenPickToken1()}>
          <SquircleView
            style={{
              height: 50,
              alignItems: 'center',
              flexDirection: 'row',
              marginRight: 10,
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}>
            <FastImage
              source={{
                uri: token1Coin.logoURI,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.famous_token_item_logo}
            />
            <Text style={styles.famous_token_item_symbol}>
              {token1Coin.symbol}
            </Text>
            <View style={{paddingHorizontal: 5}}>
              <Iconly
                name="ChevronDownBroken"
                color={themeHere.colors.foreground}
                size={25}
              />
            </View>
          </SquircleView>
        </TouchableOpacity>
      </View>
      <Text style={{...styles.fiat_price_text, marginBottom: 30}}>
        ~ $ {token1Fiat}
      </Text>
      <Text style={{...styles.block_sub_title, marginTop: 20}}>pay using</Text>
      <RenderPaymentOption />
      <Text style={{...styles.block_sub_title, marginTop: 20}}>order info</Text>
      <RenderOrderInfo />
      <Portal>
        <Modalize
          ref={modalizePickToken1CoinRef}
          modalStyle={{
            backgroundColor: themeHere.colors.off_background,
            width: windowWidth,
            height: windowHeight * 0.5,
          }}
          flatListProps={{
            data: uniswapTokens,
            renderItem: RenderToken1ListItem,
            keyExtractor: item => item.heading,
            showsVerticalScrollIndicator: false,
            ListHeaderComponent: PickToken1Header(),
          }}
        />
      </Portal>
      <Portal>
        <Modalize
          ref={modalizePickPaymentMethodCoinRef}
          modalStyle={{
            backgroundColor: themeHere.colors.off_background,
            width: windowWidth,
            height: windowHeight * 0.5,
          }}
          flatListProps={{
            data: _.concat(ethTokenObject, myTokens),
            renderItem: RenderToken0ListItem,
            keyExtractor: item => item.symbol,
            showsVerticalScrollIndicator: false,
            ListHeaderComponent: PickToken0Header(),
          }}
        />
      </Portal>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(BuyTokenUniswapProduct);

const styles = StyleSheet.create({
  parent_view: {},
  block_title: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  block_sub_title: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
  },
  want_token_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  enter_amount_input: {
    backgroundColor: 'transparent',
    ...themeHere.text.header_bold,
    color: themeHere.colors.foreground,
    width: (windowWidth - 40) / 2,
    height: 50,
    marginLeft: 20,
  },
  fiat_price_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginHorizontal: 20,
  },
  payment_token_pick_view: {
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  order_info_view: {
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  order_info_block_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
    width: windowWidth - 80,
  },
  order_info_title_text: {
    ...themeHere.text.body,
    color: themeHere.colors.foreground + '50',
  },
  order_info_value_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
  },
  famous_token_item_view: {
    width: (windowWidth - 80) / 2.75,
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
  payment_option_item_view: {
    width: windowWidth - 80,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignSelf: 'center',
  },

  itemholding_leftside_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
  },
  itemholding_icon: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  itemholding_title: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 10,
  },
  itemholding_rightside_view: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginHorizontal: 5,
  },
  itemholding_balance: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.red,
    marginVertical: 2.5,
    textAlign: 'right',
  },
  itemholding_converted_balance: {
    ...themeHere.text.body,
    color: themeHere.colors.foreground + '50',
    marginVertical: 2.5,
    textAlign: 'right',
  },
  first_pair_token_view: {
    width: windowWidth * 0.3,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  render_token_item_view: {
    height: 50,
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  render_token_item_logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  render_token_item_title: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.foreground,
    marginHorizontal: 10,
  },
  render_token_item_symbol: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
    marginHorizontal: 10,
  },
  pick_coin_overlay_view: {
    width: windowWidth,
    alignItems: 'center',
  },
  pick_coin_overlay_title: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.foreground,
    marginVertical: 30,
    textAlign: 'center',
  },
  pick_coin_overlay_input_view: {
    width: windowWidth - 40,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  pick_coin_overlay_input: {
    backgroundColor: 'transparent',
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    width: windowWidth - 40,
    height: 50,
    alignSelf: 'center',
    textAlign: 'center',
  },
  next_button_container: {
    marginVertical: 30,
    alignSelf: 'center',
  },
  next_button_style: {
    width: windowWidth * 0.5,
    height: 50,
    borderRadius: 25,
  },
  next_button_title: {
    ...themeHere.text.body_medium,
    color: 'white',
  },
});
