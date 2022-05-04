import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import {ethers} from 'ethers/src.ts';
import LottieView from 'lottie-react-native';
import ExecuteASwap from '../../../helpers/ExecuteASwap';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import use0xSwapQuote from '../../../helpers/use0xSwapQuote';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
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
 */

const prov = new ethers.providers.JsonRpcProvider(
  'https://rinkeby.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

const provTest = new ethers.providers.JsonRpcProvider(
  'https://ropsten.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

function TransactionOngoingBuyUniswap(props) {
  const navigation = useNavigation();

  let wallet = new ethers.Wallet(
    props.State.WDeetsReducer.wdeets.wallet_privateKey,
  );
  let walletSigner = wallet.connect(prov);

  const {loading0xSwapQuote, quoteDetails0x, quoteDetails0xRaw} =
    use0xSwapQuote(
      props.Token0Coin.contractAddress,
      props.Token1Coin.address,
      props.Token1Amount,
      props.Token1Coin.decimals,
      props.walletReducer.wallet_address,
    );

  const [renderContext, setRenderContext] = useState('TransactionHappening');
  // All render states: TransactionHappening | TransactionSuccess | TransactionError

  const [txHash, setTxHash] = useState(null);

  function changeTxHash(hash) {
    setTxHash(hash);
  }

  async function Swap() {
    let wallet = new ethers.Wallet(
      props.State.WDeetsReducer.wdeets.wallet_privateKey,
    );
    let walletSigner = wallet.connect(provTest);

    const signer = provTest.getSigner();

    // Fetch quote from 0x API
    const response = await fetch(
      'https://ropsten.api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&buyAmount=10000000000000000000&takerAddress=0xbd2e8c4026a3309AEb5978b51326278ffA01cb7a',
    );
    const quote = await response.json();

    console.log(quote);

    // sending the transaction
    await walletSigner.sendTransaction(await quote).then(transaction => {
      console.log(transaction);
      alert('Swap finished!');
    });
  }

  useEffect(() => {
    if (quoteDetails0x) {
      Swap();
      setTimeout(() => {
        navigation.goBack();
      }, 60000);
    }
  }, [quoteDetails0x]);

  useEffect(() => {
    axios
      .get(
        'https://suprblack.xyz/api/users/add_dapps_to_user_suite/' +
          String(props.State.UserDetailsReducer.userdetails.id) +
          '/' +
          String(3) +
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
          Keep phone aside and relax while we finish buying
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
          New tokens will reflect in your wallet in few moments
        </Text>
      </View>
    );
  } else if (renderContext === 'TransactionError') {
    return (
      <View style={styles.parent_view}>
        <Text style={styles.text_highlighted}>Buying transaction failed</Text>
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

export default TransactionOngoingBuyUniswap;

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
