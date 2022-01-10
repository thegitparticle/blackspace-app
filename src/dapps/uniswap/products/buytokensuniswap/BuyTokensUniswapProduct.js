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

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function BuyTokenUniswapProduct({dispatch}) {
  const [firstPickedCoin, setFirstPickedCoin] = useState(FamousTokensList[0]);
  const [secondPickedCoin, setSecondPickedCoin] = useState();
  const [poolDetails, setPoolDetails] = useState();

  const [firstItemAmountExternal, setFirstItemAmountExternal] = useState('');
  const [secondItemAmountExternal, setSecondItemAmountExternal] =
    useState('---');

  useEffect(() => {
    dispatch(GetUniswapTokenList());
  }, []);

  let token_list = state_here.UniswapTokenListReducer.token_list;

  const modalizePickFirstCoinRef = useRef(null);

  const onOpenPickFirstCoin = () => {
    modalizePickFirstCoinRef.current?.open();
  };

  const onClosePickFirstCoin = () => {
    modalizePickFirstCoinRef.current?.close();
  };

  const modalizePickSecondCoinRef = useRef(null);

  const onOpenPickSecondCoin = () => {
    modalizePickSecondCoinRef.current?.open();
  };

  const onClosePickSecondCoin = () => {
    modalizePickSecondCoinRef.current?.close();
  };

  function SetPickPairBlockVariables() {
    if (poolDetails) {
      setSecondItemAmountExternal(
        poolDetails.data.pool.token1Price.substring(0, 10),
      );
    }
  }

  function SetOtherInfoBlockVariables() {}

  function getPoolDetails(poolid) {
    const data = JSON.stringify({
      query: `query Pool($poolID: ID!){
  pool(id: $poolID) {
    tick
    token0 {
      symbol
      id
      decimals
      feesUSD
      volumeUSD
      derivedETH
    }
    token1 {
      symbol
      id
      decimals
      feesUSD
      volumeUSD
      derivedETH
    }
    feeTier
    sqrtPrice
    liquidity
    token0Price
    token1Price
  }
}`,
      variables: {poolID: poolid},
    });

    const config = {
      method: 'post',
      url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setPoolDetails(response.data);
        SetPickPairBlockVariables();
        console.log('got pool data');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function RenderTokenListItemFirst(item) {
    return (
      <TouchableOpacity
        style={styles.render_token_item_view}
        onPress={() => {
          getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
          setFirstPickedCoin(item.item);
          onClosePickFirstCoin();
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

  function RenderTokenListItemSecond(item) {
    return (
      <TouchableOpacity
        style={styles.render_token_item_view}
        onPress={() => {
          getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
          setSecondPickedCoin(item.item);
          onClosePickSecondCoin();
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

  function PickFirstCoinHeader() {
    const [searchText, setSearchText] = useState('');

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
            onChangeText={setSearchText}
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
                getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
                setFirstPickedCoin(FamousTokensList[0]);
                onClosePickFirstCoin();
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
                getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
                setFirstPickedCoin(FamousTokensList[1]);
                onClosePickFirstCoin();
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
                getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
                setFirstPickedCoin(FamousTokensList[2]);
                onClosePickFirstCoin();
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
                getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
                setFirstPickedCoin(FamousTokensList[3]);
                onClosePickFirstCoin();
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
                getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
                setFirstPickedCoin(FamousTokensList[4]);
                onClosePickFirstCoin();
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

  function PickSecondCoinHeader() {
    const [searchText, setSearchText] = useState('');

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
            onChangeText={setSearchText}
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
                getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
                setSecondPickedCoin(FamousTokensList[0]);
                onClosePickSecondCoin();
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
                getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
                setSecondPickedCoin(FamousTokensList[1]);
                onClosePickSecondCoin();
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
                getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
                setSecondPickedCoin(FamousTokensList[2]);
                onClosePickSecondCoin();
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
                getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
                setSecondPickedCoin(FamousTokensList[3]);
                onClosePickSecondCoin();
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
                getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
                setSecondPickedCoin(FamousTokensList[4]);
                onClosePickSecondCoin();
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

  function FirstTokenAmountInput() {
    const [firstItemAmount, setFirstItemAmount] = useState('');

    return (
      <TextInput
        numberOfLines={1}
        onChangeText={setFirstItemAmount}
        value={firstItemAmount}
        style={styles.enter_amount_input}
        placeholder={'0.0 ETH'}
        placeholderTextColor={themeHere.colors.foreground + 50}
        keyboardType={'decimal-pad'}
        onEndEditing={() => {
          getPoolDetails('0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8');
          setFirstItemAmountExternal(firstItemAmount);
        }}
      />
    );
  }

  function PickedCoinShowHere(props) {
    if (props.Coin) {
      return (
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            width: windowWidth * 0.4,
            justifyContent: 'center',
          }}>
          <FastImage
            source={{
              uri: props.Coin.logoURI,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
            }}
          />
          <Text
            style={{
              ...themeHere.text.subhead_bold,
              color: themeHere.colors.foreground,
            }}>
            {' '}
            {props.Coin.symbol}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...themeHere.text.subhead_bold,
              color: themeHere.colors.foreground,
              textAlign: 'center',
              marginHorizontal: 10,
            }}>
            PICK
          </Text>
        </View>
      );
    }
  }

  const PickSwapPair = useMemo(
    () =>
      function PickSwapPair() {
        return (
          <View style={{marginTop: 30}}>
            <Text style={styles.block_sub_title}>you pay</Text>
            <View style={styles.pick_first_pair_item_view}>
              <SquircleView
                style={styles.first_pair_amount_view}
                squircleParams={{
                  cornerSmoothing: 1,
                  cornerRadius: 15,
                  fillColor: themeHere.colors.mid_ground + '25',
                }}>
                <FirstTokenAmountInput />
              </SquircleView>
              <TouchableOpacity
                style={{color: 'transparent'}}
                onPress={() => onOpenPickFirstCoin()}>
                <SquircleView
                  style={styles.first_pair_token_view}
                  squircleParams={{
                    cornerSmoothing: 1,
                    cornerRadius: 15,
                    fillColor: themeHere.colors.mid_ground + '25',
                  }}>
                  <PickedCoinShowHere Coin={firstPickedCoin} />
                </SquircleView>
              </TouchableOpacity>
            </View>
            <View style={styles.pick_first_pair_info_row_view}>
              <Text style={styles.pick_pair_info_text}>1 ETH = ~$3100</Text>
              <Text style={styles.pick_pair_info_text}>
                wallet balance:{' '}
                {state_here.WDeetsReducer.wdeets.wallet_eth_balance_readable_string.substring(
                  0,
                  5,
                )}
              </Text>
            </View>
            <Text style={styles.block_sub_title}>you get</Text>
            <View style={styles.pick_second_pair_item_view}>
              <SquircleView
                style={styles.second_pair_amount_view}
                squircleParams={{
                  cornerSmoothing: 1,
                  cornerRadius: 15,
                  fillColor: themeHere.colors.mid_ground + '25',
                }}>
                <Text style={styles.second_pair_amount_text}>
                  {secondItemAmountExternal}
                </Text>
              </SquircleView>
              <TouchableOpacity
                style={{color: 'transparent'}}
                onPress={() => onOpenPickSecondCoin()}>
                <SquircleView
                  style={styles.second_pair_token_view}
                  squircleParams={{
                    cornerSmoothing: 1,
                    cornerRadius: 15,
                    fillColor: themeHere.colors.mid_ground + '25',
                  }}>
                  <PickedCoinShowHere Coin={secondPickedCoin} />
                </SquircleView>
              </TouchableOpacity>
            </View>
          </View>
        );
      },
    [firstPickedCoin, secondItemAmountExternal, secondPickedCoin],
  );

  function OrderInfo() {
    return (
      <View style={{marginBottom: 30}}>
        <Text style={styles.block_title}>order info</Text>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>expected output</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              6,573.88 DAI
            </Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>
            expected price impact
          </Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>0.5%</Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>
            minimum received (after slippage)
          </Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>0.5%</Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>ETH network fee</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>0.5%</Text>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <View style={{marginTop: 30}}>
        <Text style={styles.block_sub_title}>you pay</Text>
        <View style={styles.pick_first_pair_item_view}>
          <SquircleView
            style={styles.first_pair_amount_view}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}>
            <FirstTokenAmountInput />
          </SquircleView>
          <TouchableOpacity
            style={{color: 'transparent'}}
            onPress={() => onOpenPickFirstCoin()}>
            <SquircleView
              style={styles.first_pair_token_view}
              squircleParams={{
                cornerSmoothing: 1,
                cornerRadius: 15,
                fillColor: themeHere.colors.mid_ground + '25',
              }}>
              <PickedCoinShowHere Coin={firstPickedCoin} />
            </SquircleView>
          </TouchableOpacity>
        </View>
        <View style={styles.pick_first_pair_info_row_view}>
          <Text style={styles.pick_pair_info_text}>1 ETH = ~$3100</Text>
          <Text style={styles.pick_pair_info_text}>
            wallet balance:{' '}
            {state_here.WDeetsReducer.wdeets.wallet_eth_balance_readable_string.substring(
              0,
              5,
            )}
          </Text>
        </View>
        <Text style={styles.block_sub_title}>you get</Text>
        <View style={styles.pick_second_pair_item_view}>
          <SquircleView
            style={styles.second_pair_amount_view}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}>
            <Text style={styles.second_pair_amount_text}>
              {secondItemAmountExternal}
            </Text>
          </SquircleView>
          <TouchableOpacity
            style={{color: 'transparent'}}
            onPress={() => onOpenPickSecondCoin()}>
            <SquircleView
              style={styles.second_pair_token_view}
              squircleParams={{
                cornerSmoothing: 1,
                cornerRadius: 15,
                fillColor: themeHere.colors.mid_ground + '25',
              }}>
              <PickedCoinShowHere Coin={secondPickedCoin} />
            </SquircleView>
          </TouchableOpacity>
        </View>
      </View>
      <OrderInfo />
      <Button
        title={'swap'}
        type={'solid'}
        containerStyle={styles.swap_button_container}
        buttonStyle={styles.swap_button_style}
        titleStyle={styles.swap_button_title}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: [
            themeHere.colors.success_green_dark,
            themeHere.colors.success_green,
          ],
        }}
      />
      <Portal>
        <Modalize
          ref={modalizePickFirstCoinRef}
          modalStyle={{
            backgroundColor: themeHere.colors.off_background,
            width: windowWidth,
            height: windowHeight * 0.5,
          }}
          flatListProps={{
            data: token_list,
            renderItem: RenderTokenListItemFirst,
            keyExtractor: item => item.heading,
            showsVerticalScrollIndicator: false,
            ListHeaderComponent: PickFirstCoinHeader(),
          }}
        />
        <Modalize
          ref={modalizePickSecondCoinRef}
          modalStyle={{
            backgroundColor: themeHere.colors.off_background,
            width: windowWidth,
            height: windowHeight * 0.5,
          }}
          flatListProps={{
            data: token_list,
            renderItem: RenderTokenListItemSecond,
            keyExtractor: item => item.heading,
            showsVerticalScrollIndicator: false,
            ListHeaderComponent: PickSecondCoinHeader(),
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
    marginTop: 15,
    // textAlign: 'center',
  },
  pick_first_pair_item_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
  },
  pick_swap_pair_view: {
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  first_pair_amount_view: {
    width: windowWidth * 0.45,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enter_amount_input: {
    backgroundColor: 'transparent',
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    width: windowWidth * 0.45,
    height: 50,
    alignSelf: 'center',
    textAlign: 'center',
  },
  first_pair_token_view: {
    width: windowWidth * 0.3,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pick_first_pair_info_row_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 15,
    marginBottom: 20,
  },
  pick_pair_info_text: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + '75',
  },
  pick_second_pair_item_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  second_pair_amount_view: {
    width: windowWidth * 0.45,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  second_pair_token_view: {
    width: windowWidth * 0.3,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  second_pair_amount_text: {
    backgroundColor: 'transparent',
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    alignSelf: 'center',
    textAlign: 'center',
  },
  order_info_one_block_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  order_info_title_text: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + '50',
  },
  order_info_value_text: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + '50',
  },
  swap_button_container: {
    marginVertical: 30,
    alignSelf: 'center',
  },
  swap_button_style: {
    width: windowWidth * 0.5,
    height: 50,
    borderRadius: 25,
  },
  swap_button_title: {
    ...themeHere.text.body_medium,
    color: 'white',
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
});
