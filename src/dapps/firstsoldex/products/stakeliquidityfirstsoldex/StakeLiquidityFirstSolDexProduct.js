import React, {useEffect} from 'react';
import {Appearance, Dimensions, StyleSheet} from 'react-native';
import {Text, useSx, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {GetUniswapStakePools} from '../../../../redux/dapps/uniswap/UniswapStakePoolsActions';
import useStakePoolDetails from '../../../uniswap/helpers/useStakePoolDetails';
import {DoubleBounce} from 'react-native-loader';
import StakePoolTile from './../../../uniswap/products/staketoearnuniswap/components/StakePoolTile';
import {SquircleView} from 'react-native-figma-squircle';
import {Bounceable} from 'rn-bounceable';
import {StyledFastImage30} from '../../../../theme/DripsyTheme';
import FastImage from 'react-native-fast-image';
import {SvgUri} from 'react-native-svg';
import {OrcaPools} from '../../staticdata/OrcaPools';

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

function StakeLiquidityFirstSolDexProduct({dispatch}) {
  const navigation = useNavigation();
  const sxCustom = useSx();

  let stakePools = OrcaPools;

  function PoolItem(props) {
    return (
      <Bounceable
        onPress={() =>
          navigation.navigate('StakeLiquidityFirstSolTransactionModal', {
            // info: props.Pool,
            poolDetails: props.item,
          })
        }>
        <View
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            width: windowWidth - 40,
            height: 75,
            my: '$2',
            alignSelf: 'center',
          }}>
          <SquircleView
            style={sxCustom({
              width: windowWidth - 40,
              height: 75,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            })}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '75',
            }}>
            <View sx={{mx: '$4', flexDirection: 'row', alignItems: 'center'}}>
              <StyledFastImage30
                source={{
                  uri: props.item.tokenA_icon,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{backgroundColor: '#EEE'}}
              />

              <View
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  mx: '$4',
                }}>
                <Text variant="subhead_medium" sx={{color: 'foreground'}}>
                  {props.item.tokenA_symbol}
                </Text>
                <Text variant="subhead_medium" sx={{color: 'foreground'}}>
                  {' '}
                  -{' '}
                </Text>
                <Text variant="subhead_medium" sx={{color: 'foreground'}}>
                  {props.item.tokenB_symbol}
                </Text>
              </View>
              <StyledFastImage30
                source={{
                  uri: props.item.tokenB_icon,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{backgroundColor: '#EEE'}}
              />
            </View>
            <View
              sx={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                height: 50,
                mx: 20,
              }}>
              <Text
                variant="header_bold"
                sx={{
                  textAlign: 'right',
                  color: 'success_green',
                }}>
                {props.item.apr_estimated}
              </Text>
            </View>
          </SquircleView>
        </View>
      </Bounceable>
    );
  }

  return (
    <View>
      {stakePools.map(item => (
        <PoolItem item={item} />
      ))}
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(StakeLiquidityFirstSolDexProduct);
