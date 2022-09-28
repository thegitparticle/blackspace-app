import React from 'react';
import {Text, View} from 'dripsy';
import {dripsytheme} from '../theme/DripsyTheme';
import LottieView from 'lottie-react-native';
import {Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export function TxnHappeningBit() {
  return (
    <View variant={'sub_view_20_margin'}>
      <LottieView
        source={require('../../assets/processing.json')}
        autoPlay
        loop
        style={{
          marginVertical: 20,
          width: windowWidth * 0.25,
          height: windowWidth * 0.5,
        }}
        resizeMode="cover"
      />
    </View>
  );
}

export function TxnSentBit() {
  return (
    <View variant={'sub_view_20_margin'}>
      <LottieView
        source={require('../../assets/success_tick_lottie.json')}
        autoPlay
        loop
        style={{
          marginVertical: 20,
          width: windowWidth * 0.25,
          height: windowWidth * 0.5,
        }}
        resizeMode="cover"
      />
    </View>
  );
}

export function TxnCancelledBit() {
  return (
    <View variant={'sub_view_20_margin'}>
      <LottieView
        source={require('../../assets/error_exclamation_lottie.json')}
        autoPlay
        loop
        style={{
          marginVertical: 20,
          width: windowWidth * 0.25,
          height: windowWidth * 0.5,
        }}
        resizeMode="cover"
      />
    </View>
  );
}
