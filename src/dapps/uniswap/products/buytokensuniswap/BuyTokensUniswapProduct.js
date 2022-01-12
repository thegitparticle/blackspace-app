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
 */

function BuyTokenUniswapProduct({dispatch}) {
  const [firstItemAmount, setFirstItemAmount] = useState('');

  const myEthBalance =
    state_here.WDeetsReducer.wdeets.wallet_eth_balance_readable_string;
  const myPortfolioTokens = []; // get them from redux state of wallet deets

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

  return (
    <View style={styles.parent_view}>
      <Text style={{...styles.block_sub_title, marginTop: 40}}>
        choose token you want to buy
      </Text>
      <View style={styles.want_token_view}>
        <TextInput
          numberOfLines={1}
          onChangeText={setFirstItemAmount}
          value={firstItemAmount}
          style={styles.enter_amount_input}
          placeholder={'0.0 DAI'}
          placeholderTextColor={themeHere.colors.foreground + 50}
          keyboardType={'decimal-pad'}
          onEndEditing={() => {}}
        />
        <TouchableOpacity style={{color: 'transparent'}}>
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
      </View>
      <Text style={{...styles.block_sub_title, marginTop: 20}}>pay using</Text>
      <View style={styles.payment_token_pick_view}></View>
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
    marginBottom: 20,
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
  payment_token_pick_view: {
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 30,
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
