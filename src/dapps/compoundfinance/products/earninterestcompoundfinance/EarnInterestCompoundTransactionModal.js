import React, {useState} from 'react';
import {Appearance, Dimensions, StyleSheet, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import ModalGoBackHeader from '../../../../bits/ModalGoBackHeader';
import TransactionOngoingEarnCompound from './components/TransactionOngoingEarnCompound';
import ConfirmEarnCompound from './components/ConfirmEarnCompound';
import EnterAmountEarnCompound from './components/EnterAmountEarnCompound';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
ChangeBody={changeBodyToTransaction}
          State={state_here}
          BorrowAmount={borrowAmount}
          CollateralNeededEth={collateralNeededEth}
          FixedLoanCharges={fixedLoanCharges}
 */

let state_here = {};

function EarnInterestCompoundTransactionModal({route, dispatch}) {
  const {info} = route.params;

  const [renderScreen, setRenderScreen] = useState('EnterAmount');

  const [amount, setAmount] = useState('0');

  function RenderBody() {
    if (renderScreen === 'TransactionOngoing') {
      return (
        <TransactionOngoingEarnCompound
          Info={info}
          ChangeBodyEnterAmount={changeBodyToEnterAmount}
          State={state_here}
          Amount={amount}
        />
      );
    } else if (renderScreen === 'ConfirmEarn') {
      return (
        <ConfirmEarnCompound
          Info={info}
          ChangeBodyTransaction={changeBodyToTransaction}
          ChangeBodyEnterAmount={changeBodyToEnterAmount}
          State={state_here}
          Amount={amount}
        />
      );
    } else {
      return (
        <EnterAmountEarnCompound
          Info={info}
          ChangeBody={changeBodyToConfirmEarn}
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

  function changeBodyToConfirmEarn(amount, collNeededFiat) {
    setRenderScreen('ConfirmEarn');
    setAmount(amount);
  }

  return (
    <View style={styles.parent_view}>
      <ModalGoBackHeader title={`Earn ${info.cToken[0].underlying_symbol}`} />
      <RenderBody />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(EarnInterestCompoundTransactionModal);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
});
