import React from 'react';
import {Appearance, Dimensions, StyleSheet} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {useNavigation} from '@react-navigation/native';
import {useSx, Text, View} from 'dripsy';
import {Bounceable} from 'rn-bounceable';
import {SquircleView} from 'react-native-figma-squircle';
import {StyledFastImage25, StyledFastImage30} from '../../../theme/DripsyTheme';
import FastImage from 'react-native-fast-image';
import SpacerVertical from '../../../bits/SpacerVertical';
import Iconly from '../../../miscsetups/customfonts/Iconly';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const BuySellLedgerDummyData = [
  {
    buy_token_symbol: 'USDC',
    buy_token_icon:
      'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389',
    buy_token_contract_address: '',
    sell_token_symbol: 'ETH',
    sell_token_icon:
      'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
    sell_token_contract_address: '',
    buy_token_amount: '4500',
    buy_token_amount_fiat: '4501.11',
    sell_token_amount: '2.2',
    sell_token_amount_fiat: '4509.5',
    timestamp: '1652573698',
  },
  {
    buy_token_symbol: 'APE',
    buy_token_icon:
      'https://assets.coingecko.com/coins/images/24383/thumb/apecoin.jpg?1647476455',
    buy_token_contract_address: '',
    sell_token_symbol: 'ETH',
    sell_token_icon:
      'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
    sell_token_contract_address: '',
    buy_token_amount: '3000',
    buy_token_amount_fiat: '21900',
    sell_token_amount: '9.5',
    sell_token_amount_fiat: '21915.5',
    timestamp: '1652559298',
  },
  {
    buy_token_symbol: 'GALA',
    buy_token_icon:
      'https://assets.coingecko.com/coins/images/12493/thumb/GALA-COINGECKO.png?1600233435',
    buy_token_contract_address: '',
    sell_token_symbol: 'ETH',
    sell_token_icon:
      'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
    sell_token_contract_address: '',
    buy_token_amount: '100000',
    buy_token_amount_fiat: '7781',
    sell_token_amount: '3.5',
    sell_token_amount_fiat: '7797.5',
    timestamp: '1651068898',
  },
];

function UniswapUsageShowCase() {
  const navigation = useNavigation();
  const sxCustom = useSx();

  function EachSwapTile(props) {
    return (
      <Bounceable
        onPress={
          () => console.log('tapped')
          // navigation.navigate('StakeToEarnUniSwapTransactionModal', {
          //   info: props.Pool,
          //   lpStakeDetails: props.PoolUniswapData,
          // })
        }>
        <View
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            width: windowWidth - 40,
            height: 75,
            my: '$2',
            alignSelf: 'center',
          }}>
          <SquircleView
            style={sxCustom({
              width: windowWidth - 40,
              height: 75,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            })}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '75',
            }}>
            <View
              sx={{
                flexDirection: 'column',
                width: (windowWidth - 40) * 0.2,
                alignItems: 'flex-end',
              }}>
              <Text
                variant="body_medium"
                sx={{
                  textAlign: 'left',
                  color: 'foreground',
                }}>
                {props.Swap.sell_token_amount}
              </Text>
              <Text
                variant="caption"
                sx={{
                  textAlign: 'left',
                  color: 'foreground',
                  opacity: 0.75,
                }}>
                $ {props.Swap.sell_token_amount_fiat}
              </Text>
            </View>
            <View
              sx={{
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: (windowWidth - 40) * 0.25,
                  justifyContent: 'flex-end',
                }}>
                <StyledFastImage25
                  source={{
                    uri: props.Swap.sell_token_icon,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    backgroundColor: themeHere.colors.off_foreground,
                    marginHorizontal: 5,
                  }}
                />
                <Text variant="subhead_medium" sx={{color: 'foreground'}}>
                  {props.Swap.sell_token_symbol}
                </Text>
              </View>
              <View
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: (windowWidth - 40) * 0.1,
                }}>
                <Iconly
                  name="ArrowRightBold"
                  color={themeHere.colors.foreground}
                  size={25}
                />
              </View>
              <View
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  width: (windowWidth - 40) * 0.25,
                }}>
                <Text variant="subhead_medium" sx={{color: 'foreground'}}>
                  {props.Swap.buy_token_symbol}
                </Text>
                <StyledFastImage25
                  source={{
                    uri: props.Swap.buy_token_icon,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    backgroundColor: themeHere.colors.off_foreground,
                    marginHorizontal: 5,
                  }}
                />
              </View>
            </View>
            <View
              sx={{flexDirection: 'column', width: (windowWidth - 40) * 0.2}}>
              <Text
                variant="body_medium"
                sx={{
                  textAlign: 'left',
                  color: 'foreground',
                }}>
                {props.Swap.buy_token_amount}
              </Text>
              <Text
                variant="caption"
                sx={{
                  textAlign: 'left',
                  color: 'foreground',
                  opacity: 0.75,
                }}>
                $ {props.Swap.buy_token_amount_fiat}
              </Text>
            </View>
          </SquircleView>
        </View>
      </Bounceable>
    );
  }

  return (
    <View style={styles.parent_view}>
      <SpacerVertical height={40} />
      {BuySellLedgerDummyData.map(item => (
        <EachSwapTile Swap={item} />
      ))}
    </View>
  );
}

export default UniswapUsageShowCase;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
