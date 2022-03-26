import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import {ethers} from 'ethers';
import LottieView from 'lottie-react-native';
import Compound from '@compound-finance/compound-js';
import {INFURA_RINKEBY} from 'react-native-dotenv';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const prov = new ethers.providers.JsonRpcProvider(
  'https://rinkeby.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

function TransactionOngoingEarnCompound(props) {
  let wallet = new ethers.Wallet(
    props.State.WDeetsReducer.wdeets.wallet_privateKey,
  );
  let walletSigner = wallet.connect(prov);

  const [renderContext, setRenderContext] = useState('TransactionHappening');

  let supplyAsset = props.Info.cToken[0].underlying_symbol;
  let compoundAsset = null;

  useEffect(() => {
    if (supplyAsset === 'ETH') {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      compoundAsset = Compound.ETH;
    } else if (supplyAsset === 'DAI') {
      compoundAsset = Compound.DAI;
    } else if (supplyAsset === 'BAT') {
      compoundAsset = Compound.BAT;
    } else if (supplyAsset === 'USDC') {
      compoundAsset = Compound.USDC;
    } else if (supplyAsset === 'USDT') {
      compoundAsset = Compound.USDT;
    } else {
      compoundAsset = null;
    }
  }, []);

  useEffect(() => {
    if (compoundAsset !== null) {
      const compound = new Compound(INFURA_RINKEBY, {
        privateKey: props.State.WDeetsReducer.wdeets.wallet_privateKey, // preferably with environment variable
      });

      (async function () {
        console.log('Supplying Asset to the Compound Protocol...');
        const trx = await compound.supply(compoundAsset, Number(props.Amount));
        console.log('Ethers.js transaction object', trx);
        setRenderContext('TransactionSuccess');
      })().catch(e => {
        setRenderContext('TransactionError');
        console.log(e);
      });
    }
  }, [compoundAsset]);

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
          Borrow process failed. Please try again & make sure you have enough
          extra ETH for gas
        </Text>
      </View>
    );
  } else {
    return <View />;
  }
}

export default TransactionOngoingEarnCompound;

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
