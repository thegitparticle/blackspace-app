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
import useStakePoolDetails from '../../helpers/useStakePoolDetails';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

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
    const {loadingLPStakeDetails, lpStakeDetails} = useStakePoolDetails(
      item.contract_address,
    );

    if (loadingLPStakeDetails) {
      return (
        <View>
          <DoubleBounce size={10} color="#1CAFF6" />
        </View>
      );
    } else {
      return (
        <View style={styles.pool_item_view}>
          <View style={styles.pool_item_top_part_view}>
            <View style={styles.token_item_view}>
              <FastImage
                source={{
                  uri: item.profile_pic_token0,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.token_item_logo}
              />
              <Text style={styles.token_item_symbol}>{item.pool_name}</Text>
            </View>
            <View style={styles.token_item_view}>
              <FastImage
                source={{
                  uri: item.profile_pic_token1,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.token_item_logo}
              />
              <Text style={styles.token_item_symbol}>{item.pool_name}</Text>
            </View>
          </View>
          <View style={styles.pool_item_bottom_part_view}>
            <View style={styles.info_block_view}>
              <View style={styles.info_left_side_view}>
                <Text style={styles.info_title_text}>expected returns</Text>
                <Text style={styles.info_title_subtext}>
                  (varies over time)
                </Text>
              </View>
              <View style={styles.info_right_side_view}>
                <Text style={styles.info_value_text}>
                  {item.apy_calculation}
                </Text>
                <Text style={styles.info_title_subtext}>APY%</Text>
              </View>
            </View>
          </View>
          <View style={styles.pool_item_bottom_part_view}>
            <View style={styles.info_block_view}>
              <View style={styles.info_left_side_view}>
                <Text style={styles.info_title_text}>
                  total liquidity locked
                </Text>
              </View>
              <View style={styles.info_right_side_view}>
                <Text style={styles.info_value_text}>
                  $ {Number(lpStakeDetails.totalValueLockedUSD).toFixed(0)}
                </Text>
                <Text style={styles.info_title_subtext}></Text>
              </View>
            </View>
          </View>
          <View style={styles.pool_item_bottom_part_view}>
            <View style={styles.info_block_view}>
              <View style={styles.info_left_side_view}>
                <Text style={styles.info_title_text}>fee Tier</Text>
              </View>
              <View style={styles.info_right_side_view}>
                <Text style={styles.info_value_text}>
                  {lpStakeDetails.feeTier}
                </Text>
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
                lpStakeDetails: lpStakeDetails,
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
