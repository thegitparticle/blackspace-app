/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Appearance,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {SquircleView} from 'react-native-figma-squircle';
import {connect} from 'react-redux';
// import {FamousTokensList} from '../../helpers/FamousTokensList';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
// import useDerivedEthPrice from '../../helpers/useDerivedEthPrice';
import useEthFiatPrice from '../../../../helpers/useEthFiatPrice';
// import useLiquidityPoolAddress from '../../helpers/useLiquidityPoolAddress';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {BigNumber} from 'ethers';
// import {useGasCostEstimate} from '../../../pooltogether/helpers/useGasCostEstimate';
// import use0xSwapQuote from '../../helpers/use0xSwapQuote';
// import InfoIcon from '../../../../bits/InfoIcon';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function TransferTokensWormholeProduct({dispatch}) {
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
    // token_price_usd: Number(myProfileDetails.eth_balance) * priceEth,
  };

  // const [token1Coin, setToken1Coin] = useState(FamousTokensList[4]);
  const [token0Coin, setToken0Coin] = useState(ethTokenObject);
  // for token1 - use address as variable name and token0 - contractAddress

  // const derivedETHToken0 = useDerivedEthPrice(token0Coin.contractAddress);
  // const derivedETHToken1 = useDerivedEthPrice(token1Coin.address);

  const {loadingEth, priceEth} = useEthFiatPrice();

  // let {loadingLPAddress, lpAddress, lpExists} = useLiquidityPoolAddress(
  //   token0Coin === null ? '' : token0Coin.contractAddress,
  //   token1Coin.address || '',
  // );

  const ESTIMATE_SWAP_GAS_AMOUNT = BigNumber.from('550000');

  // const {totalGasWei, totalGasUsd, isApproveFetched} = useGasCostEstimate(
  //   ESTIMATE_SWAP_GAS_AMOUNT,
  //   1,
  // );
  //
  // const {loading0xSwapQuote, quoteDetails0x, quoteDetails0xRaw} =
  //   use0xSwapQuote(
  //     token0Coin.contractAddress,
  //     token1Coin.address,
  //     token1Amount,
  //     token1Coin.decimals,
  //     state_here.WDeetsReducer.wdeets.wallet_address,
  //   );

  // function computeFiatToken1(value) {
  //   setToken1Fiat(
  //     Number(value) *
  //       Number(lpAddress.token1Price) *
  //       Number(derivedETHToken0.derivedETH) *
  //       Number(priceEth),
  //   );
  // }

  //   // const RenderOrderInfo = useMemo(
  //   //   () =>
  //   //     function RenderOrderInfo() {
  //   //       function GasPriceTextComponent() {
  //   //         if (quoteDetails0x !== null) {
  //   //           return (
  //   //             <Text style={{color: themeHere.colors.foreground}}>
  //   //               ~${' '}
  //   //               {Number(
  //   //                 Number(quoteDetails0x.gas) *
  //   //                   Number(quoteDetails0x.gasPrice) *
  //   //                   Number(priceEth) *
  //   //                   10 ** -18,
  //   //               ).toFixed(2)}
  //   //             </Text>
  //   //           );
  //   //         } else {
  //   //           return (
  //   //             <Text style={{color: themeHere.colors.foreground}}>~$ 0</Text>
  //   //           );
  //   //         }
  //   //       }
  //   //
  //   //       if (
  //   //         token1Amount.length > 0 &&
  //   //         token1Coin.address.length > 0 &&
  //   //         token0Coin &&
  //   //         // lpExists &&
  //   //         quoteDetails0x
  //   //       ) {
  //   //         return (
  //   //           <View style={styles.order_info_view}>
  //   //             <View
  //   //               style={{
  //   //                 ...styles.order_info_block_view,
  //   //                 justifyContent: 'center',
  //   //                 marginBottom: 40,
  //   //               }}>
  //   //               <Text style={styles.order_info_value_text}>
  //   //                 <Text style={{color: themeHere.colors.foreground}}>
  //   //                   1 {token1Coin.symbol} ={' '}
  //   //                   {Number(quoteDetails0x.price).toFixed(6)}{' '}
  //   //                   {token0Coin.symbol}
  //   //                 </Text>
  //   //               </Text>
  //   //             </View>
  //   //             <View style={styles.order_info_block_view}>
  //   //               <Text style={styles.order_info_title_text}>you get</Text>
  //   //               <Text style={styles.order_info_value_text}>
  //   //                 <Text style={{color: themeHere.colors.foreground}}>
  //   //                   {token1Amount} {token1Coin.symbol}
  //   //                 </Text>
  //   //               </Text>
  //   //             </View>
  //   //             <View style={styles.order_info_block_view}>
  //   //               <Text style={styles.order_info_title_text}>by paying</Text>
  //   //               <Text style={styles.order_info_value_text}>
  //   //                 <Text style={{color: themeHere.colors.foreground}}>
  //   //                   {Number(
  //   //                     quoteDetails0x.orders[0].takerAmount * 10 ** -18,
  //   //                   ).toFixed(2)}{' '}
  //   //                   {token0Coin.symbol}
  //   //                 </Text>
  //   //               </Text>
  //   //             </View>
  //   //             <View style={styles.order_info_block_view}>
  //   //               <Text style={styles.order_info_title_text}>
  //   //                 by paying (in $)
  //   //               </Text>
  //   //               <Text style={styles.order_info_value_text}>
  //   //                 <Text style={{color: themeHere.colors.foreground}}>
  //   //                   ${' '}
  //   //                   {Number(
  //   //                     Number(quoteDetails0x.orders[0].takerAmount * 10 ** -18) *
  //   //                       (1 / Number(quoteDetails0x.sellTokenToEthRate)) *
  //   //                       Number(priceEth),
  //   //                   )
  //   //                     .toFixed(0)
  //   //                     .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
  //   //                 </Text>
  //   //               </Text>
  //   //             </View>
  //   //             <View style={styles.order_info_block_view}>
  //   //               <Text style={styles.order_info_title_text}>
  //   //                 max expected slippage
  //   //               </Text>
  //   //               <Text style={styles.order_info_value_text}>
  //   //                 <Text style={{color: themeHere.colors.foreground}}>
  //   //                   ~{' '}
  //   //                   {Number(
  //   //                     ((Number(quoteDetails0x.guaranteedPrice) -
  //   //                       Number(quoteDetails0x.price)) /
  //   //                       Number(quoteDetails0x.price)) *
  //   //                       100,
  //   //                   ).toFixed(2)}{' '}
  //   //                   %
  //   //                 </Text>
  //   //               </Text>
  //   //             </View>
  //   //             <View style={styles.order_info_block_view}>
  //   //               <View
  //   //                 style={{
  //   //                   flexDirection: 'row',
  //   //                   alignItems: 'center',
  //   //                   justifyContent: 'center',
  //   //                 }}>
  //   //                 <Text style={styles.order_info_title_text}>
  //   //                   Ethereum Gas Fees
  //   //                 </Text>
  //   //                 <InfoIcon
  //   //                   size={10}
  //   //                   information={
  //   //                     'amount for fees taken for this transaction to be executed on the Ethereum blockchain'
  //   //                   }
  //   //                   height={70}
  //   //                 />
  //   //               </View>
  //   //               <Text style={styles.order_info_value_text}>
  //   //                 <GasPriceTextComponent />
  //   //               </Text>
  //   //             </View>
  //   //             <Button
  //   //               title={'start buy process'}
  //   //               type={'solid'}
  //   //               onPress={() =>
  //   //                 navigation.navigate('BuyTokensUniswapTransactionModal', {
  //   //                   token0Coin: token0Coin,
  //   //                   token1Coin: token1Coin,
  //   //                   token0Amount:
  //   //                     Number(token1Amount) * Number(lpAddress.token1Price),
  //   //                   token1Amount: token1Amount,
  //   //                   token1Fiat: token1Fiat,
  //   //                   lpDetails: lpAddress,
  //   //                 })
  //   //               }
  //   //               containerStyle={styles.next_button_container}
  //   //               buttonStyle={styles.next_button_style}
  //   //               titleStyle={styles.next_button_title}
  //   //               ViewComponent={LinearGradient}
  //   //               linearGradientProps={{
  //   //                 colors: [themeHere.colors.pink, themeHere.colors.pink + '90'],
  //   //               }}
  //   //             />
  //   //           </View>
  //   //         );
  //   //       } else if (!lpExists) {
  //   //         return (
  //   //           <View style={styles.order_info_view}>
  //   //             <View
  //   //               style={{
  //   //                 ...styles.order_info_block_view,
  //   //                 alignItems: 'center',
  //   //                 justifyContent: 'center',
  //   //               }}>
  //   //               <Text
  //   //                 style={{
  //   //                   ...styles.order_info_value_text,
  //   //                   alignSelf: 'center',
  //   //                   textAlign: 'center',
  //   //                 }}>
  //   //                 <Text style={{color: themeHere.colors.blue_light}}>
  //   //                   this combination has very low liquidity on Uniswap
  //   //                 </Text>
  //   //               </Text>
  //   //             </View>
  //   //           </View>
  //   //         );
  //   //       } else {
  //   //         return (
  //   //           <View style={styles.order_info_view}>
  //   //             <View
  //   //               style={{
  //   //                 ...styles.order_info_block_view,
  //   //                 alignItems: 'center',
  //   //                 justifyContent: 'center',
  //   //               }}>
  //   //               <Text
  //   //                 style={{
  //   //                   ...styles.order_info_value_text,
  //   //                   alignSelf: 'center',
  //   //                   textAlign: 'center',
  //   //                 }}>
  //   //                 <Text style={{color: themeHere.colors.blue_light}}>
  //   //                   enter # of tokens you want
  //   //                 </Text>
  //   //               </Text>
  //   //             </View>
  //   //           </View>
  //   //         );
  //   //       }
  //   //     },
  //   //   [token0Coin, token1Amount, token1Coin, lpAddress, lpExists, quoteDetails0x],
  //   // );
  //
  //   /*
  //   function RenderPaymentOption() {
  //     return (
  //       <TouchableOpacity
  //         onPress={() => {
  //           onOpenPickPaymentMethod();
  //         }}>
  //         <SquircleView
  //           style={styles.payment_option_item_view}
  //           squircleParams={{
  //             cornerSmoothing: 1,
  //             cornerRadius: 15,
  //             fillColor: themeHere.colors.mid_ground + '25',
  //           }}>
  //           <View style={styles.itemholding_leftside_view}>
  //             <FastImage
  //               style={styles.itemholding_icon}
  //               source={{
  //                 uri: token0Coin.logoURI,
  //                 priority: FastImage.priority.normal,
  //               }}
  //               resizeMode={FastImage.resizeMode.cover}
  //             />
  //             <Text style={styles.itemholding_title}>{token0Coin.name}</Text>
  //           </View>
  //           <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //             <View style={styles.itemholding_rightside_view}>
  //               <Text style={styles.itemholding_balance}>
  //                 {Number(token0Coin.tokenBalance_decimal) * 10 ** -18}
  //               </Text>
  //               {/*<Text style={styles.itemholding_converted_balance}>*/}
  //               {/*  ${token0Coin.token_price_usd}*/}
  //               {/*</Text>*/}
  // /*
  //             </View>
  //             <View style={{paddingHorizontal: 10}}>
  //               <Iconly
  //                 name="ChevronDownBroken"
  //                 color={themeHere.colors.foreground}
  //                 size={25}
  //               />
  //             </View>
  //           </View>
  //         </SquircleView>
  //       </TouchableOpacity>
  //     );
  //   }

  function RenderChooseChains() {
    return (
      <View
        style={{
          width: windowWidth * 0.8,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 30,
        }}>
        <SquircleView
          style={{
            height: 50,
            width: windowWidth * 0.3,
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
              uri: ethTokenObject.logoURI,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.famous_token_item_logo}
          />
          <Text style={styles.famous_token_item_symbol}>
            {ethTokenObject.symbol}
          </Text>
          {/*<View style={{paddingHorizontal: 5}}>*/}
          {/*  <Iconly*/}
          {/*    name="ChevronDownBroken"*/}
          {/*    color={themeHere.colors.foreground}*/}
          {/*    size={25}*/}
          {/*  />*/}
          {/*</View>*/}
        </SquircleView>
        <SquircleView
          style={{
            height: 50,
            width: windowWidth * 0.3,
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
              uri: ethTokenObject.logoURI,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.famous_token_item_logo}
          />
          <Text style={styles.famous_token_item_symbol}>
            {ethTokenObject.symbol}
          </Text>
          {/*<View style={{paddingHorizontal: 5}}>*/}
          {/*  <Iconly*/}
          {/*    name="ChevronDownBroken"*/}
          {/*    color={themeHere.colors.foreground}*/}
          {/*    size={25}*/}
          {/*  />*/}
          {/*</View>*/}
        </SquircleView>
      </View>
    );
  }

  function RenderTokenAndAmountToTransfer() {
    return (
      <View style={{marginBottom: 30}}>
        <View
          style={{
            width: windowWidth * 0.8,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <TextInput
            numberOfLines={1}
            onChangeText={value => {
              setToken1Amount(value);
              // computeFiatToken1(value);
            }}
            value={token1Amount}
            style={styles.enter_amount_input}
            placeholder={'0.0'}
            placeholderTextColor={themeHere.colors.foreground + 50}
            keyboardType={'decimal-pad'}
            onEndEditing={() => {}}
          />
          {/*<TouchableOpacity*/}
          {/*  style={{color: 'transparent'}}*/}
          {/*  onPress={() => onOpenPickToken1()}>*/}
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
                uri: ethTokenObject.logoURI,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.famous_token_item_logo}
            />
            <Text style={styles.famous_token_item_symbol}>
              {ethTokenObject.symbol}
            </Text>
            <View style={{paddingHorizontal: 5}}>
              <Iconly
                name="ChevronDownBroken"
                color={themeHere.colors.foreground}
                size={25}
              />
            </View>
          </SquircleView>
          {/*</TouchableOpacity>*/}
        </View>
        <Text style={{...styles.fiat_price_text, marginLeft: 30}}>
          ~ $ {Number(priceEth) * Number(token1Amount)}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <Text style={{...styles.block_sub_title, marginTop: 40}}>
        choose the chains
      </Text>
      <RenderChooseChains />
      <Text style={{...styles.block_sub_title, marginTop: 20}}>
        which token to transfer?
      </Text>
      <RenderTokenAndAmountToTransfer />
      <Text style={{...styles.block_sub_title, marginTop: 20}}>order info</Text>
      {/*<RenderOrderInfo />*/}
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(TransferTokensWormholeProduct);

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
    width: windowWidth * 0.8,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  enter_amount_input: {
    backgroundColor: 'transparent',
    ...themeHere.text.header_bold,
    color: themeHere.colors.foreground,
    width: (windowWidth - 40) / 2.5,
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
    height: 100,
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  render_token_item_logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 20,
    marginRight: 10,
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
