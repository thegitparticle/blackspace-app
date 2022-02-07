import React, {useEffect, useState} from 'react';
import {
  Appearance,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import {SquircleView} from 'react-native-figma-squircle';
import FastImage from 'react-native-fast-image';
import useUSDCFiatPrice from '../../helpers/useUSDCFiatPrice';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {ethers} from 'ethers';
import {mainnet} from '@pooltogether/v4-pool-data';
import {PrizePoolNetwork, User} from '@pooltogether/v4-client-js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

const prov = new ethers.providers.JsonRpcProvider(
  'https://rinkeby.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

function LotteryPoolTogetherProduct() {
  const navigation = useNavigation();
  const [depositAmount, setDepositAmount] = useState('');
  const {loadingPriceUSDC, priceUSDC} = useUSDCFiatPrice();

  const [poolNetwork, setPoolNetwork] = useState();
  const [ptBalance, setPtBalance] = useState();

  const PrizePoolNtk = new PrizePoolNetwork(prov, mainnet);

  const prizePool = PrizePoolNtk.getPrizePool(
    1,
    '0xd89a09084555a7D0ABe7B111b1f78DFEdDd638Be',
  );

  let wallet = new ethers.Wallet(
    state_here.WDeetsReducer.wdeets.wallet_privateKey,
  );
  let walletSigner = wallet.connect(prov);

  let user = new User(prizePool.prizePoolMetadata, walletSigner, prizePool);

  function RenderOrderInfo() {
    return (
      <View style={styles.order_info_view}>
        <View style={styles.order_info_block_view}>
          <Text style={styles.order_info_title_text}>deposit amount</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              {depositAmount === '' ? 0 : depositAmount} USDC
            </Text>
          </Text>
        </View>
        <View style={styles.order_info_block_view}>
          <Text style={styles.order_info_title_text}>Ethereum Gas Fees</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>~$49.94</Text>
          </Text>
        </View>
        <Button
          title={'start depositing'}
          type={'solid'}
          onPress={() =>
            navigation.navigate('LotteryPoolTogetherTransactionModal', {
              depositAmount: depositAmount,
            })
          }
          containerStyle={styles.next_button_container}
          buttonStyle={styles.next_button_style}
          titleStyle={styles.next_button_title}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [themeHere.colors.purple, themeHere.colors.purple_dark],
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <Text style={{...styles.block_sub_title, marginTop: 40}}>
        deposit amount to win lottery
      </Text>
      <View style={styles.borrow_input_view}>
        <TextInput
          numberOfLines={1}
          onChangeText={setDepositAmount}
          value={depositAmount}
          style={styles.enter_amount_input}
          placeholder={'0.0 USDC'}
          placeholderTextColor={themeHere.colors.foreground + 50}
          keyboardType={'decimal-pad'}
          onEndEditing={() => {}}
        />
        <TouchableOpacity style={{color: 'transparent'}}>
          <SquircleView
            style={styles.usdc_token_item_view}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}>
            <FastImage
              source={{
                uri: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.usdc_token_item_logo}
            />
            <Text style={styles.usdc_token_item_symbol}>USDC</Text>
          </SquircleView>
        </TouchableOpacity>
      </View>
      <Text style={{...styles.fiat_price_text, marginBottom: 30}}>
        ~ $ {Number(depositAmount) * Number(priceUSDC)}
      </Text>
      <RenderOrderInfo />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(LotteryPoolTogetherProduct);

const styles = StyleSheet.create({
  parent_view: {},
  token_card_view: {
    width: windowWidth - 40,
  },
  block_title: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  block_sub_title: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
  },
  borrow_input_view: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 30,
  },
  enter_amount_input: {
    backgroundColor: 'transparent',
    ...themeHere.text.header_bold,
    color: themeHere.colors.foreground,
    width: (windowWidth - 40) / 2,
    height: 50,
    marginHorizontal: 20,
  },
  usdc_token_item_view: {
    width: (windowWidth - 80) / 3,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  usdc_token_item_logo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  usdc_token_item_symbol: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.foreground,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  usdc_tokens_wrap_view: {
    marginVertical: 15,
  },
  usdc_tokens_line_view: {
    width: windowWidth - 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  fiat_price_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginHorizontal: 20,
  },
  order_info_view: {
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  order_info_block_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
    width: windowWidth - 80,
  },
  order_info_title_text: {
    ...themeHere.text.body,
    color: themeHere.colors.foreground + '50',
  },
  order_info_value_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
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
