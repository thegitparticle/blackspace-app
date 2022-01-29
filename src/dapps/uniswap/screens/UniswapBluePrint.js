import React, {useState} from 'react';
import {StyleSheet, Dimensions, Appearance, ScrollView} from 'react-native';
import {Text, View, Image, useSx} from 'dripsy';
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
  const sxCustom = useSx();

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

  function RenderProductUniswap({item, index}) {
    if (index === 0) {
      return (
        <View sx={{mt: '$8', alignItems: 'center'}}>
          <Text
            variant="header_bold"
            sx={{
              color: 'foreground',
              textAlign: 'center',
              mb: '$4',
            }}>
            Buy Tokens{' '}
            <Text
              variant="body_medium"
              sx={{
                color: 'foreground',
              }}>
              (1/2)
            </Text>
          </Text>
          <View
            sx={{
              alignItems: 'center',
              flexDirection: 'row',
              mb: '$4',
            }}>
            <View
              sx={{
                width: 25,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: 'red',
                mx: '$1',
              }}
            />
            <View
              sx={{
                width: 25,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: 'mid_ground',
                opacity: 0.5,
                mx: '$1',
              }}
            />
          </View>
          <SquircleView
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}
            style={sxCustom({width: windowWidth - 40})}>
            <BuyTokensUniswapProduct />
          </SquircleView>
        </View>
      );
    } else if (index === 1) {
      return (
        <View sx={{mt: '$8', alignItems: 'center'}}>
          <Text
            variant="header_bold"
            sx={{
              color: 'foreground',
              textAlign: 'center',
              mb: '$4',
            }}>
            Stake to Earn{' '}
            <Text
              variant="body_medium"
              sx={{
                color: 'foreground',
              }}>
              (2/2)
            </Text>
          </Text>
          <View
            sx={{
              alignItems: 'center',
              flexDirection: 'row',
              mb: '$4',
            }}>
            <View
              sx={{
                width: 25,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: 'mid_ground',
                opacity: 0.5,
                mx: '$1',
              }}
            />
            <View
              sx={{
                width: 25,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: 'red',
                mx: '$1',
              }}
            />
          </View>
          <SquircleView
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}
            style={sxCustom({width: windowWidth - 40})}>
            <StakeToEarnUniswapProduct />
          </SquircleView>
        </View>
      );
    } else {
      return <View sx={{mt: '$8', alignItems: 'center'}}></View>;
    }
  }

  return (
    <Carousel
      data={products}
      renderItem={RenderProductUniswap}
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
