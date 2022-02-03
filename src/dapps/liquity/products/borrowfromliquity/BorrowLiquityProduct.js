import React, {useEffect, useState} from 'react';
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
import {SquircleView} from 'react-native-figma-squircle';
import FastImage from 'react-native-fast-image';
import {FamousTokensList} from '../../../uniswap/helpers/FamousTokensList';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import useLUSDFiatPrice from '../../helpers/useLUSDFiatPrice';
import {EthersLiquity, ReadableEthersLiquity} from '@liquity/lib-ethers';
import {Fees} from '@liquity/lib-base';
import {connect} from 'react-redux';
import {BigNumber, ethers} from 'ethers';
import useEthFiatPrice from '../../../../helpers/useGetEthFiatPrice';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
blocks
1. how much LUSD to borrow? - 1 LUSD = 1 USD - enter the amount
2. Coll needed - will load - in ETH and percentage
3. Order info -
  a. borrowing amount - will get into your wallet
  b. borrowing fee - in percentage + LUSD
  c. liquidation reserve (refundable) - 200 LUSD
  d. total amount of debt - total of all three

 4. botton to accept this out

*/

let state_here = {};

const prov = new ethers.providers.JsonRpcProvider(
  'https://rinkeby.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

function BorrowLiquityProduct() {
  let wallet = new ethers.Wallet(
    state_here.WDeetsReducer.wdeets.wallet_privateKey,
  );
  let walletSigner = wallet.connect(prov);

  const {loadingEth, priceEth} = useEthFiatPrice();

  const [borrowAmount, setBorrowAmount] = useState('');
  const {loadingPriceLUSD, priceLUSD} = useLUSDFiatPrice();

  const [liquity, setLiquity] = useState();

  const [liquityFees, setLiquityFees] = useState();
  const [borrowRate, setBorrowRate] = useState(0);

  const [collateralNeededEth, setCollateralNeededEth] = useState();
  const [fixedLoanCharges, setFixedLoanCharges] = useState();

  const liquidationReserveGasFeeLUSD = 200;
  const collateralRatio = 1.43;
  const collateralRatioPercentString = '143%';
  const liquidationRatio = 1.1;
  const liquidationRatioPercentString = '110%';

  useEffect(() => {
    (async () => {
      setLiquity(await EthersLiquity.connect(walletSigner));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let liquityFeesHere = await liquity.getFees();

      setLiquityFees(liquityFeesHere);
      // console.log(
      //   ethers.utils.formatEther(
      //     liquityFeesHere._baseRateWithoutDecay._bigNumber,
      //   ),
      // );
      // console.log(
      //   ethers.utils.formatEther(liquityFees.borrowingRate()._bigNumber),
      // );

      setBorrowRate(
        Number(
          ethers.utils.formatEther(liquityFees.borrowingRate()._bigNumber),
        ),
      );
    })();
  }, [liquity]);

  useEffect(() => {
    setCollateralNeededEth(
      (
        (Number(borrowAmount) +
          Number(borrowAmount) * Number(borrowRate) +
          liquidationReserveGasFeeLUSD) /
        Number(priceEth)
      ).toFixed(2) * collateralRatio,
    );
  }, [borrowAmount, priceEth]);

  useEffect(() => {
    setFixedLoanCharges(
      (
        Number(borrowAmount) * Number(borrowRate) +
        liquidationReserveGasFeeLUSD
      ).toFixed(2),
    );
  }, [borrowAmount, priceEth]);

  const navigation = useNavigation();

  function CollateralNeededBlock() {
    return (
      <View style={styles.coll_needed_block_view}>
        <Text
          style={{
            ...styles.block_sub_title,
            marginTop: 30,
            marginHorizontal: 5,
          }}>
          collateral needed
        </Text>
        <Text
          style={{
            ...styles.block_sub_title,
            marginTop: 30,
            marginHorizontal: 5,
          }}>
          -
        </Text>
        <Text
          style={{
            ...styles.block_sub_title,
            marginTop: 30,
            marginHorizontal: 5,
          }}>
          {Number(collateralNeededEth).toFixed(2)} ETH
        </Text>
        <FastImage
          style={styles.itemholding_icon}
          source={{
            uri: 'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  }

  function RenderOrderInfo() {
    return (
      <View style={styles.order_info_view}>
        <View style={styles.order_info_block_view}>
          <Text style={styles.order_info_title_text}>loan amount</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              {borrowAmount === '' ? 0 : borrowAmount} LUSD
            </Text>
          </Text>
        </View>
        <View style={styles.order_info_block_view}>
          <Text style={styles.order_info_title_text}>fixed loan charges</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              {borrowAmount === '' ? 0 : fixedLoanCharges} LUSD
            </Text>
          </Text>
        </View>
        <View style={styles.order_info_block_view}>
          <Text style={styles.order_info_title_text}>
            total debt to be repayed
          </Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              {borrowAmount === ''
                ? 0
                : Number(borrowAmount) + Number(fixedLoanCharges)}{' '}
              LUSD
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
          title={'start borrow process'}
          type={'solid'}
          onPress={() =>
            navigation.navigate('BorrowLiquityTransactionModal', {
              borrowAmount: borrowAmount,
              collateralNeededEth: collateralNeededEth,
              fixedLoanCharges: fixedLoanCharges,
            })
          }
          containerStyle={styles.next_button_container}
          buttonStyle={styles.next_button_style}
          titleStyle={styles.next_button_title}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [
              themeHere.colors.blue_dark,
              themeHere.colors.blue_dark + '90',
            ],
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <Text style={{...styles.block_sub_title, marginTop: 40}}>
        how much do you wanna borrow?
      </Text>
      <View style={styles.borrow_input_view}>
        <TextInput
          numberOfLines={1}
          onChangeText={setBorrowAmount}
          value={borrowAmount}
          style={styles.enter_amount_input}
          placeholder={'0.0 LUSD'}
          placeholderTextColor={themeHere.colors.foreground + 50}
          keyboardType={'decimal-pad'}
          onEndEditing={() => {}}
        />
        <TouchableOpacity style={{color: 'transparent'}}>
          <SquircleView
            style={styles.lusd_token_item_view}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}>
            <FastImage
              source={{
                uri: 'https://i.postimg.cc/4d53xMqN/128-lusd-icon.png',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.lusd_token_item_logo}
            />
            <Text style={styles.lusd_token_item_symbol}>LUSD</Text>
          </SquircleView>
        </TouchableOpacity>
      </View>
      <Text style={{...styles.fiat_price_text, marginBottom: 30}}>
        ~ $ {Number(borrowAmount) * Number(priceLUSD)}
      </Text>
      <CollateralNeededBlock />
      <RenderOrderInfo />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(BorrowLiquityProduct);

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
  lusd_token_item_view: {
    width: (windowWidth - 80) / 3,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  lusd_token_item_logo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  lusd_token_item_symbol: {
    ...themeHere.text.subhead_bold,
    color: themeHere.colors.foreground,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  lusd_tokens_wrap_view: {
    marginVertical: 15,
  },
  lusd_tokens_line_view: {
    width: windowWidth - 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  coll_needed_block_view: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.3,
    alignSelf: 'center',
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
  fiat_price_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginHorizontal: 20,
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
