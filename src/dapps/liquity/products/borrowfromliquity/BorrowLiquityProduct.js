import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  TextInput,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {SquircleView} from 'react-native-figma-squircle';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function BorrowLiquityProduct() {
  const [amount, setAmount] = useState('');

  const tokens_list = [
    {
      token_name: 'Shiba Inu',
    },
  ];

  function OrderInfo() {
    return (
      <View style={{marginBottom: 30}}>
        <Text style={styles.block_title}>order info</Text>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>total debt</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              6,573.88 DAI
            </Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>
            stability fee (annual interest %)
          </Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>0.5%</Text>
          </Text>
        </View>
      </View>
    );
  }

  function TokenCard(token) {
    return (
      <SquircleView
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 7.5,
          fillColor: themeHere.colors.mid_ground + '25',
        }}
        style={styles.token_card_view}>
        <Text style={styles.token_title}>{token.token_name}</Text>
      </SquircleView>
    );
  }

  return (
    <View style={styles.parent_view}>
      {tokens_list.map(item => TokenCard(item))}
    </View>
  );
}

export default BorrowLiquityProduct;

const styles = StyleSheet.create({
  parent_view: {},
  token_card_view: {
    width: windowWidth - 40,
  },
  token_title: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
    marginVertical: 30,
  },
});
