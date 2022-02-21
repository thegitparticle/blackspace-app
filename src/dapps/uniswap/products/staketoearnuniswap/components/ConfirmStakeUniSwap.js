import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import Compound from '@compound-finance/compound-js';
import {ETH_NETWORK} from 'react-native-dotenv';
import EmojiIcon from '../../../../../bits/EmojiIcon';
import TokenWithIconBadge from '../../../../../bits/TokenWithIconBadge';
import {useNavigation} from '@react-navigation/native';
import useEthFiatPrice from '../../../../../helpers/useGetEthFiatPrice';
import _ from 'lodash';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
All states of this component
a. "Checking" - checking your wallet balances - useEffect runs during this time
c. "WalletHasEnough" - your have the needed amount in token0 + token1 - combined value needed
e. "WalletBalanceNotEnough" - you do not have the needed in wallet - reduce stake amount as per
 */

/*
 Info={info}
          LPStakeDetails={lpStakeDetails}
          ChangeBody={changeBodyToTransaction}
          State={state_here}
          Token0Amount={amount0}
          Token1Amount={amount1}
 */

function ConfirmStakeUniSwap(props) {
  const navigation = useNavigation();
  const {loadingEth, priceEth} = useEthFiatPrice();

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

  let wethTokenObject = {
    name: 'Wrapped Ethereum',
    symbol: 'WETH',
    logoURI:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    tokenBalance_decimal: Number(myProfileDetails.eth_balance),
    token_price_usd: Number(myProfileDetails.eth_balance) * priceEth,
  };

  const [renderContext, setRenderContext] = useState('Checking');

  /*
    Checking | WalletHasEnough | WalletHasLessOfTheseTokensButHasOthers | WalletHasNoGas | NoAmount
   */

  let allErcBalances = _.concat(
    props.State.MyTokenBalancesReducer.tokens,
    ethTokenObject,
    wethTokenObject,
  );

  let ethBalanceInWallet =
    Number(props.State.MyProfileReducer.myProfileDetails.eth_balance) *
    10 ** -18;

  const [t0Balance, setT0Balance] = useState(0);
  const [t0BalanceObject, setT0BalanceObject] = useState(null);

  function grabToken0Balance() {
    const x = _.findIndex(allErcBalances, {
      symbol: props.LPStakeDetails.token0.symbol,
    });

    if (x > 0) {
      setT0BalanceObject(allErcBalances[x]);
      setT0Balance(Number(allErcBalances[x].tokenBalance_decimal));
    } else {
      setT0BalanceObject({});
      setT0Balance(0);
    }
  }

  const [t1Balance, setT1Balance] = useState(0);
  const [t1BalanceObject, setT1BalanceObject] = useState(null);

  function grabToken1Balance() {
    const x = _.findIndex(allErcBalances, {
      symbol: props.LPStakeDetails.token1.symbol,
    });

    if (x > 0) {
      setT1BalanceObject(allErcBalances[x]);
      setT1Balance(Number(allErcBalances[x].tokenBalance_decimal));
    } else {
      setT1BalanceObject({});
      setT1Balance(0);
    }
  }

  const [totalFiatValueNeeded, setTotalFiatValueNeeded] = useState(); // in $
  const [totalFiatValueInWallet, setTotalFiatValueInWallet] = useState(); // in $ only token0 & token1

  function calculateTotalFiatValueNeeded() {
    let token0FiatNeeded =
      Number(props.Token0Amount) *
      Number(props.LPStakeDetails.token0.derivedETH) *
      Number(priceEth);

    let token1FiatNeeded =
      Number(props.Token1Amount) *
      Number(props.LPStakeDetails.token1.derivedETH) *
      Number(priceEth);

    setTotalFiatValueNeeded(token0FiatNeeded + token1FiatNeeded);
  }

  function calculateTotalFiatValueInWallet() {
    let token0FiatInWallet =
      Number(t0Balance) *
      Number(props.LPStakeDetails.token0.derivedETH) *
      Number(priceEth);

    let token1FiatInWallet =
      Number(t1Balance) *
      Number(props.LPStakeDetails.token1.derivedETH) *
      Number(priceEth);

    setTotalFiatValueInWallet(token0FiatInWallet + token1FiatInWallet);
  }

  const gas = 100; // (in $)

  function checkIfWalletHasBalance() {
    console.log('fiat in wall' + ' ' + totalFiatValueInWallet);
    console.log('fiat needed' + ' ' + totalFiatValueNeeded);

    if (Number(totalFiatValueInWallet) > Number(totalFiatValueNeeded)) {
      if (gas < Number(ethBalanceInWallet) * Number(priceEth)) {
        setRenderContext('WalletHasEnough');
      } else {
        setRenderContext('WalletHasNoGas');
      }
    } else {
      if (
        Number(totalFiatValueNeeded) <
        Number(props.State.MyProfileReducer.myProfileDetails.portfolio_value)
      ) {
        setRenderContext('WalletHasLessOfTheseTokensButHasOthers');
      } else {
        setRenderContext('NoAmount');
      }
    }
  }

  useEffect(() => {
    grabToken0Balance();
    grabToken1Balance();
  }, []);

  useEffect(() => {
    calculateTotalFiatValueNeeded();
    calculateTotalFiatValueInWallet();
  }, [t0Balance, t1Balance, priceEth]);

  useEffect(() => {
    checkIfWalletHasBalance();
  }, [totalFiatValueNeeded, totalFiatValueInWallet]);

  function MainBlock() {
    if (renderContext === 'Checking') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.mid_ground + '50'}
            size={80}
            emoji={'⌛'}
          />
          <Text style={styles.text_highlighted}>
            checking your wallet balances
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletHasEnough') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.success_green_dark}
            size={80}
            emoji={'👍'}
          />
          <Text style={styles.text_highlighted}>
            your wallet verification succeeded
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletHasLessOfTheseTokensButHasOthers') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.danger_red}
            size={80}
            emoji={'⚠️'}
          />
          <Text style={styles.text_highlighted}>
            your wallet does have enough amount of{' '}
            {props.LPStakeDetails.token0.symbol} or{' '}
            {props.LPStakeDetails.token1.symbol}, reduce amount and try again or
            buy the needed tokens on uniswap
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletHasNoGas') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.danger_red}
            size={80}
            emoji={'⚠️'}
          />
          <Text style={styles.text_highlighted}>
            you do not have enough ETH to pay gas
          </Text>
        </View>
      );
    } else if (renderContext === 'NoAmount') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.danger_red}
            size={80}
            emoji={'⚠️'}
          />
          <Text style={styles.text_highlighted}>
            your wallet does have enough balance, try again later
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletHasNoGas') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'buy ETH on Uniswap'}
            type={'solid'}
            onPress={() => props.ChangeBody()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [themeHere.colors.pink, themeHere.colors.pink + '90'],
            }}
          />
        </View>
      );
    } else if (renderContext === 'NoAmount') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'go back'}
            type={'solid'}
            onPress={() => navigation.goBack()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [
                themeHere.colors.danger_red_dark,
                themeHere.colors.danger_red,
              ],
            }}
          />
        </View>
      );
    } else {
      return <View />;
    }
  }

  function ButtonBlock() {
    if (renderContext === 'Checking') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'go back'}
            type={'solid'}
            onPress={() => navigation.goBack()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [themeHere.colors.mid_ground + '50'],
            }}
          />
        </View>
      );
    } else if (renderContext === 'WalletHasEnough') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'start staking process'}
            type={'solid'}
            onPress={() => props.ChangeBody()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [
                themeHere.colors.success_green_dark,
                themeHere.colors.success_green,
              ],
            }}
          />
        </View>
      );
    } else if (renderContext === 'WalletHasLessOfTheseTokensButHasOthers') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'go back'}
            type={'solid'}
            onPress={() => props.ChangeBody()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [
                themeHere.colors.danger_red_dark,
                themeHere.colors.danger_red,
              ],
            }}
          />
        </View>
      );
    } else if (renderContext === 'WalletHasNoGas') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'buy ETH on Uniswap'}
            type={'solid'}
            onPress={() => props.ChangeBody()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [themeHere.colors.pink, themeHere.colors.pink + '90'],
            }}
          />
        </View>
      );
    } else if (renderContext === 'NoAmount') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'go back'}
            type={'solid'}
            onPress={() => navigation.goBack()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [
                themeHere.colors.danger_red_dark,
                themeHere.colors.danger_red,
              ],
            }}
          />
        </View>
      );
    } else {
      return <View />;
    }
  }

  return (
    <View style={styles.parent_view}>
      <View />
      <MainBlock />
      <ButtonBlock />
    </View>
  );
}

export default ConfirmStakeUniSwap;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  main_block_view: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  enter_amount_text: {
    ...themeHere.text.title_1,
    color: themeHere.colors.foreground,
  },
  text_highlighted: {
    ...themeHere.text.header,
    color: themeHere.colors.foreground,
    marginVertical: 30,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
  },
  text_not_highlighted: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginVertical: 30,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
  },
  unsupported_coins_context_suggestions_view: {
    flexDirection: 'column',
    marginVertical: 30,
    alignItems: 'center',
  },
  supported_coins_view: {
    marginVertical: 15,
    flexDirection: 'row',
  },
  button_block_view: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  next_button_container: {
    marginVertical: 30,
    alignSelf: 'center',
  },
  next_button_style: {
    width: windowWidth * 0.5,
    height: 50,
    borderRadius: 25,
  },
  next_button_title: {
    ...themeHere.text.body_medium,
    color: 'white',
  },
});
