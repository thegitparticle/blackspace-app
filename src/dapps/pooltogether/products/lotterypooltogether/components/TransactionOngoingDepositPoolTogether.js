import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import LottieView from 'lottie-react-native';
import {ethers} from 'ethers/src.ts/index';
import {EthersLiquity} from '@liquity/lib-ethers';
import {LUSD_MINIMUM_DEBT} from '@liquity/lib-base';
import {PrizePoolNetwork, User} from '@pooltogether/v4-client-js';
import {mainnet} from '@pooltogether/v4-pool-data';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
 ChangeBody={changeBodyToConfirmBorrow}
          State={state_here}
          BorrowAmount={borrowAmount}
          CollateralNeededEth={collateralNeededEth}
          FixedLoanCharges={fixedLoanCharges}
 */

const prov = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

const providers = {
  1: prov,
  137: new ethers.providers.JsonRpcProvider('https://polygon-rpc.com'),
  // Avalanche
  43114: new ethers.providers.JsonRpcProvider(
    'https://api.avax.network/ext/bc/C/rpc',
  ),
};

function TransactionOngoingDepositPoolTogether(props) {
  const navigation = useNavigation();

  let wallet = new ethers.Wallet(
    props.State.WDeetsReducer.wdeets.wallet_privateKey,
  );
  let walletSigner = wallet.connect(prov);

  const PrizePoolNtk = useMemo(
    () => new PrizePoolNetwork(providers, mainnet),
    [],
  );

  const prizePool = PrizePoolNtk.getPrizePool(
    1,
    '0xd89a09084555a7D0ABe7B111b1f78DFEdDd638Be',
  );

  const user = new User(prizePool.prizePoolMetadata, walletSigner, prizePool);

  const [renderContext, setRenderContext] = useState('TransactionHappening');
  // All render states: TransactionHappening | TransactionSuccess | TransactionError

  const [isApproved, setIsApproved] = useState(null);

  const [checkForApproved, setCheckForApproved] = useState(false);

  useEffect(() => {
    (async () => {
      const {allowanceUnformatted, isApproved} =
        await user.getDepositAllowance();
      setIsApproved(isApproved);
    })();
  }, [checkForApproved]);

  useEffect(() => {
    if (isApproved === true || false) {
      console.log('not resolved');
    } else {
      if (isApproved) {
        console.log('approve resolved - and can deposit');
        (async () => {
          const txResponse = await user
            .deposit(ethers.utils.parseUnits(Number(props.DepositAmount), 6))
            .then(() => {
              setRenderContext('TransactionSuccess');
            })
            .catch(e => {
              console.log(e + ' ----- does not work');
              setRenderContext('TransactionError');
            });
          console.log(txResponse);
        })();
      } else {
        console.log('approve resolved, but can not deposit - false');
        (async () => {
          const txResponse = await user
            .approveDeposits(
              ethers.utils.parseUnits(Number(props.DepositAmount) + 1, 6),
            )
            .then(() => {
              setCheckForApproved(true);
            })
            .catch(e => {
              console.log(e + ' ----- approval does not work');
            });
          console.log(txResponse);
        })();
      }
    }
  }, [isApproved]);

  setTimeout(() => {
    navigation.goBack();
  }, 90000);

  useEffect(() => {
    axios
      .get(
        'https://suprblack.xyz/api/users/add_dapps_to_user_suite/' +
          String(props.State.UserDetailsReducer.userdetails.id) +
          '/' +
          String(4) +
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
          Deposit will reflect in your Activity in few moments
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
          Some error occurred. Please try again & make sure you have enough
          extra ETH for gas
        </Text>
      </View>
    );
  } else {
    return <View />;
  }
}

export default TransactionOngoingDepositPoolTogether;

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
