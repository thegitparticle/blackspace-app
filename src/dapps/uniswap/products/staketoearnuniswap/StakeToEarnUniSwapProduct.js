import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {SquircleView} from 'react-native-figma-squircle';
import FastImage from 'react-native-fast-image';
import {FamousTokensList} from '../../helpers/FamousTokensList';
import {Button, Divider} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {GetUniswapStakePools} from '../../../../redux/dapps/uniswap/UniswapStakePoolsActions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const dummy_pools = [
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
  {
    pool_id: 1,
    token0_symbol: 'WETH',
    token0_icon:
      'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
    token1_symbol: 'MATIC',
    token1_icon:
      'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
    expected_returns: '131.03%',
    fee_level: '0.3%',
  },
];

/*
blocks
1. "choose the pool to earn from the list given"
2. List of pools - info shown would be:
  a. pair of the pool name
  b. expected returns (can vary)
  c. total liquidity
  d. volume (last 24h)
3. start stake process - button - opens modal

*/

let state_here = {};

function StakeToEarnUniswapProduct({dispatch}) {
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(GetUniswapStakePools());
  }, []);

  let stakePools = state_here.UniswapStakePoolsReducer.stakePools;

  function PoolItem(item) {
    return (
      <View style={styles.pool_item_view}>
        <View style={styles.pool_item_top_part_view}>
          <View style={styles.token_item_view}>
            <FastImage
              source={{
                uri: item.token0_icon,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.token_item_logo}
            />
            <Text style={styles.token_item_symbol}>{item.token0_symbol}</Text>
          </View>
          <View style={styles.token_item_view}>
            <FastImage
              source={{
                uri: item.token1_icon,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.token_item_logo}
            />
            <Text style={styles.token_item_symbol}>{item.token1_symbol}</Text>
          </View>
        </View>
        <View style={styles.pool_item_bottom_part_view}>
          <View style={styles.info_block_view}>
            <View style={styles.info_left_side_view}>
              <Text style={styles.info_title_text}>expected returns</Text>
              <Text style={styles.info_title_subtext}>(varies over time)</Text>
            </View>
            <View style={styles.info_right_side_view}>
              <Text style={styles.info_value_text}>
                {item.expected_returns}
              </Text>
              <Text style={styles.info_title_subtext}>APY%</Text>
            </View>
          </View>
        </View>
        <View style={styles.pool_item_bottom_part_view}>
          <View style={styles.info_block_view}>
            <View style={styles.info_left_side_view}>
              <Text style={styles.info_title_text}>total liquidity locked</Text>
            </View>
            <View style={styles.info_right_side_view}>
              <Text style={styles.info_value_text}>$ 31,600,900</Text>
              <Text style={styles.info_title_subtext}></Text>
            </View>
          </View>
        </View>
        <View style={styles.pool_item_bottom_part_view}>
          <View style={styles.info_block_view}>
            <View style={styles.info_left_side_view}>
              <Text style={styles.info_title_text}>volume (24h)</Text>
            </View>
            <View style={styles.info_right_side_view}>
              <Text style={styles.info_value_text}>$ 2,600,900</Text>
              <Text style={styles.info_title_subtext}></Text>
            </View>
          </View>
        </View>
        <Button
          title={'start buy process'}
          type={'solid'}
          onPress={() =>
            navigation.navigate('StakeToEarnUniSwapTransactionModal', {
              info: item,
            })
          }
          containerStyle={styles.next_button_container}
          buttonStyle={styles.next_button_style}
          titleStyle={styles.next_button_title}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [
              themeHere.colors.success_green,
              themeHere.colors.success_green_dark,
            ],
          }}
        />
        <Divider
          style={{...styles.pool_item_end_divider}}
          color={themeHere.colors.foreground + '75'}
        />
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      {stakePools.map(item => PoolItem(item))}
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(StakeToEarnUniswapProduct);

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
  pool_item_view: {
    width: windowWidth - 80,
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 20,
  },
  pool_item_top_part_view: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center',
    width: windowWidth - 80,
  },
  pool_item_bottom_part_view: {
    marginTop: 20,
    marginBottom: 20,
    width: windowWidth - 80,
  },
  info_block_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth - 80,
  },
  info_left_side_view: {
    flexDirection: 'column',
  },
  info_right_side_view: {
    flexDirection: 'column',
  },
  pool_item_end_divider: {
    marginVertical: 20,
    width: windowWidth - 160,
    alignSelf: 'center',
  },
  token_item_view: {
    width: (windowWidth - 80) / 3,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  token_item_logo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  token_item_symbol: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.foreground,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  tokens_wrap_view: {
    marginVertical: 15,
  },
  tokens_line_view: {
    width: windowWidth - 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  info_title_text: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground + '50',
    marginVertical: 2.5,
  },
  info_title_subtext: {
    ...themeHere.text.body,
    color: themeHere.colors.foreground + '50',
    marginVertical: 2.5,
  },
  info_value_text: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
    marginVertical: 2.5,
  },
  info_value_subtext: {
    ...themeHere.text.body,
    color: themeHere.colors.foreground + '50',
    marginVertical: 2.5,
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
