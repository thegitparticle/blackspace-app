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

function TransactionOngoingBuyTrendingMemeCoins(props) {
  const navigation = useNavigation();

  const [renderContext, setRenderContext] = useState('TransactionHappening');
  // All render states: TransactionHappening | TransactionSuccess | TransactionError

  // until the api from server adds decimals field to tokens use this default value
  let decimals = 18;

  // Fetching swap quote from 0x. Buytoken - token1 and sell - token0.
  // const {loading0xSwapQuote, quoteDetails0x, quoteDetails0xRaw} =
  //   use0xSwapQuote('ETH', props.ContractAddress, props.AmountToBuy, decimals, props.State.WDeetsReducer.wdeets.wallet_address,);

  // Fetching swap quote from 0x. Buytoken - token1 and sell - token0 - ON TESTNET
  const {loading0xSwapQuote, quoteDetails0x, quoteDetails0xRaw} =
    use0xSwapQuote(
      'ETH',
      'DAI',
      props.AmountToBuy,
      decimals,
      props.State.WDeetsReducer.wdeets.wallet_address,
    );

  async function Swap() {
    // let wallet = new ethers.Wallet(
    //   props.State.WDeetsReducer.wdeets.wallet_privateKey,
    // );
    // let walletSigner = wallet.connect(provTest);
    //
    // const signer = provTest.getSigner();
    //
    // // Fetch quote from 0x API
    // const response = await fetch(
    //   'https://ropsten.api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&buyAmount=10000000000000000000&takerAddress=0xbd2e8c4026a3309AEb5978b51326278ffA01cb7a',
    // );
    // const quote = await response.json();
    //
    // console.log(quote);
    //
    // // sending the transaction
    // await walletSigner.sendTransaction(await quote).then(transaction => {
    //   console.log(transaction);
    //   alert('Swap finished!');
    // });

    let wallet = new ethers.Wallet(
      props.State.WDeetsReducer.wdeets.wallet_privateKey,
    );
    let walletSigner = wallet.connect(provTest);

    // Fetch quote from 0x API
    const response = await fetch(
      'https://ropsten.api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&buyAmount=10000000000000000000&takerAddress=0xbd2e8c4026a3309AEb5978b51326278ffA01cb7a',
    );
    const quote = await response.json();

    // sending the transaction
    walletSigner.sendTransaction(quote).then(transaction => {
      console.log(transaction);
      alert('Swap finished!');
    });
  }

  useEffect(() => {
    // if (quoteDetails0x) {
    Swap();
    setTimeout(() => {
      navigation.goBack();
    }, 60000);
    // }
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
