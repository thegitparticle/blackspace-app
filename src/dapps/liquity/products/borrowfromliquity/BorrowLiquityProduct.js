import React, {useState} from 'react';
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
import {SquircleView} from 'react-native-figma-squircle';
import FastImage from 'react-native-fast-image';
import {FamousTokensList} from '../../../uniswap/helpers/FamousTokensList';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
blocks
1. how much LUSD to borrow? - 1 LUSD = 1 USD - enter the amount
2. Coll needed - will load - in ETH and percentage
3. Order info -
  a. borrowing amount - will get into your wallet
  b. borrowing fee - in percentage + LUSD
  c. liquidation reserve (refundable) - 200 LUSD
  d. total amount of debt - total of all three

 4. botton to accept this out

*/

function BorrowLiquityProduct() {
  const [borrowAmount, setBorrowAmount] = useState('');

  function CollateralNeededBlock() {
    return (
      <View style={styles.coll_needed_block_view}>
        <Text style={{...styles.block_sub_title, marginTop: 40}}>
          collateral needed -
        </Text>
        <Text style={{...styles.block_sub_title, marginTop: 40}}>2.53 ETH</Text>
        <FastImage
          style={styles.itemholding_icon}
          source={{
            uri: 'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  }

  function RenderOrderInfo() {
    return (
      <View style={styles.order_info_view}>
        <View style={styles.order_info_block_view}>
          <Text style={styles.order_info_title_text}>you get</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              6,573.88 DAI ($6573)
            </Text>
          </Text>
        </View>
        <View style={styles.order_info_block_view}>
          <Text style={styles.order_info_title_text}>by paying</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              0.45 ETH ($6643.1)
            </Text>
          </Text>
        </View>
        <View style={styles.order_info_block_view}>
          <Text style={styles.order_info_title_text}>
            max expected slippage
          </Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>0.76%</Text>
          </Text>
        </View>
        <View style={styles.order_info_block_view}>
          <Text style={styles.order_info_title_text}>Ethereum Gas Fees</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>~$49.94</Text>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <Text style={{...styles.block_sub_title, marginTop: 40}}>
        how much do you wanna borrow?
      </Text>
      <View style={styles.borrow_input_view}>
        <TextInput
          numberOfLines={1}
          onChangeText={setBorrowAmount}
          value={borrowAmount}
          style={styles.enter_amount_input}
          placeholder={'0.0 DAI'}
          placeholderTextColor={themeHere.colors.foreground + 50}
          keyboardType={'decimal-pad'}
          onEndEditing={() => {}}
        />
        <TouchableOpacity style={{color: 'transparent'}}>
          <SquircleView
            style={styles.lusd_token_item_view}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}>
            <FastImage
              source={{
                uri: 'https://i.postimg.cc/4d53xMqN/128-lusd-icon.png',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.lusd_token_item_logo}
            />
            <Text style={styles.lusd_token_item_symbol}>LUSD</Text>
          </SquircleView>
        </TouchableOpacity>
      </View>
      <CollateralNeededBlock />
      <RenderOrderInfo />
    </View>
  );
}

export default BorrowLiquityProduct;

const styles = StyleSheet.create({
  parent_view: {},
  token_card_view: {
    width: windowWidth - 40,
  },
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
  borrow_input_view: {
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
  lusd_token_item_view: {
    width: (windowWidth - 80) / 3,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  lusd_token_item_logo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  lusd_token_item_symbol: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.foreground,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  lusd_tokens_wrap_view: {
    marginVertical: 15,
  },
  lusd_tokens_line_view: {
    width: windowWidth - 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  coll_needed_block_view: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
});