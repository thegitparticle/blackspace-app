import React, {useEffect, useMemo, useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import EmojiIcon from '../../../../../bits/EmojiIcon';
import {useNavigation} from '@react-navigation/native';
import useEthFiatPrice from '../../../../../helpers/useEthFiatPrice';
import InfoIcon from '../../../../../bits/InfoIcon';
import use0xSwapQuote from '../../../../uniswap/helpers/use0xSwapQuote';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*
 Name={name}
          Symbol={symbol}
          LogoUri={logoUri}
          TokenIdString={tokenIdString}
          ContractAddress={contractAddress}
          TokenDetails={tokenDetails}
          AmountToBuy={amountToBuy}
          ChangeBody={changeBodyToConfirmBuy}
          State={state_here}

          SPELL
 LOG  https://assets.coingecko.com/coins/images/15861/small/abracadabra-3.png?1622544862
 LOG  spell-token
 LOG  0x090185f2135308bad17527004364ebcc2d37e5f6
 LOG  {"usd": 0.0032926, "usd_24h_change": 4.952892607409285, "usd_24h_vol": 42907940.84729687, "usd_market_cap": 290925483.2472708}
 LOG  100000
 LOG  [Function changeBodyToTransaction]

 */

function ConfirmBuyTrendingMemeCoins(props) {
  const navigation = useNavigation();
  const {loadingEth, priceEth} = useEthFiatPrice();

  // All render states: Checking | WalletHasAmount | WalletHasNoETHButERCs | NoAmount
  const [renderContext, setRenderContext] = useState('Checking');

  let ethBalanceInWallet =
    Number(props.State.MyProfileReducer.myProfileDetails.eth_balance) *
    10 ** -18;

  // convert needed amount to ETH, take 10% premium (for gas) and calculate the needed math below
  function checkIfWalletHasBalance() {
    if (
      Number(props.AmountToBuy) * Number(props.TokenDetails.usd) * 1.1 <
      Number(ethBalanceInWallet) * Number(priceEth)
    ) {
      setRenderContext('WalletHasAmount');
    } else {
      if (
        Number(props.AmountToBuy) * Number(props.TokenDetails.usd) * 1.1 <
        Number(props.State.MyProfileReducer.myProfileDetails.portfolio_value)
      ) {
        setRenderContext('WalletHasNoETHButERCs');
      } else {
        setRenderContext('NoAmount');
      }
    }
  }

  // until the api from server adds decimals field to tokens use this default value
  let decimals = 18;

  // Fetching swap quote from 0x. Buytoken - token1 and sell - token0.
  // const {loading0xSwapQuote, quoteDetails0x, quoteDetails0xRaw} =
  //   use0xSwapQuote('ETH', props.ContractAddress, props.AmountToBuy, decimals, props.State.WDeetsReducer.wdeets.wallet_address,);

  // Fetching swap quote from 0x. Buytoken - token1 and sell - token0 - ON TESTNET
  const {loading0xSwapQuote, quoteDetails0x, quoteDetails0xRaw} =
    use0xSwapQuote(
      'ETH',
      'DAI',
      props.AmountToBuy,
      decimals,
      props.State.WDeetsReducer.wdeets.wallet_address,
    );

  useEffect(() => {
    checkIfWalletHasBalance();
  }, [priceEth]);

  function MainBlock() {
    if (renderContext === 'Checking') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.mid_ground + '50'}
            size={80}
            emoji={'⌛'}
          />
          <Text style={styles.text_highlighted}>
            checking your wallet for balances
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletHasAmount') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.success_green_dark}
            size={80}
            emoji={'👍'}
          />
          <Text style={styles.text_highlighted}>
            Your wallet has enough ETH to buy {props.AmountToBuy} {props.Symbol}
          </Text>
        </View>
      );
    } else if (renderContext === 'WalletHasNoETHButERCs') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.danger_red}
            size={80}
            emoji={'⚠️'}
          />
          <Text style={styles.text_highlighted}>
            you do not have enough ETH but have the needed amount in tokens.
          </Text>
        </View>
      );
    } else if (renderContext === 'NoAmount') {
      return (
        <View style={styles.main_block_view}>
          <EmojiIcon
            color={themeHere.colors.danger_red}
            size={80}
            emoji={'⚠️'}
          />
          <Text style={styles.text_highlighted}>
            your wallet does not have enough ETH to buy {props.AmountToBuy}{' '}
            {props.Symbol}, reduce purchase amount and try again
          </Text>
        </View>
      );
    } else {
      return <View />;
    }
  }

  const RenderOrderInfo = useMemo(
    () =>
      function RenderOrderInfo() {
        function GasPriceTextComponent() {
          if (quoteDetails0x !== null) {
            return (
              <Text style={{color: themeHere.colors.foreground}}>
                ~${' '}
                {Number(
                  Number(quoteDetails0x.gas) *
                    Number(quoteDetails0x.gasPrice) *
                    Number(priceEth) *
                    10 ** -18,
                ).toFixed(2)}
              </Text>
            );
          } else {
            return (
              <Text style={{color: themeHere.colors.foreground}}>~$ 0</Text>
            );
          }
        }

        if (quoteDetails0x) {
          return (
            <View style={styles.order_info_view}>
              <View
                style={{
                  ...styles.order_info_block_view,
                  justifyContent: 'center',
                  marginBottom: 40,
                }}>
                <Text style={styles.order_info_value_text}>
                  <Text style={{color: themeHere.colors.foreground}}>
                    1 {props.Symbol} = {Number(quoteDetails0x.price).toFixed(6)}{' '}
                    ETH
                  </Text>
                </Text>
              </View>
              <View style={styles.order_info_block_view}>
                <Text style={styles.order_info_title_text}>you get</Text>
                <Text style={styles.order_info_value_text}>
                  <Text style={{color: themeHere.colors.foreground}}>
                    {props.AmountToBuy} {props.Symbol}
                  </Text>
                </Text>
              </View>
              <View style={styles.order_info_block_view}>
                <Text style={styles.order_info_title_text}>by paying</Text>
                <Text style={styles.order_info_value_text}>
                  <Text style={{color: themeHere.colors.foreground}}>
                    {Number(
                      quoteDetails0x.orders[0].takerAmount * 10 ** -18,
                    ).toFixed(2)}{' '}
                    ETH
                  </Text>
                </Text>
              </View>
              <View style={styles.order_info_block_view}>
                <Text style={styles.order_info_title_text}>
                  by paying (in $)
                </Text>
                <Text style={styles.order_info_value_text}>
                  <Text style={{color: themeHere.colors.foreground}}>
                    ${' '}
                    {Number(
                      Number(quoteDetails0x.orders[0].takerAmount * 10 ** -18) *
                        Number(priceEth),
                    )
                      .toFixed(0)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </Text>
              </View>
              <View style={styles.order_info_block_view}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.order_info_title_text}>
                    minimum you get
                  </Text>
                  <InfoIcon
                    size={10}
                    information={
                      'crypto markets are volatile. During certain times of the day, the price changes very quickly. So, you might get little fewer or more tokens than what is shown. This is least you would get if at all the price changes.'
                    }
                    height={150}
                  />
                </View>
                <Text style={styles.order_info_value_text}>
                  <Text style={{color: themeHere.colors.foreground}}>
                    {Number(props.AmountToBuy) -
                      Number(
                        Number(props.AmountToBuy) *
                          ((Number(quoteDetails0x.guaranteedPrice) -
                            Number(quoteDetails0x.price)) /
                            Number(quoteDetails0x.price)),
                      ).toFixed(2)}{' '}
                    {props.Symbol}
                  </Text>
                </Text>
              </View>
              <View style={styles.order_info_block_view}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.order_info_title_text}>
                    Ethereum Gas Fees
                  </Text>
                  <InfoIcon
                    size={10}
                    information={
                      'transaction fees taken for this transaction to be executed on the Ethereum blockchain'
                    }
                    height={70}
                  />
                </View>
                <Text style={styles.order_info_value_text}>
                  <GasPriceTextComponent />
                </Text>
              </View>
            </View>
          );
        } else {
          return <View />;
        }
      },
    [quoteDetails0x],
  );

  function ButtonBlock() {
    if (renderContext === 'Checking') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'go back'}
            type={'solid'}
            onPress={() => navigation.goBack()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [themeHere.colors.mid_ground + '50'],
            }}
          />
        </View>
      );
    } else if (renderContext === 'WalletHasAmount') {
      // } else if (renderContext === 'NoAmount') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'confirm buy'}
            type={'solid'}
            onPress={() => props.ChangeBody(quoteDetails0x)}
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
    } else if (renderContext === 'WalletHasNoETHButERCs') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'convert to ETH on Uniswap'}
            type={'solid'}
            onPress={() => props.ChangeBody()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [themeHere.colors.pink, themeHere.colors.pink + '90'],
            }}
          />
        </View>
      );
    } else if (renderContext === 'NoAmount') {
      return (
        <View style={styles.button_block_view}>
          <Button
            title={'go back'}
            type={'solid'}
            onPress={() => navigation.goBack()}
            containerStyle={styles.next_button_container}
            buttonStyle={styles.next_button_style}
            titleStyle={styles.next_button_title}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [
                themeHere.colors.danger_red_dark,
                themeHere.colors.danger_red,
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
      <MainBlock />
      <RenderOrderInfo />
      <ButtonBlock />
    </View>
  );
}

export default ConfirmBuyTrendingMemeCoins;

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
  text_highlighted: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
    marginVertical: 30,
    maxWidth: windowWidth * 0.8,
    textAlign: 'center',
  },
  text_not_highlighted: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginVertical: 30,
    maxWidth: windowWidth * 0.8,
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
});
