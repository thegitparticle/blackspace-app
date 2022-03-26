import React, {useState} from 'react';
import {
  Appearance,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Image, Text, View} from 'dripsy';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import useEthFiatPrice from '../../../../../helpers/useGetEthFiatPrice';
import {SquircleView} from 'react-native-figma-squircle';
import {Modal, ModalContent, ScaleAnimation} from 'react-native-modals';

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

/*
Info={info}
          ChangeBodyTransaction={changeBodyToTransaction}
          ChangeBodyEnterAmount={changeBodyToEnterAmount}
          State={state_here}
          Amount={amount}

          CollNeededFiat={collNeededFiat}   - in $ USD Fiat
 */

function ConfirmBorrowCompound(props) {
  const navigation = useNavigation();
  const [renderContext, setRenderContext] = useState('CheckingCompound');

  const poolsHeadersBorrowProduct = [
    {
      id: 0,
      title: 'Ethereum',
      symbol: 'ETH',
      main_icon: require('../../../../../../assets/crypto_bitcoin_icon.png'),
    },
    {
      id: 1,
      title: 'BAT',
      symbol: 'BAT',
      main_icon: require('../../../../../../assets/token_t_icon.png'),
    },
    {
      id: 2,
      title: 'USDC',
      symbol: 'USDC',
      main_icon: require('../../../../../../assets/defi_key_icon.png'),
    },
    {
      id: 3,
      title: 'USD Tether',
      symbol: 'USDT',
      main_icon: require('../../../../../../assets/nfts_boredape_icon.png'),
    },
    {
      id: 4,
      title: 'DAI',
      symbol: 'DAI',
      main_icon: require('../../../../../../assets/nfts_boredape_icon.png'),
    },
  ];

  /*
    All render states: CheckingCompound | CompoundHasEnough | CheckingWallet | WalletHasAmount | WalletHasNoETHButERCs | NoCollAmount
  */

  /*
   All render states: ChooseCollateral | CheckingWallet | WalletHasAmount | NoCollAmount
 */

  const {loadingEth, priceEth} = useEthFiatPrice();

  const [renderButton, setRenderButton] = useState(true);
  const [showAssetCheckPopup, setShowAssetCheckPopup] = useState(false);

  function checkBalanceOfAsset() {}

  function OneCollateralAsset(item) {
    const [selected, setSelected] = useState(false);

    if (selected) {
      return (
        <TouchableOpacity onPress={() => setSelected(!selected)}>
          <SquircleView
            style={styles.payment_option_item_view}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.neon_blue + '75',
            }}>
            <View style={styles.itemholding_leftside_view}>
              <Image
                variant="images.small_icon_30_round"
                source={item.main_icon}
              />
              <Text style={styles.itemholding_title}>{item.title}</Text>
            </View>
            {/*<View style={styles.itemholding_rightside_view}>*/}
            {/*  <Text style={styles.itemholding_balance}>*/}
            {/*    {item.tokenBalance_decimal.toFixed(4)}*/}
            {/*  </Text>*/}
            {/*  <Text style={styles.itemholding_converted_balance}>*/}
            {/*    ${item.token_price_usd}*/}
            {/*  </Text>*/}
            {/*</View>*/}
          </SquircleView>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelected(!selected);
            // changeToken0(item);
          }}>
          <SquircleView
            style={styles.payment_option_item_view}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '25',
            }}>
            <View style={styles.itemholding_leftside_view}>
              <Image
                variant="images.small_icon_30_round"
                source={item.main_icon}
              />
              <Text style={styles.itemholding_title}>{item.title}</Text>
            </View>
            {/*<View style={styles.itemholding_rightside_view}>*/}
            {/*  <Text style={styles.itemholding_balance}>*/}
            {/*    {item.tokenBalance_decimal.toFixed(4)}*/}
            {/*  </Text>*/}
            {/*  <Text style={styles.itemholding_converted_balance}>*/}
            {/*    ${item.token_price_usd}*/}
            {/*  </Text>*/}
            {/*</View>*/}
          </SquircleView>
        </TouchableOpacity>
      );
    }
  }

  function NextButton() {
    if (renderButton) {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'start borrow process'}
            type={'solid'}
            onPress={() => navigation.goBack()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [
                themeHere.colors.success_green,
                themeHere.colors.success_green_dark,
              ],
            }}
          />
        </View>
      );
    } else {
      return <View />;
    }
  }

  // useEffect(() => {
  //   if (priceEth) {
  //     if (
  //       props.CollNeededFiat / Number(priceEth) <
  //       Number(props.State.MyProfileReducer.myProfileDetails.eth_balance) *
  //         10 ** -18
  //     ) {
  //       console.log('you have enoug coll');
  //       setRenderContext('WalletHasAmount');
  //     } else if (
  //       props.CollNeededFiat <
  //       Number(props.State.MyProfileReducer.myProfileDetails.portfolio_value)
  //     ) {
  //       console.log('it does not have enough coll');
  //       setRenderContext('WalletHasNoETHButERCs');
  //     } else {
  //       console.log('it does not have enough coll');
  //       setRenderContext('NoCollAmount');
  //     }
  //   }
  // }, [priceEth]);
  //
  // function MainBlockConfirmBorrowCompound() {
  //   if (renderContext === 'CheckingCompound') {
  //     return (
  //       <View style={styles.main_block_view}>
  //         <EmojiIcon
  //           color={themeHere.colors.mid_ground + '50'}
  //           size={80}
  //           emoji={'⌛'}
  //         />
  //         <Text style={styles.text_highlighted}>
  //           checking your compound history & wallet to assess collateral
  //         </Text>
  //       </View>
  //     );
  //   } else if (renderContext === 'CompoundHasEnough') {
  //     return (
  //       <View style={styles.main_block_view}>
  //         <EmojiIcon
  //           color={themeHere.colors.success_green_dark}
  //           size={80}
  //           emoji={'👍'}
  //         />
  //         <Text style={styles.text_highlighted}>
  //           your Compound account has the collateral needed
  //         </Text>
  //       </View>
  //     );
  //   } else if (renderContext === 'WalletHasAmount') {
  //     return (
  //       <View style={styles.main_block_view}>
  //         <EmojiIcon
  //           color={themeHere.colors.success_green_dark}
  //           size={80}
  //           emoji={'👍'}
  //         />
  //         <Text style={styles.text_highlighted}>
  //           your wallet has the collateral needed
  //         </Text>
  //       </View>
  //     );
  //   } else if (renderContext === 'WalletHasNoETHButERCs') {
  //     return (
  //       <View style={styles.main_block_view}>
  //         <EmojiIcon
  //           color={themeHere.colors.danger_red}
  //           size={80}
  //           emoji={'⚠️'}
  //         />
  //         <Text style={styles.text_highlighted}>
  //           your wallet has collateral in unsupported coins
  //         </Text>
  //         <View style={styles.unsupported_coins_context_suggestions_view}>
  //           <Text style={styles.text_not_highlighted}>
  //             convert your balances into these supported coins shown below and
  //             try again
  //           </Text>
  //           <View style={styles.supported_coins_view}>
  //             <TokenWithIconBadge
  //               symbol={'DAI'}
  //               icon={
  //                 'https://assets.coingecko.com/coins/images/9956/thumb/4943.png'
  //               }
  //             />
  //             <TokenWithIconBadge
  //               symbol={'ETH'}
  //               icon={
  //                 'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png?1595348880'
  //               }
  //             />
  //             <TokenWithIconBadge
  //               symbol={'USDC'}
  //               icon={
  //                 'https://assets.coingecko.com/coins/images/6319/thumb_2x/USD_Coin_icon.png?1547042389'
  //               }
  //             />
  //           </View>
  //           <View style={styles.supported_coins_view}>
  //             <TokenWithIconBadge
  //               symbol={'USDT'}
  //               icon={
  //                 'https://assets.coingecko.com/coins/images/325/thumb_2x/Tether-logo.png?1598003707'
  //               }
  //             />
  //             <TokenWithIconBadge
  //               symbol={'BAT'}
  //               icon={
  //                 'https://assets.coingecko.com/coins/images/677/thumb_2x/basic-attention-token.png?1547034427'
  //               }
  //             />
  //           </View>
  //         </View>
  //       </View>
  //     );
  //   } else if (renderContext === 'NoCollAmount') {
  //     return (
  //       <View style={styles.main_block_view}>
  //         <EmojiIcon
  //           color={themeHere.colors.danger_red}
  //           size={80}
  //           emoji={'⚠️'}
  //         />
  //         <Text style={styles.text_highlighted}>
  //           your wallet does have enough collateral, reduce borrow amount and
  //           try again
  //         </Text>
  //       </View>
  //     );
  //   } else {
  //     return <View />;
  //   }
  // }
  //
  // function ButtonBlockConfirmBorrowCompound() {
  //   if (renderContext === 'CheckingCompound') {
  //     return (
  //       <View style={styles.button_block_view}>
  //         <Button
  //           title={'go back'}
  //           type={'solid'}
  //           onPress={() => navigation.goBack()}
  //           containerStyle={styles.next_button_container}
  //           buttonStyle={styles.next_button_style}
  //           titleStyle={styles.next_button_title}
  //           ViewComponent={LinearGradient}
  //           linearGradientProps={{
  //             colors: [themeHere.colors.mid_ground + '50'],
  //           }}
  //         />
  //       </View>
  //     );
  //   } else if (renderContext === 'CompoundHasEnough') {
  //     return (
  //       <View style={styles.button_block_view}>
  //         <Button
  //           title={'start borrow process'}
  //           type={'solid'}
  //           onPress={() => props.ChangeBodyTransaction()}
  //           containerStyle={styles.next_button_container}
  //           buttonStyle={styles.next_button_style}
  //           titleStyle={styles.next_button_title}
  //           ViewComponent={LinearGradient}
  //           linearGradientProps={{
  //             colors: [
  //               themeHere.colors.success_green_dark,
  //               themeHere.colors.success_green,
  //             ],
  //           }}
  //         />
  //       </View>
  //     );
  //   } else if (renderContext === 'WalletHasAmount') {
  //     return (
  //       <View style={styles.button_block_view}>
  //         <Button
  //           title={'pay collateral & borrow'}
  //           type={'solid'}
  //           onPress={() => {
  //             // EnterMarketsCompound(
  //             //   props.State.WDeetsReducer.wdeets.wallet_address,
  //             //   props.State.WDeetsReducer.wdeets.wallet_privateKey,
  //             // );
  //             TransactBorrowCompound(
  //               props.State.WDeetsReducer.wdeets.wallet_address,
  //               props.State.WDeetsReducer.wdeets.wallet_privateKey,
  //               props.Amount,
  //               props.Info.cToken[0].underlying_symbol,
  //             );
  //           }}
  //           containerStyle={styles.next_button_container}
  //           buttonStyle={styles.next_button_style}
  //           titleStyle={styles.next_button_title}
  //           ViewComponent={LinearGradient}
  //           linearGradientProps={{
  //             colors: [
  //               themeHere.colors.success_green_dark,
  //               themeHere.colors.success_green,
  //             ],
  //           }}
  //         />
  //       </View>
  //     );
  //   } else if (renderContext === 'WalletHasNoETHButERCs') {
  //     return (
  //       <View style={styles.button_block_view}>
  //         <Button
  //           title={'swap coins'}
  //           type={'solid'}
  //           onPress={() => props.ChangeBody()}
  //           containerStyle={styles.next_button_container}
  //           buttonStyle={styles.next_button_style}
  //           titleStyle={styles.next_button_title}
  //           ViewComponent={LinearGradient}
  //           linearGradientProps={{
  //             colors: [themeHere.colors.mid_ground + '50'],
  //           }}
  //         />
  //       </View>
  //     );
  //   } else if (renderContext === 'NoCollAmount') {
  //     return (
  //       <View style={styles.button_block_view}>
  //         <Button
  //           title={'go back'}
  //           type={'solid'}
  //           onPress={() => navigation.goBack()}
  //           containerStyle={styles.next_button_container}
  //           buttonStyle={styles.next_button_style}
  //           titleStyle={styles.next_button_title}
  //           ViewComponent={LinearGradient}
  //           linearGradientProps={{
  //             colors: [
  //               themeHere.colors.danger_red_dark,
  //               themeHere.colors.danger_red,
  //             ],
  //           }}
  //         />
  //       </View>
  //     );
  //   } else {
  //     return <View />;
  //   }
  // }

  return (
    <View style={styles.parent_view}>
      <View />
      <Text style={styles.text_highlighted}>
        choose which coin / token you wanna put as collateral
      </Text>
      {poolsHeadersBorrowProduct.map(item => OneCollateralAsset(item))}
      <NextButton />
      <Modal
        visible={showAssetCheckPopup}
        initialValue={0}
        useNativeDriver={true}
        modalStyle={{backgroundColor: 'transparent'}}
        modalAnimation={new ScaleAnimation()}
        onTouchOutside={() => {
          setShowAssetCheckPopup(false);
        }}>
        <ModalContent>
          <View variant="layout.info_popup">
            <Text
              variant="header_bold"
              sx={{color: 'foreground', mt: '$4', mb: '$8'}}>
              Base Currency
            </Text>
            <Text variant="subhead_medium" sx={{color: 'foreground', mb: '$4'}}>
              $ US Dollar
            </Text>
            <Text
              variant="subhead_medium"
              sx={{color: 'foreground', mb: '$4', opacity: 0.5}}>
              ₹ Indian Rupee (coming soon)
            </Text>
            <Text
              variant="subhead_medium"
              sx={{color: 'foreground', mb: '$4', opacity: 0.5}}>
              € Euro (coming soon)
            </Text>
          </View>
        </ModalContent>
      </Modal>
      {/*<MainBlockConfirmBorrowCompound />*/}
      {/*<ButtonBlockConfirmBorrowCompound />*/}
    </View>
  );
}

export default ConfirmBorrowCompound;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
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
  payment_option_item_view: {
    width: windowWidth - 80,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },

  itemholding_leftside_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
  },
  itemholding_icon: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  itemholding_title: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 10,
  },
  itemholding_rightside_view: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
  },
  itemholding_balance: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.red,
    marginVertical: 2.5,
    textAlign: 'right',
  },
  itemholding_converted_balance: {
    ...themeHere.text.body,
    color: themeHere.colors.foreground + '50',
    marginVertical: 2.5,
    textAlign: 'right',
  },
});
