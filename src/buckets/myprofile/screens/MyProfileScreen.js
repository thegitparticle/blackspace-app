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
import MainDetails from '../components/MainDetails';
import WalletPie from '../components/WalletPie';
import AccordianPortfolio from '../components/AccordianPortfolio';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BottomSpacer from '../../../bits/BottomSpacer';
import ModalGoBackHeader from '../../../bits/ModalGoBackHeader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MyProfileScreen() {
  return (
    <View style={styles.parent_view}>
      <ModalGoBackHeader />
      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        <MainDetails />
        <WalletPie />
        <AccordianPortfolio />
        <BottomSpacer height={50} />
      </Animated.ScrollView>
    </View>
  );
}

export default MyProfileScreen;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    width: windowWidth,
    backgroundColor: themeHere.colors.background,
  },
  header_view_shown: {
    width: windowWidth,
    height: 30,
    marginVertical: 20,
    alignItems: 'center',
  },
  header_view_hidden: {
    width: windowWidth,
    height: 50,
    alignItems: 'center',
  },
  header_text: {
    ...themeHere.text.title_3,
    color: 'white',
  },
});
