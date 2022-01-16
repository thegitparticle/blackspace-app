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

  const [renderContext, setRenderContext] = useState('Checking');

  function MainBlock() {
    if (renderContext === 'Checking') {
      return (
        <View style={styles.main_block_view}>
          <Text style={styles.enter_amount_text_symbol}>
            checking
            <Text style={styles.enter_amount_text_fiat}>= $5000 (approx)</Text>
          </Text>
        </View>
      );
    } else if (renderContext === 'CompoundHasColl') {
      return (
        <View style={styles.main_block_view}>
          <Text style={styles.enter_amount_text_symbol}>
            CompoundHasColl
            <Text style={styles.enter_amount_text_fiat}>= $5000 (approx)</Text>
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletHasColl') {
      return (
        <View style={styles.main_block_view}>
          <Text style={styles.enter_amount_text_symbol}>
            WalletHasColl
            <Text style={styles.enter_amount_text_fiat}>= $5000 (approx)</Text>
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletNeedsSwap') {
      return (
        <View style={styles.main_block_view}>
          <Text style={styles.enter_amount_text_symbol}>
            WalletNeedsSwap
            <Text style={styles.enter_amount_text_fiat}>= $5000 (approx)</Text>
          </Text>
        </View>
      );
    } else if (renderContext === 'NoColl') {
      return (
        <View style={styles.main_block_view}>
          <Text style={styles.enter_amount_text_symbol}>
            NoColl
            <Text style={styles.enter_amount_text_fiat}>= $5000 (approx)</Text>
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
  enter_amount_text_symbol: {
    ...themeHere.text.header,
    color: themeHere.colors.foreground,
  },
  enter_amount_text_fiat: {
    ...themeHere.text.header,
    color: themeHere.colors.foreground + '75',
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
