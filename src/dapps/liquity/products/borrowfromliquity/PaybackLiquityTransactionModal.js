import React, {useState} from 'react';
import {Appearance, Dimensions, StyleSheet, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import ConfirmPaybackLiquity from './components/ConfirmPaybackLiquity';
import TransactionOngoingPaybackLiquity from './components/TransactionOngoingPaybackLiquity';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function PaybackLiquityTransactionModal({route, dispatch}) {
  const {collAmount, borrowAmount} = route.params;

  const [renderScreen, setRenderScreen] = useState('ConfirmBorrow');

  function RenderBody() {
    if (renderScreen === 'TransactionOngoing') {
      return (
        <TransactionOngoingPaybackLiquity
          ChangeBody={changeBodyToConfirmBorrow}
          State={state_here}
          CollateralNeededEth={collAmount}
          BorrowAmount={borrowAmount}
        />
      );
    } else if (renderScreen === 'ConfirmBorrow') {
      return (
        <ConfirmPaybackLiquity
          ChangeBody={changeBodyToTransaction}
          State={state_here}
          CollateralNeededEth={collAmount}
          BorrowAmount={borrowAmount}
        />
      );
    } else {
      return <></>;
    }
  }

  function changeBodyToTransaction() {
    setRenderScreen('TransactionOngoing');
  }

  function changeBodyToConfirmBorrow() {
    setRenderScreen('ConfirmBorrow');
  }

  return (
    <View style={styles.parent_view}>
      {/*<ModalGoBackHeader title={`Borrow ${info.cToken[0].underlying_symbol}`} />*/}
      <RenderBody />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(PaybackLiquityTransactionModal);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
});
