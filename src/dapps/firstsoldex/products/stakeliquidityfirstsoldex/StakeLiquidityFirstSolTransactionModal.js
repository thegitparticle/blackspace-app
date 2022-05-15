import React, {useState} from 'react';
import {Appearance, Dimensions, StyleSheet, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import ModalGoBackHeader from '../../../../bits/ModalGoBackHeader';
import EnterAmountStakeFirstSolDex from './components/EnterAmountStakeFirstSolDex';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function StakeLiquidityFirstSolTransactionModal({route, dispatch}) {
  const {info, poolDetails} = route.params;

  const [renderScreen, setRenderScreen] = useState('EnterAmount');

  const [amount0, setAmount0] = useState('0');
  const [amount1, setAmount1] = useState('0');
  const [collNeededFiat, setCollNeededFiat] = useState('0');

  function RenderBody() {
    // if (renderScreen === 'TransactionOngoing') {
    //   return (
    //     <TransactionOngoingStakeUniSwap
    //       Info={info}
    //       LPStakeDetails={lpStakeDetails}
    //       ChangeBody={changeBodyToEnterAmount}
    //       State={state_here}
    //       Token0Amount={amount0}
    //       Token1Amount={amount1}
    //     />
    //   );
    // } else if (renderScreen === 'ConfirmStake') {
    //   return (
    //     <ConfirmStakeUniSwap
    //       Info={info}
    //       LPStakeDetails={lpStakeDetails}
    //       ChangeBody={changeBodyToTransaction}
    //       State={state_here}
    //       Token0Amount={amount0}
    //       Token1Amount={amount1}
    //     />
    //   );
    // } else {
    return (
      <EnterAmountStakeFirstSolDex
        Info={info}
        PoolDetails={poolDetails}
        ChangeBody={changeBodyToConfirmEarn}
        State={state_here}
      />
    );
    // }
  }

  function changeBodyToTransaction() {
    setRenderScreen('TransactionOngoing');
  }

  function changeBodyToEnterAmount() {
    setRenderScreen('EnterAmount');
  }

  function changeBodyToConfirmEarn(amount0, amount1, collNeededFiat) {
    setRenderScreen('ConfirmStake');
    setAmount0(amount0);
    setAmount1(amount1);
    setCollNeededFiat(collNeededFiat);
  }

  return (
    <View style={styles.parent_view}>
      <ModalGoBackHeader
        title={`Stake in ${poolDetails.tokenA_symbol} - ${poolDetails.tokenB_symbol}`}
      />
      <RenderBody />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(StakeLiquidityFirstSolTransactionModal);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
});
