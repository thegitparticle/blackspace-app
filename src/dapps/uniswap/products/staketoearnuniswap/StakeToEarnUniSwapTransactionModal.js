// StakeToEarnUniSwapTransactionModal
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import ModalGoBackHeader from '../../../../bits/ModalGoBackHeader';
import TransactionOngoingStakeUniSwap from './components/TransactionOngoingStakeUniSwap';
import ConfirmStakeUniSwap from './components/ConfirmStakeUniSwap';
import EnterAmountStakeUniSwap from './components/EnterAmountStakeUniSwap';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function StakeToEarnUniSwapTransactionModal({route, dispatch}) {
  const {info} = route.params;

  const [renderScreen, setRenderScreen] = useState('EnterAmount');

  const [amount, setAmount] = useState('0');
  const [collNeededFiat, setCollNeededFiat] = useState('0');

  function RenderBody() {
    if (renderScreen === 'TransactionOngoing') {
      return (
        <TransactionOngoingStakeUniSwap
          Info={info}
          ChangeBody={changeBodyToEnterAmount}
          State={state_here}
        />
      );
    } else if (renderScreen === 'ConfirmStake') {
      return (
        <ConfirmStakeUniSwap
          Info={info}
          ChangeBody={changeBodyToTransaction}
          State={state_here}
          Amount={amount}
          CollNeededFiat={collNeededFiat}
        />
      );
    } else {
      return (
        <EnterAmountStakeUniSwap
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
    setRenderScreen('ConfirmStake');
    setAmount(amount);
    setCollNeededFiat(collNeededFiat);
  }

  return (
    <View style={styles.parent_view}>
      <ModalGoBackHeader
        title={`Stake & Earn ${info.token0_symbol} - ${info.token1_symbol}`}
      />
      <RenderBody />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(StakeToEarnUniSwapTransactionModal);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
});
