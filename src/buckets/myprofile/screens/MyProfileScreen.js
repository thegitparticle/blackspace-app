import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Text, View, Image} from 'dripsy';
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
import {GetMarketPrices} from '../../../redux/appcore/MarketPricesActions';
import {connect} from 'react-redux';
import {GetMyProfileDetails} from '../../../redux/appcore/MyProfileActions';
import {GetTokenBalances} from '../../../redux/appcore/MyTokenBalancesActions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function MyProfileScreen({dispatch}) {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(GetMyProfileDetails(state_here.UserDetailsReducer.userdetails.id));
    dispatch(
      GetTokenBalances(
        state_here.UserDetailsReducer.userdetails.wallet_address,
      ),
    );
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View variant="layout.full_screen">
      <ModalGoBackHeader />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <MainDetails />
        <WalletPie />
        <AccordianPortfolio />
        <BottomSpacer height={50} />
      </Animated.ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MyProfileScreen);
