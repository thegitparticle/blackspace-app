import React from 'react';
import {
  Appearance,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import MakerDaoUsageShowCase from '../../../../dapps/makerdao/screens/MakerDaoUsageShowCase';
import CompoundFinanceUsageShowCase from '../../../../dapps/compoundfinance/screens/CompoundFinanceUsageShowCase';
import UniswapUsageShowCase from '../../../../dapps/uniswap/screens/UniswapUsageShowCase';
import MemeCoinsUsageShowCase from '../../../../dapps/memecoinsapp/screens/MemeCoinsUsageShowCase';
import LiquityUsageShowCase from '../../../../dapps/liquity/screens/LiquityUsageShowCase';
import PoolTogetherUsageShowCase from '../../../../dapps/pooltogether/screens/PoolTogetherUsageShowCase';
import IndexFundsUsageShowCase from '../../../../dapps/indexfunds/screens/IndexFundsUsageShowCase';
import SpacerVertical from '../../../../bits/SpacerVertical';
import WormholeBridgeUsageShowCase from '../../../../dapps/wormholebridge/screens/WormholeBridgeUsageShowCase';
import FirstSolDexUsageShowCase from '../../../../dapps/firstsoldex/screens/FirstSolDexUsageShowCase';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function RenderAppInUseHelper(props) {
  if (props.function_name === 'MakerDaoLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <MakerDaoUsageShowCase DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'CompoundFinanceLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <CompoundFinanceUsageShowCase DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'UniswapLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <UniswapUsageShowCase DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'MemeCoinsAppLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <MemeCoinsUsageShowCase DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'LiquityLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <LiquityUsageShowCase DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'PoolTogetherLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <PoolTogetherUsageShowCase DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'IndexFundsLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <IndexFundsUsageShowCase DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'WormholeBridgeLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <WormholeBridgeUsageShowCase DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'FirstSolDexLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <FirstSolDexUsageShowCase DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
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

export default RenderAppInUseHelper;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
