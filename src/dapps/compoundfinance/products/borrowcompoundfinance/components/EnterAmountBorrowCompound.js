import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import Compound from '@compound-finance/compound-js';
import useGetFiatPrice from '../../../../../helpers/useGetFiatPrices';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function EnterAmountBorrowCompound(props) {
  const [amount, setAmount] = useState('0');

  let tokenID = '';

  if (props.Symbol === 'ETH') {
    tokenID = 'ethereum';
  } else if (props.Symbol === 'DAI') {
    tokenID = 'dai';
  } else if (props.Symbol === 'BAT') {
    tokenID = 'basic-attention-token';
  } else if (props.Symbol === 'USDC') {
    tokenID = 'usd-coin';
  } else if (props.Symbol === 'USDT') {
    tokenID = 'tether';
  } else {
    tokenID = '';
  }

  const {loadingGetAnyFiat, priceAnyFiat} = useGetFiatPrice(tokenID);

  return (
    <View style={styles.parent_view}>
      <View style={styles.top_part_view}>
        <Text></Text>
        <Text style={styles.enter_amount_text}>
          {amount}{' '}
          <Text style={styles.enter_amount_text_symbol}>
            {props.Info.cToken[0].underlying_symbol}{' '}
            <Text style={styles.enter_amount_text_fiat}></Text>
          </Text>
        </Text>
        <View>
          <Text style={styles.collateral_text}>
            collateral needed ~ $
            {(
              Number(priceAnyFiat) *
              Number(amount) *
              (100 / Number(props.Info.cToken[0].collateral_factor.value * 100))
            ).toFixed(4)}{' '}
            (approx)
          </Text>
          <Button
            title={'borrow'}
            type={'solid'}
            onPress={() =>
              props.ChangeBody(
                amount,
                5000 *
                  (100 /
                    Number(props.Info.cToken[0].collateral_factor.value * 100)),
              )
            }
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
      </View>
      <View style={styles.bottom_part_view}>
        <VirtualKeyboard
          color="white"
          pressMode="string"
          decimal={true}
          onPress={val => setAmount(val)}
          style={styles.keyboard_overall}
          cellStyle={styles.keyboard_cell}
        />
      </View>
    </View>
  );
}

export default EnterAmountBorrowCompound;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
  },
  top_part_view: {
    width: windowWidth,
    height: (windowHeight - 75) / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  collateral_text: {
    ...themeHere.text.header,
    color: themeHere.colors.foreground + '75',
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
  bottom_part_view: {
    width: windowWidth,
    height: (windowHeight - 75) / 2,
  },
  keyboard_overall: {
    width: windowWidth,
    marginHorizontal: 0,
    marginLeft: 0,
  },
  keyboard_cell: {
    paddingVertical: 10,
  },
});
