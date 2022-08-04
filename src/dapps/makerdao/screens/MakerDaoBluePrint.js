import React, {useEffect} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import LeverageEthProduct from '../products/leverageeth/LeverageEthProduct';
import BorrowDaiProduct from '../products/borrowdai/BorrowDaiProduct';
import Carousel from 'react-native-snap-carousel';
import {SquircleView} from 'react-native-figma-squircle';
import GetMakerDAOVaultInfo from '../helpers/GetMakerDAOVaultInfo';
import {connect} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function MakerDaoBluePrint() {
  const products = [
    {
      id: 1,
      product_name: 'Leverage Up ETH',
      component: 'LeverageEthProduct',
    },
    {
      id: 2,
      product_name: 'Borrow Stablecoin DAI',
      component: 'BorrowDaiProduct',
    },
  ];

  useEffect(() => {
    GetMakerDAOVaultInfo(state_here.WDeetsReducer.wdeets.wallet_address).then(
      r => console.log(r),
    );
  }, []);

  function RenderProductMakerDao({item, index}) {
    if (index === 0) {
      return (
        <View style={styles.product_view}>
          <Text style={styles.product_title}>
            Leverage ETH{' '}
            <Text
              style={{
                ...themeHere.text.body_medium,
                color: themeHere.colors.foreground,
              }}>
              (1/2)
            </Text>
          </Text>
          <View style={styles.product_focused_indicator_view}>
            <View style={styles.product_focused_indicator} />
            <View style={styles.product_unfocused_indicator} />
          </View>
          <SquircleView
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}
            style={styles.product_tile_view}>
            <LeverageEthProduct />
          </SquircleView>
        </View>
      );
    } else if (index === 1) {
      return (
        <View style={styles.product_view}>
          <Text style={styles.product_title}>
            Borrow Stablecoin DAI{' '}
            <Text
              style={{
                ...themeHere.text.body_medium,
                color: themeHere.colors.foreground,
              }}>
              (2/2)
            </Text>
          </Text>
          <View style={styles.product_focused_indicator_view}>
            <View style={styles.product_unfocused_indicator} />
            <View style={styles.product_focused_indicator} />
          </View>
          <SquircleView
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}
            style={styles.product_tile_view}>
            <BorrowDaiProduct />
          </SquircleView>
        </View>
      );
    } else {
      return (
        <View style={styles.product_view}>
          <Text style={styles.product_title}></Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.parent_view}>
      <Carousel
        data={products}
        renderItem={RenderProductMakerDao}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        initialNumToRender={products.length}
        useScrollView={true}
      />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MakerDaoBluePrint);

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  product_view: {
    marginTop: 40,
    alignItems: 'center',
  },
  product_title: {
    ...themeHere.text.header_bold,
    color: themeHere.colors.foreground,
    textAlign: 'center',
    marginBottom: 20,
  },
  product_tile_view: {
    width: windowWidth - 40,
  },
  product_focused_indicator_view: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  product_focused_indicator: {
    width: 25,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: themeHere.colors.red,
    marginHorizontal: 5,
  },
  product_unfocused_indicator: {
    width: 25,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: themeHere.colors.mid_ground + '50',
    marginHorizontal: 5,
  },
});
