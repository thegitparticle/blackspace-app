import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import EmojiIcon from '../../../../../bits/EmojiIcon';
import {useNavigation} from '@react-navigation/native';
import useEthFiatPrice from '../../../../../helpers/useEthFiatPrice';
import _ from 'lodash';

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

function ConfirmBuyUniswap(props) {
  const navigation = useNavigation();
  const {loadingEth, priceEth} = useEthFiatPrice();

  const [renderContext, setRenderContext] = useState('Checking');
  /*
    Checking | WalletHasAmount | WalletHasNoGas | NoAmount
   */

  let allErcBalances = props.State.MyTokenBalancesReducer.tokens;

  let ethBalanceInWallet =
    Number(props.State.MyProfileReducer.myProfileDetails.eth_balance) *
    10 ** -18;

  const gas = 100; // (in $)

  const [erc20Balance, setERC20Balance] = useState(0);
  const [erc20BalanceObject, setERC20BalanceObject] = useState(null);

  function grabERC20Balance() {
    const x = _.findIndex(allErcBalances, {symbol: props.Token0Coin.symbol});

    if (x > 0) {
      setERC20BalanceObject(allErcBalances[x]);
      setERC20Balance(Number(allErcBalances[x].tokenBalance_decimal));
    } else {
      setERC20BalanceObject({});
      setERC20Balance(0);
    }
  }

  function checkIfWalletHasBalance() {
    if (props.Token0Coin.symbol === 'ETH') {
      if (Number(props.Token0Amount) < Number(ethBalanceInWallet)) {
        setRenderContext('WalletHasAmount');
      } else {
        setRenderContext('NoAmount');
      }
    } else {
      if (Number(props.Token0Amount) < Number(erc20Balance)) {
        if (gas < Number(ethBalanceInWallet) * Number(priceEth)) {
          setRenderContext('WalletHasAmount');
        } else {
          setRenderContext('WalletHasNoGas');
        }
      } else {
        setRenderContext('NoAmount');
      }
    }
  }

  useEffect(() => {
    if (props.Token0Coin.symbol !== 'ETH') {
      grabERC20Balance();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      checkIfWalletHasBalance();
    }, 100);
  }, [erc20Balance, priceEth]);

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
            checking your wallet for balances
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletHasAmount') {
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
            your wallet does have {props.Token0Coin.symbol}, reduce amount and
            try again
          </Text>
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
    } else if (renderContext === 'WalletHasAmount') {
      // } else if (renderContext === 'NoAmount') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'confirm buy'}
            type={'solid'}
            onPress={() => {
              navigation.navigate('Swap0xTxnScreen', {
                Token0Coin: props.Token0Coin,
                Token1Coin: props.Token1Coin,
                Token0Amount: props.Token0Amount,
                Token1Amount: props.Token1Amount,
                Token1Fiat: props.Token1Fiat,
                Amount: props.Amount,
                MemeCoinSwap: false,
              });
            }}
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
    } else if (renderContext === 'WalletHasNoGas') {
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

export default ConfirmBuyUniswap;

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
