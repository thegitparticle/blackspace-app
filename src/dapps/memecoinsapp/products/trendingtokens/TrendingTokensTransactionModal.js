// TrendingTokensTransactionModal
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import ModalGoBackHeader from '../../../../bits/ModalGoBackHeader';
import TransactionOngoingBuyTrendingMemeCoins from './components/TransactionOngoingBuyTrendingMemeCoins';
import ConfirmBuyTrendingMemeCoins from './components/ConfirmBuyTrendingMemeCoins';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
 tokenDetails: tokenDetails,
                    name: name,
                    symbol: symbol,
                    logoUri: logoUri,
                    tokenIdString: tokenIdString,
                    contractAddress: contractAddress,
                    amountToBuy: amountToBuy,
 */

let state_here = {};

function TrendingTokensTransactionModal({route, dispatch}) {
  const {
    name,
    symbol,
    logoUri,
    tokenIdString,
    contractAddress,
    tokenDetails,
    amountToBuy,
  } = route.params;

  const [renderScreen, setRenderScreen] = useState('ConfirmBuy');

  function RenderBody() {
    if (renderScreen === 'TransactionOngoing') {
      return (
        <TransactionOngoingBuyTrendingMemeCoins
          Name={name}
          Symbol={symbol}
          LogoUri={logoUri}
          TokenIdString={tokenIdString}
          ContractAddress={contractAddress}
          TokenDetails={tokenDetails}
          AmountToBuy={amountToBuy}
          ChangeBody={changeBodyToConfirmBuy}
          State={state_here}
        />
      );
    } else if (renderScreen === 'ConfirmBuy') {
      return (
        <ConfirmBuyTrendingMemeCoins
          Name={name}
          Symbol={symbol}
          LogoUri={logoUri}
          TokenIdString={tokenIdString}
          ContractAddress={contractAddress}
          TokenDetails={tokenDetails}
          AmountToBuy={amountToBuy}
          ChangeBody={changeBodyToConfirmBuy}
          State={state_here}
        />
      );
    } else {
      return <View />;
    }
  }

  function changeBodyToTransaction() {
    setRenderScreen('TransactionOngoing');
  }

  function changeBodyToConfirmBuy() {
    setRenderScreen('ConfirmBuy');
  }

  return (
    <View style={styles.parent_view}>
      <ModalGoBackHeader title={''} />
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
