import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import {SquircleView} from 'react-native-figma-squircle';
import FastImage from 'react-native-fast-image';
import UniswapStakeSetupAndExecute from '../../../helpers/UniswapStakeSetupAndExecute';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
things to render

1. token 0 symbol - text input
2. token 1 symbol - text input

3. fee level - fixed - just text
4. concentration range - fixes - picked by best performance
 */

function EnterAmountStakeUniSwap(props) {
  const [amount, setAmount] = useState('0');
  const [token0Amount, setToken0Amount] = useState('');
  const [token1Amount, setToken1Amount] = useState('');

  /*
  info,
  lpStakeDetails,
  walletAddress,
  privateKey,

   Info={info}
          LPStakeDetails={lpStakeDetails}
          ChangeBody={changeBodyToConfirmEarn}
          State={state_here}

  title={`Stake & Earn ${lpStakeDetails.token0.symbol} - ${lpStakeDetails.token1.symbol}`}
   */

  return (
    <View style={styles.parent_view}>
      <View style={styles.top_part_view}>
        <Text></Text>
        <View>
          <View style={styles.token0_view}>
            <TextInput
              numberOfLines={1}
              onChangeText={setToken0Amount}
              value={token0Amount}
              style={styles.enter_amount_text}
              placeholder={`0.0 ${props.LPStakeDetails.token0.symbol}`}
              placeholderTextColor={themeHere.colors.foreground + 50}
              keyboardType={'decimal-pad'}
              onEndEditing={() => {}}
            />
            <SquircleView
              style={styles.token_item_view}
              squircleParams={{
                cornerSmoothing: 1,
                cornerRadius: 15,
                fillColor: themeHere.colors.mid_ground + '25',
              }}>
              <FastImage
                source={{
                  uri: props.Info.profile_pic_token0,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.token_item_logo}
              />
              <Text style={styles.token_item_symbol}>
                {props.LPStakeDetails.token0.symbol}
              </Text>
            </SquircleView>
          </View>
          <View style={styles.token1_view}>
            <TextInput
              numberOfLines={1}
              onChangeText={setToken1Amount}
              value={token1Amount}
              style={styles.enter_amount_text}
              placeholder={`0.0 ${props.LPStakeDetails.token1.symbol}`}
              placeholderTextColor={themeHere.colors.foreground + 50}
              keyboardType={'decimal-pad'}
              onEndEditing={() => {}}
              onPressIn={() => console.log('token1 is pressed')}
              editable={false}
            />
            <SquircleView
              style={styles.token_item_view}
              squircleParams={{
                cornerSmoothing: 1,
                cornerRadius: 15,
                fillColor: themeHere.colors.mid_ground + '25',
              }}>
              <FastImage
                source={{
                  uri: props.Info.profile_pic_token1,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.token_item_logo}
              />
              <Text style={styles.token_item_symbol}>
                {props.LPStakeDetails.token1.symbol}
              </Text>
            </SquircleView>
          </View>
        </View>
        <View>
          <Button
            title={'confirm staking'}
            type={'solid'}
            // onPress={() => props.ChangeBody(token0Amount, token1Amount)}
            onPress={() =>
              UniswapStakeSetupAndExecute(
                props.Info,
                props.LPStakeDetails,
                props.State.WDeetsReducer.wdeets.wallet_address,
                props.State.WDeetsReducer.wdeets.wallet_privateKey,
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
      <View style={styles.bottom_part_view}></View>
    </View>
  );
}

export default EnterAmountStakeUniSwap;

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
  token0_view: {
    flexDirection: 'row',
    width: windowWidth - 40,
    marginVertical: 15,
  },
  token1_view: {
    flexDirection: 'row',
    width: windowWidth - 40,
    marginVertical: 15,
  },
  enter_amount_text: {
    backgroundColor: 'transparent',
    ...themeHere.text.header_bold,
    color: themeHere.colors.foreground,
    width: (windowWidth - 40) / 2,
    height: 50,
    marginHorizontal: 20,
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
  token_item_view: {
    width: (windowWidth - 80) / 3,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  token_item_logo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  token_item_symbol: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.foreground,
    textAlign: 'center',
    marginHorizontal: 10,
  },
});
