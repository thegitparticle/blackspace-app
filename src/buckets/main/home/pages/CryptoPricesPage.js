import {View} from 'dripsy';
import React, {useCallback, useEffect, useState} from 'react';
import {Appearance, Dimensions, RefreshControl, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import SpacerVertical from '../../../../bits/SpacerVertical';
import {GetMarketPrices} from '../../../../redux/appcore/MarketPricesActions';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import MarketPriceCryptoTile from '../components/MarketPriceCryptoTile';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function CryptoPricesPage({dispatch}) {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(GetMarketPrices());
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  let marketPrices = state_here.MarketPricesReducer.marketprices;

  return (
    <View variant="layout.full_screen_transparent">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={themeHere.colors.foreground}
          />
        }>
        {marketPrices.map(item => (
          <MarketPriceCryptoTile coinDetails={item} />
        ))}
        <SpacerVertical height={75} />
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(CryptoPricesPage);
