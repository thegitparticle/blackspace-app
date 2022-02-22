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
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

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

function TransactionOngoingBuyTrendingMemeCoins(props) {
  const navigation = useNavigation();
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

  const myProfileDetails = props.State.MyProfileReducer.myProfileDetails;

  let ethTokenObject = {
    name: 'Ethereum',
    symbol: 'ETH',
    logoURI:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    tokenBalance_decimal: Number(myProfileDetails.eth_balance),
    token_price_usd: Number(myProfileDetails.eth_balance) * priceEth,
  };

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

  // console.log(
  //   (Number(props.AmountToBuy) * Number(props.TokenDetails.usd)) /
  //     Number(priceEth),
  // );
  //
  // console.log(props.AmountToBuy);
  // console.log(ethTokenObject);
  // console.log({address: props.ContractAddress});
  // console.log(props.lpDetails);

  useEffect(() => {
    if (Number(priceEth) > 10) {
      ExecuteASwap(
        (Number(props.AmountToBuy) * Number(props.TokenDetails.usd)) /
          Number(priceEth),
        props.AmountToBuy,
        ethTokenObject,
        {address: props.ContractAddress},
        props.lpDetails,
        props.State.WDeetsReducer.wdeets.wallet_address,
        props.State.WDeetsReducer.wdeets.wallet_privateKey,
        changeTxHash,
      );
    }
  }, [priceEth]);

  useEffect(() => {
    console.log(txHash + 'tx hash via callback function');
    setTimeout(() => {
      navigation.goBack();
    }, 60000);
  }, [txHash]);

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
