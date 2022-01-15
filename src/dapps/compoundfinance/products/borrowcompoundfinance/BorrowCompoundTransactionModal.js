// BorrowCompoundTransactionModal
import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import ModalGoBackHeader from '../../../../bits/ModalGoBackHeader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function BorrowCompoundTransactionModal({route, dispatch}) {
  const {info} = route.params;

  return (
    <View style={styles.parent_view}>
      <ModalGoBackHeader title={`Borrow ${info.cToken[0].underlying_symbol}`} />
      <Text>...</Text>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(BorrowCompoundTransactionModal);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
});
