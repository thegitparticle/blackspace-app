// BuyTokensUniswapTransactionModal
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import ModalGoBackHeader from '../../../../bits/ModalGoBackHeader';
import ConfirmBuyUniswap from './components/ConfirmBuyUniswap';
import TransactionOngoingBuyUniswap from './components/TransactionOngoingBuyUniswap';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function BuyTokensUniswapTransactionModal({route, dispatch}) {
  const {
    token0Coin,
    token1Coin,
    token1Amount,
    token1Fiat,
    lpDetails,
    token0Amount,
  } = route.params;

  const [renderScreen, setRenderScreen] = useState('ConfirmBorrow');

  const [amount, setAmount] = useState('0');
  const [collNeededFiat, setCollNeededFiat] = useState('0');

  function RenderBody() {
    if (renderScreen === 'TransactionOngoing') {
      return (
        <TransactionOngoingBuyUniswap
          // Info={info}
          Token0Coin={token0Coin}
          Token1Coin={token1Coin}
          Token0Amount={token0Amount}
          Token1Amount={token1Amount}
          Token1Fiat={token1Fiat}
          ChangeBody={changeBodyToEnterAmount}
          State={state_here}
        />
      );
    } else if (renderScreen === 'ConfirmBorrow') {
      return (
        <ConfirmBuyUniswap
          // Info={info}
          Token0Coin={token0Coin}
          Token1Coin={token1Coin}
          Token0Amount={token0Amount}
          Token1Amount={token1Amount}
          Token1Fiat={token1Fiat}
          ChangeBody={changeBodyToTransaction}
          State={state_here}
          Amount={amount}
          walletReducer={state_here.WDeetsReducer.wdeets}
          lpDetails={lpDetails}
        />
      );
    } else {
      return <></>;
    }
  }

  function changeBodyToTransaction() {
    setRenderScreen('TransactionOngoing');
  }

  function changeBodyToEnterAmount() {
    // setRenderScreen('EnterAmount');
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

export default connect(mapStateToProps)(BuyTokensUniswapTransactionModal);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
});
