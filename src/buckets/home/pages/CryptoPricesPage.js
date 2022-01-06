import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../../Desktop/soupapp/src/theme/ButterTheme';
import {connect} from 'react-redux';
import {GetMarketPrices} from '../../../redux/MarketPricesActions';
import MarketPriceCryptoTile from '../components/MarketPriceCryptoTile';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function CryptoPricesPage({dispatch}) {
  useEffect(() => {
    dispatch(GetMarketPrices());
  }, []);

  let marketPrices = state_here.MarketPricesReducer.marketprices;

  let marketPricesSorted = marketPrices.sort(
    (a, b) =>
      parseFloat(b.coin_details.usd_market_cap) -
      parseFloat(a.coin_details.usd_market_cap),
  );

  return (
    <View style={styles.parent_view}>
      <ScrollView style={styles.parent_scrollview}>
        {marketPricesSorted.map(item => (
          <MarketPriceCryptoTile coinDetails={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(CryptoPricesPage);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parent_scrollview: {
    width: windowWidth,
  },
  header_right_image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
