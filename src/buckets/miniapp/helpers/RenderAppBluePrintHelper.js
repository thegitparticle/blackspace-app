import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import MakerDaoBluePrint from '../../../dapps/makerdao/screens/MakerDaoBluePrint';
import CompoundFinanceBluePrint from '../../../dapps/compoundfinance/screens/CompoundFinanceBluePrint';
import UniswapBluePrint from '../../../dapps/uniswap/screens/UniswapBluePrint';
import MemeCoinsAppBluePrint from '../../../dapps/memecoinsapp/screens/MemeCoinsAppBluePrint';
import LiquityBluePrint from '../../../dapps/liquity/screens/LiquityBluePrint';
import PoolTogetherBluePrint from '../../../dapps/pooltogether/screens/PoolTogetherBluePrint';
import IndexFundsBluePrint from '../../../dapps/indexfunds/screens/IndexFundsBluePrint';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function RenderAppBluePrintHelper(props) {
  if (props.function_name === 'MakerDaoLandingBluePrint') {
    return <MakerDaoBluePrint />;
  } else if (props.function_name === 'CompoundFinanceLandingBluePrint') {
    return (
      <CompoundFinanceBluePrint
        SwipeNavigateFunction={props.swipe_navigate_function}
      />
    );
  } else if (props.function_name === 'UniswapLandingBluePrint') {
    return <UniswapBluePrint />;
  } else if (props.function_name === 'MemeCoinsAppLandingBluePrint') {
    return <MemeCoinsAppBluePrint />;
  } else if (props.function_name === 'LiquityLandingBluePrint') {
    return <LiquityBluePrint />;
  } else if (props.function_name === 'PoolTogetherLandingBluePrint') {
    return <PoolTogetherBluePrint />;
  } else if (props.function_name === 'IndexFundsLandingBluePrint') {
    return <IndexFundsBluePrint />;
  } else {
    return (
      <View style={styles.parent_view}>
        <Text style={{color: 'white'}}>nothing</Text>
      </View>
    );
  }
}

export default RenderAppBluePrintHelper;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
