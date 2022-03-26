import React, { useState } from "react";
import { Appearance, Dimensions, StyleSheet, View } from "react-native";
import { ButterThemeDark, ButterThemeLight } from "../../../../theme/ButterTheme";
import { connect } from "react-redux";
import ConfirmAddCollLiquity from "./components/ConfirmAddCollLiquity";
import TransactionOngoingAddCollLiquity from "./components/TransactionOngoingAddCollLiquity";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function AddCollTransactionModal({route, dispatch}) {
  const {collAmount} = route.params;

  const [renderScreen, setRenderScreen] = useState('ConfirmBorrow');

  function RenderBody() {
    if (renderScreen === 'TransactionOngoing') {
      return (
        <TransactionOngoingAddCollLiquity
          ChangeBody={changeBodyToConfirmBorrow}
          State={state_here}
          CollateralNeededEth={collAmount}
        />
      );
    } else if (renderScreen === 'ConfirmBorrow') {
      return (
        <ConfirmAddCollLiquity
          ChangeBody={changeBodyToTransaction}
          State={state_here}
          CollateralNeededEth={collAmount}
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

export default connect(mapStateToProps)(AddCollTransactionModal);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
});
