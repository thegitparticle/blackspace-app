import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import {ethers} from 'ethers/src.ts';
import ExecuteASwap from '../../../../uniswap/helpers/ExecuteASwap';
import LottieView from 'lottie-react-native';
import useEthFiatPrice from '../../../../../helpers/useGetEthFiatPrice';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
 Name={name}
          Symbol={symbol}
          LogoUri={logoUri}
          TokenIdString={tokenIdString}
          ContractAddress={contractAddress}
          TokenDetails={tokenDetails}
          AmountToBuy={amountToBuy}
          ChangeBody={changeBodyToConfirmBuy}
          State={state_here}


 */

const prov = new ethers.providers.JsonRpcProvider(
  'https://rinkeby.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

function TransactionOngoingBuyTrendingMemeCoins(props) {
  const {loadingEth, priceEth} = useEthFiatPrice();

  let wallet = new ethers.Wallet(
    props.State.WDeetsReducer.wdeets.wallet_privateKey,
  );
  let walletSigner = wallet.connect(prov);

  const [renderContext, setRenderContext] = useState('TransactionHappening');
  // All render states: TransactionHappening | TransactionSuccess | TransactionError

  const [txHash, setTxHash] = useState(null);

  function changeTxHash(hash) {
    setTxHash(hash);
  }

  /*
  props.Token0Amount,
      props.Token1Amount,
      props.Token0Coin,
      props.Token1Coin,
      props.lpDetails,
      props.walletReducer.wallet_address,
      props.walletReducer.wallet_privateKey,
      changeTxHash,
   */

  useEffect(() => {
    ExecuteASwap(
      (Number(props.AmountToBuy) * Number(props.TokenDetails.usd)) /
        Number(priceEth),
      props.Token1Amount,
      props.Token0Coin,
      props.Token1Coin,
      props.lpDetails,
      props.State.WDeetsReducer.wallet_address,
      props.State.WDeetsReducer.wallet_privateKey,
      changeTxHash,
    );
  }, [priceEth]);

  useEffect(() => {
    console.log(txHash + 'tx hash via callback function');
  }, [txHash]);

  if (renderContext === 'TransactionHappening') {
    return (
      <View style={styles.parent_view}>
        <Text style={styles.text_highlighted}>
          Keep phone aside and relax while we finish the borrowing process
        </Text>
        <LottieView
          source={require('../../../../../../assets/doge_tail_lottie.json')}
          autoPlay
          loop
          style={{
            marginVertical: 20,
            width: windowWidth * 0.25,
            height: windowWidth * 0.5,
          }}
          resizeMode="cover"
        />
        <Text style={styles.text_highlighted}>it will take about a minute</Text>
      </View>
    );
  } else if (renderContext === 'TransactionSuccess') {
    return (
      <View style={styles.parent_view}>
        <LottieView
          source={require('../../../../../../assets/success_tick_lottie.json')}
          autoPlay
          loop
          style={{
            marginVertical: 20,
            width: windowWidth * 0.25,
            height: windowWidth * 0.5,
          }}
          resizeMode="cover"
        />
        <Text style={styles.text_highlighted}>
          Loan amount will reflect in your wallet in few moments
        </Text>
      </View>
    );
  } else if (renderContext === 'TransactionError') {
    return (
      <View style={styles.parent_view}>
        <Text style={styles.text_highlighted}>Borrow transaction failed</Text>
        <LottieView
          source={require('../../../../../../assets/error_exclamation_lottie.json')}
          autoPlay
          style={{
            marginVertical: 20,
            width: windowWidth * 0.2,
            height: windowWidth * 0.2,
            marginBottom: 100,
          }}
          resizeMode="cover"
        />
        <Text style={styles.text_highlighted}>
          Please try again & make sure you have enough extra ETH for gas
        </Text>
      </View>
    );
  } else {
    return <View />;
  }
}

export default TransactionOngoingBuyTrendingMemeCoins;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_highlighted: {
    ...themeHere.text.header,
    color: themeHere.colors.foreground,
    marginVertical: 30,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
    lineHeight: 30,
  },
  text_not_highlighted: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginVertical: 30,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
    lineHeight: 30,
  },
});
