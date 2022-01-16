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

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
1. checks if the wallet has enough collateral?
-> checking your wallet for collateral - must come when this happens
2. if compound already has the free collateral - then, show this much is there - extra needed? do wallet check - if not
compound supply exists - then perform full wallet check
3. if yes in wallet : then show - coll of this much will be deducted from account
4. if no in wallet : you do not have enough collateral in wallet - go back button show

All states of this component
a. "Checking" - checking your compound history and wallet balances to assess collateral - useEffect runs during this time
b. "CompoundHasColl" - your compound finance account has the needed collateral - you can borrow <amount><token_symbol> now
c. "WalletHasColl" - your have the needed collateral in <symbol> - you can borrow <amount><token_symbol> now
d. "WalletNeedsSwap" - you have collateral amount in wallet in unsupported coins - convert them to either of these - give those 5 options
e. "NoColl" - you do not have the needed collateral - reduce the borrow accordingly

 */

function ConfirmBorrowCompound(props) {
  useEffect(() => {
    (async function () {
      const account = await Compound.api.account({
        addresses: props.State.WDeetsReducer.wdeets.wallet_address,
        network: 'ropsten',
      });

      let daiBorrowBalance = 0;
      if (Object.isExtensible(account) && account.accounts) {
        account.accounts.forEach(acc => {
          acc.tokens.forEach(tok => {
            if (tok.symbol === Compound.cDAI) {
              daiBorrowBalance = +tok.borrow_balance_underlying.value;

              // 1. check if props.CollNeededFiat is > or < than this borrowbalance here
              // 2.1. if compound itself has the needed coll - then
              // 2.2. else balance is not fully there - then check wallet balances and see if it works
            }
          });
        });
      }

      console.log('daiBorrowBalance', daiBorrowBalance);
    })().catch(console.error);
  }, []);

  const [renderContext, setRenderContext] = useState('WalletHasColl');

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
            checking your compound history & wallet to assess collateral
          </Text>
        </View>
      );
    } else if (renderContext === 'CompoundHasColl') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.success_green_dark}
            size={80}
            emoji={'👍'}
          />
          <Text style={styles.text_highlighted}>
            your Compound account has the collateral needed
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletHasColl') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.success_green_dark}
            size={80}
            emoji={'👍'}
          />
          <Text style={styles.text_highlighted}>
            your wallet has the collateral needed
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletNeedsSwap') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.danger_red}
            size={80}
            emoji={'⚠️'}
          />
          <Text style={styles.text_highlighted}>
            your wallet has collateral in unsupported coins
          </Text>
          <View style={styles.unsupported_coins_context_suggestions_view}>
            <Text style={styles.text_not_highlighted}>
              convert your balances into these supported coins shown below and
              try again
            </Text>
            <View style={styles.supported_coins_view}>
              <TokenWithIconBadge
                symbol={'DAI'}
                icon={
                  'https://assets.coingecko.com/coins/images/9956/thumb/4943.png'
                }
              />
              <TokenWithIconBadge
                symbol={'DAI'}
                icon={
                  'https://assets.coingecko.com/coins/images/9956/thumb/4943.png'
                }
              />
              <TokenWithIconBadge
                symbol={'DAI'}
                icon={
                  'https://assets.coingecko.com/coins/images/9956/thumb/4943.png'
                }
              />
            </View>
            <View style={styles.supported_coins_view}>
              <TokenWithIconBadge
                symbol={'DAI'}
                icon={
                  'https://assets.coingecko.com/coins/images/9956/thumb/4943.png'
                }
              />
              <TokenWithIconBadge
                symbol={'DAI'}
                icon={
                  'https://assets.coingecko.com/coins/images/9956/thumb/4943.png'
                }
              />
            </View>
          </View>
        </View>
      );
    } else if (renderContext === 'NoColl') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.danger_red}
            size={80}
            emoji={'⚠️'}
          />
          <Text style={styles.text_highlighted}>
            your wallet does have enough collateral, reduce borrow amount and
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
            title={'borrow'}
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
    } else if (renderContext === 'CompoundHasColl') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'borrow'}
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
    } else if (renderContext === 'WalletHasColl') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'borrow'}
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
    } else if (renderContext === 'WalletNeedsSwap') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'borrow'}
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
    } else if (renderContext === 'NoColl') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'borrow'}
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

export default ConfirmBorrowCompound;

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
