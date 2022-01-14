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
import {GetMarketPrices} from '../../../redux/appcore/MarketPricesActions';
import MarketPriceCryptoTile from '../components/MarketPriceCryptoTile';
import BottomSpacer from '../../../bits/BottomSpacer';

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

  return (
    <View style={styles.parent_view}>
      <ScrollView
        style={styles.parent_scrollview}
        showsVerticalScrollIndicator={false}>
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
