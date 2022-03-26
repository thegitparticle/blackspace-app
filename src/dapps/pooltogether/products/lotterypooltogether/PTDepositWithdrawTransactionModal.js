// PTDepositWithdrawTransactionModal
import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions, StyleSheet, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import ConfirmWithdrawPoolTogether from './components/ConfirmWithdrawPoolTogether';
import TransactionOngoingWithdrawPoolTogether from './components/TransactionOngoingWithdrawPoolTogether';
import {useGasCostEstimate} from '../../helpers/useGasCostEstimate';
import {BigNumber} from 'ethers';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function PTDepositWithdrawTransactionModal({route, dispatch}) {
  const {withdrawAmount, balanceAmountBig} = route.params;

  const [renderScreen, setRenderScreen] = useState('ConfirmWithdraw');

  // hard-coded gas used while testing in Wei
  const DEPOSIT_GAS_AMOUNT = BigNumber.from('500000');
  const CLAIM_GAS_AMOUNT = BigNumber.from('400000');
  const WITHDRAW_GAS_AMOUNT = BigNumber.from('450000');
  const APPROVE_GAS_AMOUNT = BigNumber.from('50000');
  const APPROVE_DEPOSIT_GAS_AMOUNT = BigNumber.from('550000');

  const {
    totalGasWei: approveTotalGasWei,
    totalGasUsd: approveTotalGasUsd,
    isFetched: isApproveFetched,
    error: approveError,
  } = useGasCostEstimate(APPROVE_DEPOSIT_GAS_AMOUNT, 1);

  useEffect(() => {
    console.log(approveTotalGasWei, approveTotalGasUsd);
  }, [approveTotalGasWei]);

  function RenderBody() {
    if (renderScreen === 'TransactionOngoing') {
      return (
        <TransactionOngoingWithdrawPoolTogether
          ChangeBody={changeBodyToConfirmBorrow}
          State={state_here}
          WithdrawAmount={withdrawAmount}
          BalanceAmountBig={balanceAmountBig}
        />
      );
    } else if (renderScreen === 'ConfirmWithdraw') {
      return (
        <ConfirmWithdrawPoolTogether
          ChangeBody={changeBodyToTransaction}
          State={state_here}
          WithdrawAmount={withdrawAmount}
          BalanceAmountBig={balanceAmountBig}
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
    setRenderScreen('ConfirmDeposit');
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

export default connect(mapStateToProps)(PTDepositWithdrawTransactionModal);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
});
