// TrendingTokensTransactionModal
import React, {useState} from 'react';
import {Appearance, Dimensions, StyleSheet, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import ModalGoBackHeader from '../../../../bits/ModalGoBackHeader';
import TransactionOngoingBuyTrendingMemeCoins from './components/TransactionOngoingBuyTrendingMemeCoins';
import ConfirmBuyTrendingMemeCoins from './components/ConfirmBuyTrendingMemeCoins';
import use0xSwapQuote from '../../../uniswap/helpers/use0xSwapQuote';

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

  const [quote, setQuote] = useState({});
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
          Quote={quote}
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
          ChangeBody={changeBodyToTransaction}
          State={state_here}
        />
      );
    } else {
      return <View />;
    }
  }

  function changeBodyToTransaction(quote) {
    setQuote(quote);
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