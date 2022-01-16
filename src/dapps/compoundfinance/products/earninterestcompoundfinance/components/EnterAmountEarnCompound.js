import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function EnterAmountEarnCompound(props) {
  const [amount, setAmount] = useState('0');

  return (
    <View style={styles.parent_view}>
      <View style={styles.top_part_view}>
        <Text></Text>
        <Text style={styles.enter_amount_text}>
          {amount}{' '}
          <Text style={styles.enter_amount_text_symbol}>
            {props.Info.cToken[0].underlying_symbol}{' '}
            <Text style={styles.enter_amount_text_fiat}>= $5000 (approx)</Text>
          </Text>
        </Text>
        <View />
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

export default EnterAmountEarnCompound;

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
