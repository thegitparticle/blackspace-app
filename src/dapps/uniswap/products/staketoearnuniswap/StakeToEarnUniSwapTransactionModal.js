// StakeToEarnUniSwapTransactionModal
import React, { useState } from "react";
import { Appearance, Dimensions, StyleSheet, View } from "react-native";
import { ButterThemeDark, ButterThemeLight } from "../../../../theme/ButterTheme";
import { connect } from "react-redux";
import ModalGoBackHeader from "../../../../bits/ModalGoBackHeader";
import TransactionOngoingStakeUniSwap from "./components/TransactionOngoingStakeUniSwap";
import ConfirmStakeUniSwap from "./components/ConfirmStakeUniSwap";
import EnterAmountStakeUniSwap from "./components/EnterAmountStakeUniSwap";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function StakeToEarnUniSwapTransactionModal({route, dispatch}) {
  const {info, lpStakeDetails} = route.params;

  const [renderScreen, setRenderScreen] = useState('EnterAmount');

  const [amount0, setAmount0] = useState('0');
  const [amount1, setAmount1] = useState('0');
  const [collNeededFiat, setCollNeededFiat] = useState('0');

  function RenderBody() {
    if (renderScreen === 'TransactionOngoing') {
      return (
        <TransactionOngoingStakeUniSwap
          Info={info}
          LPStakeDetails={lpStakeDetails}
          ChangeBody={changeBodyToEnterAmount}
          State={state_here}
          Token0Amount={amount0}
          Token1Amount={amount1}
        />
      );
    } else if (renderScreen === 'ConfirmStake') {
      return (
        <ConfirmStakeUniSwap
          Info={info}
          LPStakeDetails={lpStakeDetails}
          ChangeBody={changeBodyToTransaction}
          State={state_here}
          Token0Amount={amount0}
          Token1Amount={amount1}
        />
      );
    } else {
      return (
        <EnterAmountStakeUniSwap
          Info={info}
          LPStakeDetails={lpStakeDetails}
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

  function changeBodyToConfirmEarn(amount0, amount1, collNeededFiat) {
    setRenderScreen('ConfirmStake');
    setAmount0(amount0);
    setAmount1(amount1);
    setCollNeededFiat(collNeededFiat);
  }

  return (
    <View style={styles.parent_view}>
      <ModalGoBackHeader
        title={`Stake in ${lpStakeDetails.token0.symbol} - ${lpStakeDetails.token1.symbol}`}
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
