// PTDepositWithdrawTransactionModal
import React, {useState} from 'react';
import {Appearance, Dimensions, StyleSheet, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import TransactionOngoingDepositPoolTogether from './components/TransactionOngoingDepositPoolTogether';
import ConfirmDepositPoolTogether from './components/ConfirmDepositPoolTogether';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function PTDepositWithdrawTransactionModal({route, dispatch}) {
  const {withdrawAmount} = route.params;

  const [renderScreen, setRenderScreen] = useState('TransactionOngoing');

  function RenderBody() {
    if (renderScreen === 'TransactionOngoing') {
      return (
        <TransactionOngoingDepositPoolTogether
          ChangeBody={changeBodyToConfirmBorrow}
          State={state_here}
          WithdrawAmount={withdrawAmount}
        />
      );
    } else if (renderScreen === 'ConfirmWithdraw') {
      return (
        <ConfirmDepositPoolTogether
          ChangeBody={changeBodyToTransaction}
          State={state_here}
          WithdrawAmount={withdrawAmount}
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
