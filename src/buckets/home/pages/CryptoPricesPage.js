import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, Dimensions, Appearance, ScrollView} from 'react-native';
import {Text, View, Image} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import {GetMarketPrices} from '../../../redux/appcore/MarketPricesActions';
import MarketPriceCryptoTile from '../components/MarketPriceCryptoTile';
import BottomSpacer from '../../../bits/BottomSpacer';

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
    <View variant="full_screen">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {marketPrices.map(item => (
          <MarketPriceCryptoTile coinDetails={item} />
        ))}
        <BottomSpacer height={75} />
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(CryptoPricesPage);
