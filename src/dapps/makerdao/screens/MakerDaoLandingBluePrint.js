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
import LeverageEthProduct from '../producttiles/LeverageEthProduct';
import BorrowDaiProduct from '../producttiles/BorrowDaiProduct';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MakerDaoLandingBluePrint() {
  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  function changeCurrentViewIndex(index) {
    setCurrentViewIndex(index);
  }

  function ProductHeader() {
    if (currentViewIndex === 0) {
      return (
        <View style={styles.product_head}>
          <Text style={styles.product_title}>Leverage ETH</Text>
        </View>
      );
    } else if (currentViewIndex === 1) {
      return (
        <View style={styles.product_head}>
          <Text style={styles.product_title}>Borrow Stablecoin DAI</Text>
        </View>
      );
    }
  }

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

  function RenderProduct({item, index}) {
    console.log(index + 'index');
    if (index === 0) {
      return (
        <View style={styles.product_head}>
          <Text style={styles.product_title}>Leverage ETH</Text>
        </View>
      );
    } else if (index === 1) {
      return (
        <View style={styles.product_head}>
          <Text style={styles.product_title}>Borrow Stablecoin DAI</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.product_head}>
          <Text style={styles.product_title}>gone crazy</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.parent_view}>
      <ProductHeader />
      <Carousel
        data={products}
        renderItem={RenderProduct}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
      />
    </View>
  );
}

export default MakerDaoLandingBluePrint;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiper_wrapper: {
    backgroundColor: '#EEEEEE50',
    height: windowHeight * 0.5,
  },
  product_head: {
    marginTop: 40,
    marginBottom: 20,
  },
  product_title: {
    ...themeHere.text.header_bold,
    color: themeHere.colors.foreground,
    textAlign: 'center',
  },
});
