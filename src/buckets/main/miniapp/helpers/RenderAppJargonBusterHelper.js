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
import MakerDaoJargonBuster from '../../../../dapps/makerdao/screens/MakerDaoJargonBuster';
import CompoundFinanceJargonBuster from '../../../../dapps/compoundfinance/screens/CompoundFinanceJargonBuster';
import UniswapJargonBuster from '../../../../dapps/uniswap/screens/UniswapJargonBuster';
import MemeCoinsJargonBuster from '../../../../dapps/memecoinsapp/screens/MemeCoinsJargonBuster';
import LiquityJargonBuster from '../../../../dapps/liquity/screens/LiquityJargonBuster';
import PoolTogetherJargonBuster from '../../../../dapps/pooltogether/screens/PoolTogetherJargonBuster';
import IndexFundsJargonBuster from '../../../../dapps/indexfunds/screens/IndexFundsJargonBuster';
import SpacerVertical from '../../../../bits/SpacerVertical';
import WormholeBridgeJargonBuster from '../../../../dapps/wormholebridge/screens/WormholeBridgeJargonBuster';
import FirstSolDexJargonBuster from '../../../../dapps/firstsoldex/screens/FirstSolDexJargonBuster';
import UniswapUsageShowCase from '../../../../dapps/uniswap/screens/UniswapUsageShowCase';
import MemeCoinsUsageShowCase from '../../../../dapps/memecoinsapp/screens/MemeCoinsUsageShowCase';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function RenderAppJargonBusterHelper(props) {
  if (props.function_name === 'MakerDaoLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <MakerDaoJargonBuster
          appInfo={props.appInfo}
          DiscoverOrNot={props.discover_or_not}
        />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'CompoundFinanceLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <CompoundFinanceJargonBuster
          appInfo={props.appInfo}
          DiscoverOrNot={props.discover_or_not}
        />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'UniswapLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <UniswapUsageShowCase
          appInfo={props.appInfo}
          DiscoverOrNot={props.discover_or_not}
        />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'MemeCoinsAppLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <MemeCoinsUsageShowCase
          appInfo={props.appInfo}
          DiscoverOrNot={props.discover_or_not}
        />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'LiquityLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <LiquityJargonBuster
          appInfo={props.appInfo}
          DiscoverOrNot={props.discover_or_not}
        />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'PoolTogetherLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <PoolTogetherJargonBuster
          appInfo={props.appInfo}
          DiscoverOrNot={props.discover_or_not}
        />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'IndexFundsLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <IndexFundsJargonBuster
          appInfo={props.appInfo}
          DiscoverOrNot={props.discover_or_not}
        />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'WormholeBridgeLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <WormholeBridgeJargonBuster
          appInfo={props.appInfo}
          DiscoverOrNot={props.discover_or_not}
        />
        <SpacerVertical height={windowHeight * 0.25} />
      </ScrollView>
    );
  } else if (props.function_name === 'FirstSolDexLandingBluePrint') {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <FirstSolDexJargonBuster
          appInfo={props.appInfo}
          DiscoverOrNot={props.discover_or_not}
        />
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

export default RenderAppJargonBusterHelper;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});