import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  TextInput,
  Animated,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {SquircleView} from 'react-native-figma-squircle';
import {Slider} from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function EarnInterestCompoundFinance() {
  const [amount, setAmount] = useState('');

  function EnterAmount() {
    return (
      <View>
        <Text style={styles.block_title}>your ETH contribution</Text>
        <SquircleView
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 7.5,
            fillColor: themeHere.colors.mid_ground + '25',
          }}
          style={styles.enter_amount_input_view}>
          <TextInput
            numberOfLines={1}
            onChangeText={setAmount}
            value={amount}
            style={styles.enter_amount_input}
            placeholder={'0.0 ETH'}
            placeholderTextColor={themeHere.colors.foreground + 50}
          />
          <Text style={styles.enter_amount_input_fiat}>{amount * 3700}</Text>
        </SquircleView>
        <View style={styles.wallet_balances_view}>
          <Text style={styles.crypto_conversion_text}>~ 1 ETH = $ 3790</Text>
          <Text style={styles.wallet_balance_text}>
            my balance: 5.1 ETH = $ 19329
          </Text>
        </View>
      </View>
    );
  }

  function AdjustLiquidationPrice() {
    const [liquidationPrice, setLiquidationPrice] = useState(2473);

    return (
      <>
        <Text style={styles.block_title}>adjust liquidation price</Text>
        <Text style={styles.liquidation_price_text}>
          {Number(liquidationPrice.toFixed(2))}
        </Text>
        <Slider
          value={liquidationPrice}
          onValueChange={value => {
            setLiquidationPrice(value);
          }}
          thumbStyle={{
            height: 20,
            width: 20,
            backgroundColor: themeHere.colors.foreground,
          }}
          trackStyle={{
            backgroundColor: 'red',
            height: 20,
            borderRadius: 10,
            color: 'green',
          }}
          style={{
            width: windowWidth - 80,
            alignSelf: 'center',
          }}
          minimumValue={2473}
          maximumValue={3750}
          maximumTrackTintColor={themeHere.colors.mid_ground + '25'}
          minimumTrackTintColor={themeHere.colors.success_green}
        />
      </>
    );
  }

  function OrderInfo() {
    return (
      <View style={{marginBottom: 30}}>
        <Text style={styles.block_title}>order info</Text>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>extra ETH you get</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              1.3501 ETH{' '}
            </Text>
            ($5,045.70)
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>total ETH exposure</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              2.8501 ETH{' '}
            </Text>
            ($10,650.30)
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>total debt</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>1.3501</Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>
            stablity fee (annual interest %)
          </Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>0.50%</Text>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <EnterAmount />
      <AdjustLiquidationPrice />
      <OrderInfo />
    </View>
  );
}

export default EarnInterestCompoundFinance;

const styles = StyleSheet.create({
  parent_view: {},
  block_title: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  enter_amount_input_view: {
    width: windowWidth - 80,
    height: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  enter_amount_input: {
    backgroundColor: 'transparent',
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    maxWidth: windowWidth * 0.5,
    marginHorizontal: 20,
  },
  enter_amount_input_fiat: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
  },
  wallet_balances_view: {
    width: windowWidth - 80,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  crypto_conversion_text: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + 50,
  },
  wallet_balance_text: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + 50,
  },
  liquidation_price_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  order_info_one_block_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  order_info_title_text: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + '50',
  },
  order_info_value_text: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + '50',
  },
});
