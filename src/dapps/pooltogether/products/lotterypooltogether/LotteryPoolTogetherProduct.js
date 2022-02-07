import React, {useEffect, useState} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import useLUSDFiatPrice from '../../helpers/useLUSDFiatPrice';
import {EthersLiquity, ReadableEthersLiquity} from '@liquity/lib-ethers';
import {Fees} from '@liquity/lib-base';
import {connect} from 'react-redux';
import {BigNumber, ethers} from 'ethers';
import useEthFiatPrice from '../../../../helpers/useGetEthFiatPrice';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function LotteryPoolTogetherProduct() {
  return (
    <View style={styles.parent_view}>
      <Text style={{...styles.block_sub_title, marginTop: 40}}>
        how much do you wanna bet on here to lot lot
      </Text>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(LotteryPoolTogetherProduct);

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
    width: windowWidth * 0.3,
    alignSelf: 'center',
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
  fiat_price_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginHorizontal: 20,
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
