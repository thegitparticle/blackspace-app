import React, {useEffect} from 'react';
import {StyleSheet, Dimensions, Appearance} from 'react-native';
import {Text, View, Image, useSx} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {GetUniswapStakePools} from '../../../../redux/dapps/uniswap/UniswapStakePoolsActions';
import useStakePoolDetails from '../../helpers/useStakePoolDetails';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import StakePoolTile from './components/StakePoolTile';
import {SquircleView} from 'react-native-figma-squircle/src/index';

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
  const sxCustom = useSx();

  useEffect(() => {
    dispatch(GetUniswapStakePools());
  }, []);

  let stakePools = state_here.UniswapStakePoolsReducer.stakePools;

  function PoolItem(item) {
    const {loadingLPStakeDetails, lpStakeDetails} = useStakePoolDetails(
      item.contract_address,
    );

    if (loadingLPStakeDetails) {
      // if (1 === 1) {
      return (
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
              justifyContent: 'center',
              alignItems: 'center',
            })}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}>
            <DoubleBounce size={10} color="#1CAFF6" />
          </SquircleView>
        </View>
      );
    } else {
      return <StakePoolTile Pool={item} PoolUniswapData={lpStakeDetails} />;
    }
  }

  return <View>{stakePools.map(item => PoolItem(item))}</View>;
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(StakeToEarnUniswapProduct);

const styles = StyleSheet.create({
  parent_view: {},
});
