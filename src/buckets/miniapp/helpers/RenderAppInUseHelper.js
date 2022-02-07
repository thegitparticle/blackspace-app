import React from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import MakerDaoUsageShowCase from '../../../dapps/makerdao/screens/MakerDaoUsageShowCase';
import CompoundFinanceUsageShowCase from '../../../dapps/compoundfinance/screens/CompoundFinanceUsageShowCase';
import UniswapUsageShowCase from '../../../dapps/uniswap/screens/UniswapUsageShowCase';
import MemeCoinsUsageShowCase from '../../../dapps/memecoinsapp/screens/MemeCoinsUsageShowCase';
import LiquityUsageShowCase from '../../../dapps/liquity/screens/LiquityUsageShowCase';
import PoolTogetherUsageShowCase from '../../../dapps/pooltogether/screens/PoolTogetherUsageShowCase';
import IndexFundsUsageShowCase from '../../../dapps/indexfunds/screens/IndexFundsUsageShowCase';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function RenderAppInUseHelper(props) {
  if (props.function_name === 'MakerDaoLandingBluePrint') {
    return <MakerDaoUsageShowCase />;
  } else if (props.function_name === 'CompoundFinanceLandingBluePrint') {
    return <CompoundFinanceUsageShowCase />;
  } else if (props.function_name === 'UniswapLandingBluePrint') {
    return <UniswapUsageShowCase />;
  } else if (props.function_name === 'MemeCoinsAppLandingBluePrint') {
    return <MemeCoinsUsageShowCase />;
  } else if (props.function_name === 'LiquityLandingBluePrint') {
    return <LiquityUsageShowCase />;
  } else if (props.function_name === 'PoolTogetherLandingBluePrint') {
    return <PoolTogetherUsageShowCase />;
  } else if (props.function_name === 'IndexFundsLandingBluePrint') {
    return <IndexFundsUsageShowCase />;
  } else {
    return (
      <View style={styles.parent_view}>
        <Text style={{color: 'white'}}>nothing</Text>
      </View>
    );
  }
}

export default RenderAppInUseHelper;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
