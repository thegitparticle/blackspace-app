import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Carousel from 'react-native-snap-carousel';
import {SquircleView} from 'react-native-figma-squircle';
import BuyTokensUniswapProduct from '../products/buytokensuniswap/BuyTokensUniswapProduct';
import StakeToEarnUniswapProduct from '../products/staketoearnuniswap/StakeToEarnUniSwapProduct';
import {connect} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function UniswapBluePrint() {
  const products = [
    {
      id: 0,
      product_name: 'Buy Tokens',
      component: 'BuyTokensUniswapProduct',
    },
    {
      id: 1,
      product_name: 'Stake to Earn',
      component: 'StakeToEarnUniswapProduct',
    },
  ];

  function RenderProductMakerDao({item, index}) {
    if (index === 0) {
      return (
        <View style={styles.product_view}>
          <Text style={styles.product_title}>
            Buy Tokens{' '}
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
            <BuyTokensUniswapProduct />
          </SquircleView>
        </View>
      );
    } else if (index === 1) {
      return (
        <View style={styles.product_view}>
          <Text style={styles.product_title}>
            Stake to Earn{' '}
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
            <StakeToEarnUniswapProduct />
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
    <Carousel
      data={products}
      renderItem={RenderProductMakerDao}
      sliderWidth={windowWidth}
      itemWidth={windowWidth}
      initialNumToRender={products.length}
      useScrollView={true}
    />
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(UniswapBluePrint);

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
