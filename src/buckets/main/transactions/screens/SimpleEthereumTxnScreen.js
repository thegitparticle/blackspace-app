import React from 'react';
import {StyleSheet, Dimensions, Appearance} from 'react-native';
import {View, Text} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

// transaction to send ETH from one wallet to another
function SimpleEthereumTxnScreen() {
  return (
    <View sx={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text sx={{color: 'white'}}>Do the simple eth txn!</Text>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SimpleEthereumTxnScreen);
