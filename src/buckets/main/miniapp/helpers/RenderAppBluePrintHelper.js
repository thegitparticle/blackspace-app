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
import MakerDaoBluePrint from '../../../../dapps/makerdao/screens/MakerDaoBluePrint';
import CompoundFinanceBluePrint from '../../../../dapps/compoundfinance/screens/CompoundFinanceBluePrint';
import UniswapBluePrint from '../../../../dapps/uniswap/screens/UniswapBluePrint';
import MemeCoinsAppBluePrint from '../../../../dapps/memecoinsapp/screens/MemeCoinsAppBluePrint';
import LiquityBluePrint from '../../../../dapps/liquity/screens/LiquityBluePrint';
import PoolTogetherBluePrint from '../../../../dapps/pooltogether/screens/PoolTogetherBluePrint';
import IndexFundsBluePrint from '../../../../dapps/indexfunds/screens/IndexFundsBluePrint';
import SpacerVertical from '../../../../bits/SpacerVertical';
import WormholeBridgeBluePrint from '../../../../dapps/wormholebridge/screens/WormholeBridgeBluePrint';
import FirstSolDexBluePrint from '../../../../dapps/firstsoldex/screens/FirstSolDexBluePrint';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function RenderAppBluePrintHelper(props) {
  if (props.function_name === 'MakerDaoLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <MakerDaoBluePrint DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'CompoundFinanceLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <CompoundFinanceBluePrint
          SwipeNavigateFunction={props.swipe_navigate_function}
          DiscoverOrNot={props.discover_or_not}
        />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'UniswapLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <UniswapBluePrint DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'MemeCoinsAppLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <MemeCoinsAppBluePrint DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'LiquityLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <LiquityBluePrint DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'PoolTogetherLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <PoolTogetherBluePrint DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'IndexFundsLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <IndexFundsBluePrint DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'WormholeBridgeLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <WormholeBridgeBluePrint DiscoverOrNot={props.discover_or_not} />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'FirstSolDexLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <FirstSolDexBluePrint DiscoverOrNot={props.discover_or_not} />
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

export default RenderAppBluePrintHelper;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
