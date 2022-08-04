import React from 'react';
import {Appearance, Dimensions, StyleSheet} from 'react-native';
import {Text, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Carousel from 'react-native-snap-carousel';
import {SquircleView} from 'react-native-figma-squircle';
import BorrowLiquityProduct from '../products/borrowfromliquity/BorrowLiquityProduct';
import SpacerVertical from '../../../bits/SpacerVertical';
import {Bounceable} from 'rn-bounceable';
import axios from 'axios';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function LiquityBluePrint(props) {
  const products = [
    {
      id: 1,
      product_name: 'Borrow @ 0% interest',
      component: 'BorrowLiquityProduct',
    },
  ];

  const navigation = useNavigation();

  function RenderProductLiquity({item, index}) {
    if (index === 0) {
      return (
        <View style={styles.product_view}>
          <Text style={styles.product_title}>
            Borrow @ 0% interest
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
              // fillColor: themeHere.colors.off_dark,
            }}
            style={styles.product_tile_view}>
            <BorrowLiquityProduct />
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
                    String(5) +
                    '/',
                )
                .then(() => {
                  showMessage({
                    message: 'Liquity added to your apps suite',
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
              add Liquity to my apps suite
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
        renderItem={RenderProductLiquity}
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

export default connect(mapStateToProps)(LiquityBluePrint);

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
