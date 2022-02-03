import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import LottieView from 'lottie-react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function TransactionOngoingBorrowLiquity() {
  return (
    <View style={styles.parent_view}>
      <Text style={styles.text_highlighted}>
        Keep phone aside and relax while we finish the borrowing process
      </Text>
      <LottieView
        source={require('../../../../../../assets/doge_tail_lottie.json')}
        autoPlay
        loop
        style={{
          marginVertical: 20,
          width: windowWidth * 0.25,
          height: windowWidth * 0.5,
        }}
        resizeMode="cover"
      />
      <Text style={styles.text_highlighted}>it will take about a minute</Text>
    </View>
  );
}

export default TransactionOngoingBorrowLiquity;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_highlighted: {
    ...themeHere.text.header,
    color: themeHere.colors.foreground,
    marginVertical: 30,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
    lineHeight: 30,
  },
  text_not_highlighted: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginVertical: 30,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
    lineHeight: 30,
  },
});
