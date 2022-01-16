// BorrowCompoundTransactionModal
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import ModalGoBackHeader from '../../../../bits/ModalGoBackHeader';
import EnterAmountBorrowCompound from './components/EnterAmountBorrowCompound';
import ConfirmBorrowCompound from './components/ConfirmBorrowCompound';
import TransactionOngoingBorrowCompound from './components/TransactionOngoingBorrowCompound';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function BorrowCompoundTransactionModal({route, dispatch}) {
  const {info} = route.params;

  const [renderScreen, setRenderScreen] = useState('EnterAmount');

  const [amount, setAmount] = useState('0');
  const [collNeededFiat, setCollNeededFiat] = useState('0');

  function RenderBody() {
    if (renderScreen === 'TransactionOngoing') {
      return (
        <TransactionOngoingBorrowCompound
          Info={info}
          ChangeBody={changeBodyToEnterAmount}
          State={state_here}
        />
      );
    } else if (renderScreen === 'ConfirmBorrow') {
      return (
        <ConfirmBorrowCompound
          Info={info}
          ChangeBody={changeBodyToTransaction}
          State={state_here}
          Amount={amount}
          CollNeededFiat={collNeededFiat}
        />
      );
    } else {
      return (
        <EnterAmountBorrowCompound
          Info={info}
          ChangeBody={changeBodyToConfirmBorrow}
          State={state_here}
        />
      );
    }
  }

  function changeBodyToTransaction() {
    setRenderScreen('TransactionOngoing');
  }

  function changeBodyToEnterAmount() {
    setRenderScreen('EnterAmount');
  }

  function changeBodyToConfirmBorrow(amount, collNeededFiat) {
    setRenderScreen('ConfirmBorrow');
    setAmount(amount);
    setCollNeededFiat(collNeededFiat);
  }

  return (
    <View style={styles.parent_view}>
      <ModalGoBackHeader title={`Borrow ${info.cToken[0].underlying_symbol}`} />
      <RenderBody />
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
