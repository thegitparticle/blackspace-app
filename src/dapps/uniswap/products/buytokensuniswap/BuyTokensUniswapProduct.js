import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function BuyTokenUniswapProduct() {
  const pickerRef = useRef();
  const [firstItemAmount, setFirstItemAmount] = useState('');
  const [selectedFirstItem, setSelectedFirstItem] = useState();
  const [secondItemAmount, setSecondItemAmount] = useState('');
  const [selectedSecondItem, setSelectedSecondItem] = useState();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  function PickSwapPair() {
    return (
      <View style={styles.pick_swap_pair_view}>
        <View style={styles.pick_first_pair_item_view}>
          <View style={styles.first_pair_amount_view}>
            <TextInput
              numberOfLines={1}
              onChangeText={setFirstItemAmount}
              value={firstItemAmount}
              style={styles.enter_amount_input}
              placeholder={'0.0 ETH'}
              placeholderTextColor={themeHere.colors.foreground + 50}
            />
          </View>
          <TouchableOpacity
            style={styles.first_pair_token_view}
            onPress={() => open()}>
            <Text style={styles.block_title}>{selectedFirstItem}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pick_second_pair_item_view}>
          <View style={styles.second_pair_amount_view}>
            <TextInput
              numberOfLines={1}
              onChangeText={setSecondItemAmount}
              value={secondItemAmount}
              style={styles.enter_amount_input}
              placeholder={'0.0 ETH'}
              placeholderTextColor={themeHere.colors.foreground + 50}
            />
          </View>
          <TouchableOpacity
            style={styles.second_pair_token_view}
            onPress={() => open()}>
            <Text style={styles.block_title}>{selectedSecondItem}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function OrderInfo() {
    return (
      <View style={{marginBottom: 30}}>
        <Text style={styles.block_title}>order info</Text>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>expected output</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              6,573.88 DAI
            </Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>
            expected price impact
          </Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>0.5%</Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>
            minimum received (after slippage)
          </Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>0.5%</Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>ETH network fee</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>0.5%</Text>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <Text style={styles.block_title}>choose what to swap</Text>
      <PickSwapPair />
      <OrderInfo />
      <Button
        title={'swap'}
        type={'solid'}
        containerStyle={styles.swap_button_container}
        buttonStyle={styles.swap_button_style}
        titleStyle={styles.swap_button_title}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: [
            themeHere.colors.success_green_dark,
            themeHere.colors.success_green,
          ],
        }}
      />
      <Picker
        ref={pickerRef}
        selectedValue={selectedFirstItem}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedFirstItem(itemValue)
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <Picker
        ref={pickerRef}
        selectedValue={selectedSecondItem}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedSecondItem(itemValue)
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
}

export default BuyTokenUniswapProduct;

const styles = StyleSheet.create({
  parent_view: {},
  block_title: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  pick_first_pair_item_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  pick_swap_pair_view: {
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  enter_amount_input: {
    backgroundColor: 'transparent',
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
  },
  first_pair_amount_view: {
    backgroundColor: themeHere.colors.mid_ground + '25',
    width: windowWidth * 0.4,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  first_pair_token_view: {
    backgroundColor: themeHere.colors.mid_ground + '25',
    width: windowWidth * 0.4,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pick_second_pair_item_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  second_pair_amount_view: {
    backgroundColor: themeHere.colors.mid_ground + '25',
    width: windowWidth * 0.4,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  second_pair_token_view: {
    backgroundColor: themeHere.colors.mid_ground + '25',
    width: windowWidth * 0.4,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  swap_button_container: {
    marginVertical: 30,
    alignSelf: 'center',
  },
  swap_button_style: {
    width: windowWidth * 0.5,
    height: 50,
    borderRadius: 25,
  },
  swap_button_title: {
    ...themeHere.text.body_medium,
    color: 'white',
  },
});
