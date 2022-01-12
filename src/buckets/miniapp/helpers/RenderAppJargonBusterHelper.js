import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import MakerDaoJargonBuster from '../../../dapps/makerdao/screens/MakerDaoJargonBuster';
import CompoundFinanceJargonBuster from '../../../dapps/compoundfinance/screens/CompoundFinanceJargonBuster';
import UniswapJargonBuster from '../../../dapps/uniswap/screens/UniswapJargonBuster';
import MemeCoinsJargonBuster from '../../../dapps/memecoinsapp/screens/MemeCoinsJargonBuster';
import LiquityBluePrint from '../../../dapps/liquity/screens/LiquityBluePrint';
import LiquityJargonBuster from '../../../dapps/liquity/screens/LiquityJargonBuster';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function RenderAppJargonBusterHelper(props) {
  if (props.function_name === 'MakerDaoLandingBluePrint') {
    return <MakerDaoJargonBuster />;
  } else if (props.function_name === 'CompoundFinanceLandingBluePrint') {
    return <CompoundFinanceJargonBuster />;
  } else if (props.function_name === 'UniswapLandingBluePrint') {
    return <UniswapJargonBuster />;
  } else if (props.function_name === 'MemeCoinsAppLandingBluePrint') {
    return <MemeCoinsJargonBuster />;
  } else if (props.function_name === 'LiquityLandingBluePrint') {
    return <LiquityJargonBuster />;
  } else {
    return (
      <View style={styles.parent_view}>
        <Text style={{color: 'white'}}>nothing</Text>
      </View>
    );
  }
}

export default RenderAppJargonBusterHelper;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
