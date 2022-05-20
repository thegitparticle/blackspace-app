import React from 'react';
import {Appearance, Dimensions, StyleSheet} from 'react-native';
import {Text, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Carousel from 'react-native-snap-carousel';
import {SquircleView} from 'react-native-figma-squircle';
import LotteryPoolTogetherProduct from '../products/lotterypooltogether/LotteryPoolTogetherProduct';
import {Bounceable} from 'rn-bounceable';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import SpacerVertical from '../../../bits/SpacerVertical';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function PoolTogetherBluePrint(props) {
  const products = [
    {
      id: 1,
      product_name: 'Savings Account + Wild Gains',
      component: 'LotteryPoolTogetherProduct',
    },
  ];

  const navigation = useNavigation();

  function RenderProductPoolTogether({item, index}) {
    if (index === 0) {
      return (
        <View style={styles.product_view}>
          <Text style={styles.product_title}>
            Savings Account + Wild Gains{' '}
            <Text
              style={{
                ...themeHere.text.body_medium,
                color: themeHere.colors.foreground,
              }}>
              (1/1)
            </Text>
          </Text>
          <View style={styles.product_focused_indicator_view}>
            <View style={styles.product_focused_indicator} />
          </View>
          <SquircleView
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '50',
            }}
            style={styles.product_tile_view}>
            <LotteryPoolTogetherProduct />
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

  function AddThisAppToMyAppsSuite() {
    if (props.DiscoverOrNot) {
      return (
        <View sx={{width: windowWidth * 0.8, alignItems: 'center'}}>
          <Bounceable
            onPress={() => {
              axios
                .get(
                  'https://suprblack.xyz/api/users/add_dapps_to_user_suite/' +
                    String(state_here.UserDetailsReducer.userdetails.id) +
                    '/' +
                    String(4) +
                    '/',
                )
                .then(() => {
                  showMessage({
                    message: '100x added to your apps suite',
                    type: 'success',
                    backgroundColor: themeHere.colors.success_green,
                  });
                  navigation.goBack();
                })
                .catch(err => {
                  console.log(err);
                });
            }}>
            <Text
              sx={{
                ...themeHere.text.subhead_medium,
                color: 'blue',
                textAlign: 'center',
              }}>
              add 100x to my apps suite
            </Text>
          </Bounceable>
        </View>
      );
    } else {
      return <View />;
    }
  }

  return (
    <View style={styles.parent_view}>
      <Carousel
        data={products}
        renderItem={RenderProductPoolTogether}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        initialNumToRender={products.length}
        useScrollView={true}
      />
      <SpacerVertical height={50} />
      <AddThisAppToMyAppsSuite />
      <SpacerVertical height={50} />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(PoolTogetherBluePrint);

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
