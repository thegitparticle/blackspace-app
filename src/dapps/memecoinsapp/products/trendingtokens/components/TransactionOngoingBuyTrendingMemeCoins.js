import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import {ethers} from 'ethers/src.ts';
import ExecuteASwap from '../../../../uniswap/helpers/ExecuteASwap';
import LottieView from 'lottie-react-native';
import useEthFiatPrice from '../../../../../helpers/useEthFiatPrice';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import use0xSwapQuote from '../../../../uniswap/helpers/use0xSwapQuote';
import Web3 from 'web3';

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
  'https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

const provTest = new ethers.providers.JsonRpcProvider(
  'https://ropsten.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

// const web3 = new Web3(
//   new Web3.providers.HttpProvider(
//     `https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca`,
//   ),
// );

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://ropsten.infura.io/v3/a2d69eb319254260ab3cef34410256ca`,
  ),
);

function TransactionOngoingBuyTrendingMemeCoins(props) {
  const navigation = useNavigation();

  const [renderContext, setRenderContext] = useState('TransactionHappening');
  // All render states: TransactionHappening | TransactionSuccess | TransactionError

  // until the api from server adds decimals field to tokens use this default value
  let decimals = 18;

  async function Swap() {
    // WEB3 JS
    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
      props.State.WDeetsReducer.wdeets.wallet_privateKey,
    );
    web3.eth.accounts.wallet.add(signer);

    // Fetch quote from 0x API
    const response = await fetch(
      `https://ropsten.api.0x.org/swap/v1/quote?sellToken=ETH&buyToken=${
        props.ContractAddress
      }&buyAmount=${
        Number(props.AmountToBuy) * 10 ** Number(decimals)
      }&takerAddress=${props.State.WDeetsReducer.wdeets.wallet_address}`,
    );
    const quote = await response.json();

    // web3 js signing transactions

    let signedTx = await web3.eth.accounts.signTransaction(
      quote,
      signer.privateKey,
    );

    // web3 js transaction sending
    web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .then(txhash => {
        console.log(txhash);
        alert('Swap sent! Tokens will appear in a minute.');
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    Swap().catch(e => console.log(e));
    setTimeout(() => {
      navigation.goBack();
    }, 60000);
  }, []);

  // if transaction is done, then this dapp can be added to users app suite
  useEffect(() => {
    axios
      .get(
        'https://suprblack.xyz/api/users/add_dapps_to_user_suite/' +
          String(props.State.UserDetailsReducer.userdetails.id) +
          '/' +
          String(2) +
          '/',
      )
      .catch(err => {
        console.log(err);
      });
  }, []);

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
