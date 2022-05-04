// ConfirmDepositPoolTogether
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
import useUSDCFiatPrice from '../../../helpers/useUSDCFiatPrice';
import _ from 'lodash';
import {BigNumber} from 'ethers';
import {useGasCostEstimate} from '../../../helpers/useGasCostEstimate';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
          ChangeBody={changeBodyToTransaction}
          State={state_here}
          DepositAmount={depositAmount}
 */

function ConfirmDepositPoolTogether(props) {
  const navigation = useNavigation();

  const [renderContext, setRenderContext] = useState('Checking');
  /*
    All render states: Checking | WalletHasAmount (usdc and gas) | WalletHasNoUSDCButOthers | WalletHasNoGas | NoAmount
   */

  let allErcBalances = props.State.MyTokenBalancesReducer.tokens;

  let ethBalanceInWallet =
    Number(props.State.MyProfileReducer.myProfileDetails.eth_balance) *
    10 ** -18;
  const {loadingEth, priceEth} = useEthFiatPrice();

  // hard-coded gas used while testing in Wei
  const DEPOSIT_GAS_AMOUNT = BigNumber.from('500000');
  const CLAIM_GAS_AMOUNT = BigNumber.from('400000');
  const WITHDRAW_GAS_AMOUNT = BigNumber.from('450000');
  const APPROVE_GAS_AMOUNT = BigNumber.from('50000');
  const APPROVE_DEPOSIT_GAS_AMOUNT = BigNumber.from('550000');

  const {totalGasWei, totalGasUsd, isApproveFetched} = useGasCostEstimate(
    APPROVE_DEPOSIT_GAS_AMOUNT,
    1,
  );

  const [usdcBalance, setUSDCBalance] = useState(0);
  const [usdcBalanceObject, setUSDCBalanceObject] = useState(null);

  const {loadingPriceUSDC, priceUSDC} = useUSDCFiatPrice();

  function grabUSDCBalance() {
    const x = _.findIndex(allErcBalances, {symbol: 'VIBE'});

    if (x > 0) {
      setUSDCBalanceObject(allErcBalances[x]);
      setUSDCBalance(Number(allErcBalances[x].tokenBalance_decimal));
    } else {
      setUSDCBalanceObject({});
      setUSDCBalance(0);
    }
  }

  function checkIfWalletHasBalance() {
    if (Number(props.DepositAmount) < usdcBalance) {
      if (
        Number(totalGasUsd) * 10 ** -18 <
        Number(ethBalanceInWallet) * Number(priceEth)
      ) {
        setRenderContext('WalletHasAmount');
      } else {
        setRenderContext('WalletHasNoGas');
      }
    } else if (
      Number(props.DepositAmount) * Number(priceUSDC) <
      Number(props.State.MyProfileReducer.myProfileDetails.portfolio_value)
    ) {
      setRenderContext('WalletHasNoETHButERCs');
    } else {
      setRenderContext('NoAmount');
    }
  }

  useEffect(() => {
    grabUSDCBalance();
  }, []);

  useEffect(() => {
    checkIfWalletHasBalance();
  }, [usdcBalance]);

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
            Your wallet has enough USDC to deposit
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletHasNoUSDCButOthers') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.danger_red}
            size={80}
            emoji={'⚠️'}
          />
          <Text style={styles.text_highlighted}>
            you do not have enough USDC but have needed deposit amount in other
            tokens.
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
            your wallet does not have {props.DepositAmount} USDC to deposit,
            reduce amount and try again
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
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'confirm deposit'}
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
    } else if (renderContext === 'WalletHasNoUSDCButOthers') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'buy USDC on Uniswap'}
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

export default ConfirmDepositPoolTogether;

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
