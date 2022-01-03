import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../theme/ButterTheme';
import Swiper from 'react-native-swiper';
import LeverageEthProduct from '../dapps/makerdao/producttiles/LeverageEthProduct';
import BorrowDaiProduct from '../dapps/makerdao/producttiles/BorrowDaiProduct';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*

what does it component have?
1. title of the product (1 tab)
2. indicator of how many and which one is currently viewed
3. content render for each of them

variables to pass
1. list of items
  a. title
  b. id
  c. component to render - name

 */

function SwipeableProductsShowcase(props) {
  function ProductView(props) {
    if (props.ProductComponent === 'LeverageEthProduct') {
      return (
        <View>
          <Text style={{color: 'white'}}>Leverage eth</Text>
          <LeverageEthProduct />
        </View>
      );
    } else if (props.ProductComponent === 'BorrowDaiProduct') {
      return (
        <View>
          <Text style={{color: 'white'}}>Leverage eth</Text>
          <BorrowDaiProduct />
        </View>
      );
    } else {
      return <View />;
    }
  }

  return (
    <View style={styles.parent_view}>
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View>
          <LeverageEthProduct />
        </View>
        <View>
          <BorrowDaiProduct />
        </View>
      </Swiper>
    </View>
  );
}

export default SwipeableProductsShowcase;

const styles = StyleSheet.create({
  parent_view: {},
});
