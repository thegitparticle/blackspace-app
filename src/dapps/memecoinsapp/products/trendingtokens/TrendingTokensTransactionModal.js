// TrendingTokensTransactionModal
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import ModalGoBackHeader from '../../../../bits/ModalGoBackHeader';
import TransactionOngoingBuyTrendingMemeCoins from './components/TransactionOngoingBuyTrendingMemeCoins';
import ConfirmBuyTrendingMemeCoins from './components/ConfirmBuyTrendingMemeCoins';
import EnterAmountBuyTrendingMemeCoins from './components/EnterAmountBuyTrendingMemeCoins';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function TrendingTokensTransactionModal({route, dispatch}) {
  const {token} = route.params;

  const [renderScreen, setRenderScreen] = useState('EnterAmount');

  const [amount, setAmount] = useState('0');
  const [collNeededFiat, setCollNeededFiat] = useState('0');

  function RenderBody() {
    if (renderScreen === 'TransactionOngoing') {
      return (
        <TransactionOngoingBuyTrendingMemeCoins
          Info={token}
          ChangeBody={changeBodyToEnterAmount}
          State={state_here}
        />
      );
    } else if (renderScreen === 'ConfirmBorrow') {
      return (
        <ConfirmBuyTrendingMemeCoins
          Info={token}
          ChangeBody={changeBodyToTransaction}
          State={state_here}
          Amount={amount}
          CollNeededFiat={collNeededFiat}
        />
      );
    } else {
      return (
        <EnterAmountBuyTrendingMemeCoins
          Info={token}
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

export default connect(mapStateToProps)(TrendingTokensTransactionModal);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
});
