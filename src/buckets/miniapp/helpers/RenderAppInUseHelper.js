import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import MakerDaoJargonBuster from '../../../dapps/makerdao/screens/MakerDaoJargonBuster';
import CompoundFinanceJargonBuster from '../../../dapps/compoundfinance/screens/CompoundFinanceJargonBuster';
import UniswapJargonBuster from '../../../dapps/uniswap/screens/UniswapJargonBuster';
import MemeCoinsJargonBuster from '../../../dapps/memecoinsapp/screens/MemeCoinsJargonBuster';
import MakerDaoUsageShowCase from '../../../dapps/makerdao/screens/MakerDaoUsageShowCase';
import CompoundFinanceUsageShowCase from '../../../dapps/compoundfinance/screens/CompoundFinanceUsageShowCase';
import UniswapUsageShowCase from '../../../dapps/uniswap/screens/UniswapUsageShowCase';
import MemeCoinsUsageShowCase from '../../../dapps/memecoinsapp/screens/MemeCoinsUsageShowCase';
import LiquityBluePrint from '../../../dapps/liquity/screens/LiquityBluePrint';
import LiquityUsageShowCase from '../../../dapps/liquity/screens/LiquityUsageShowCase';

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
