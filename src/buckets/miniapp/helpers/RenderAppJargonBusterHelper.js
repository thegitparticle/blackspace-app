import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import MakerDaoJargonBuster from '../../../dapps/makerdao/screens/MakerDaoJargonBuster';
import CompoundFinanceJargonBuster from '../../../dapps/compoundfinance/screens/CompoundFinanceJargonBuster';
import UniswapJargonBuster from '../../../dapps/uniswap/screens/UniswapJargonBuster';
import MemeCoinsJargonBuster from '../../../dapps/memecoinsapp/screens/MemeCoinsJargonBuster';
import LiquityJargonBuster from '../../../dapps/liquity/screens/LiquityJargonBuster';
import PoolTogetherJargonBuster from '../../../dapps/pooltogether/screens/PoolTogetherJargonBuster';
import IndexFundsJargonBuster from '../../../dapps/indexfunds/screens/IndexFundsJargonBuster';
import IndexFundsUsageShowCase from '../../../dapps/indexfunds/screens/IndexFundsUsageShowCase';
import Spacer from '../../../bits/Spacer';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function RenderAppJargonBusterHelper(props) {
  if (props.function_name === 'MakerDaoLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <MakerDaoJargonBuster appInfo={props.appInfo} />
        <Spacer height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'CompoundFinanceLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <CompoundFinanceJargonBuster appInfo={props.appInfo} />
        <Spacer height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'UniswapLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <UniswapJargonBuster appInfo={props.appInfo} />
        <Spacer height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'MemeCoinsAppLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <MemeCoinsJargonBuster appInfo={props.appInfo} />
        <Spacer height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'LiquityLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <LiquityJargonBuster appInfo={props.appInfo} />
        <Spacer height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'PoolTogetherLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <PoolTogetherJargonBuster appInfo={props.appInfo} />
        <Spacer height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'IndexFundsLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <IndexFundsJargonBuster appInfo={props.appInfo} />
        <Spacer height={windowHeight * 0.25} />
      </ScrollView>
    );
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
