import React from 'react';
import {Appearance, Dimensions} from 'react-native';
import {Text, useSx, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Carousel from 'react-native-snap-carousel';
import {SquircleView} from 'react-native-figma-squircle';
import {connect} from 'react-redux';
import StakeLiquidityFirstSolDexProduct from '../products/stakeliquidityfirstsoldex/StakeLiquidityFirstSolDexProduct';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function FirstSolDexBluePrint() {
  const sxCustom = useSx();

  const products = [
    {
      id: 0,
      product_name: 'Stake To Earn',
      component: 'StakeLiquidityFirstSolDexProduct',
    },
  ];

  function RenderProductFirstSolDex({item, index}) {
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
              (1/1)
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
          </View>
          <SquircleView
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '00',
            }}
            style={sxCustom({width: windowWidth - 40})}>
            <StakeLiquidityFirstSolDexProduct />
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
      renderItem={RenderProductFirstSolDex}
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

export default connect(mapStateToProps)(FirstSolDexBluePrint);
