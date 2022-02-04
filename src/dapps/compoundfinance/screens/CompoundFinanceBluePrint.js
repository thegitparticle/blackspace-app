import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Carousel from 'react-native-snap-carousel';
import {SquircleView} from 'react-native-figma-squircle';
import EarnInterestCompoundFinance from '../products/earninterestcompoundfinance/EarnInterestCompoundFinance';
import BorrowCompoundFinance from '../products/borrowcompoundfinance/BorrowCompoundFinance';
import {runOnJS, useSharedValue, withTiming} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function CompoundFinanceBluePrint(props) {
  const products = [
    {
      id: 1,
      product_name: 'Earn Interest',
      component: 'EarnInterestCompoundFinance',
    },
    {
      id: 2,
      product_name: 'Borrow Cryptos',
      component: 'BorrowCompoundFinance',
    },
  ];

  function RenderProductCompoundFinance({item, index}) {
    // const offset = useSharedValue({x: 0, y: 0});
    // const start = useSharedValue({x: 0, y: 0});
    // const popupPosition = useSharedValue({x: 0, y: 0});
    // const popupAlpha = useSharedValue(0);

    const dragGesture = Gesture.Pan()
      .onStart(_e => {
        console.log('gesture started');
        if (_e.velocityY > 0) {
          runOnJS(props.SwipeNavigateFunction)();
          console.log('x axis x axis x axis');
        }
      })
      .onEnd(() => {
        // console.log('gesture has ended now');
      });

    // const longPressGesture = Gesture.LongPress().onStart(_event => {
    //   console.log('gesture is active right now');
    // });

    const composed = Gesture.Race(dragGesture);

    if (index === 0) {
      return (
        <View style={styles.product_view}>
          <Text style={styles.product_title}>
            Earn Interest{' '}
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
            <EarnInterestCompoundFinance />
          </SquircleView>
        </View>
      );
    } else if (index === 1) {
      return (
        <GestureDetector gesture={composed}>
          <View style={styles.product_view}>
            <Text style={styles.product_title}>
              Borrow Cryptos{' '}
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
              <BorrowCompoundFinance />
            </SquircleView>
          </View>
        </GestureDetector>
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
        renderItem={RenderProductCompoundFinance}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        initialNumToRender={products.length}
        useScrollView={true}
        // onSnapToItem={slideIndex => {
        //   if (slideIndex === 2) {
        //     console.log(slideIndex);
        //     props.SwipeNavigateFunction();
        //   }
        // }}
      />
    </View>
  );
}

export default CompoundFinanceBluePrint;

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
