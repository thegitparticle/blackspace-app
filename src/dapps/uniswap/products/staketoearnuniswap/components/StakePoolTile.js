import React from "react";
import { Appearance, Dimensions } from "react-native";
import { Text, useSx, View } from "dripsy";
import { ButterThemeDark, ButterThemeLight } from "../../../../../theme/ButterTheme";
import { SquircleView } from "react-native-figma-squircle";
import FastImage from "react-native-fast-image";
import { StyledFastImage30 } from "../../../../../theme/DripsyTheme";
import { Bounceable } from "rn-bounceable";
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

/*

Base Tile:
1. token0 icon + name
2. token1 icon + name
3. APY % (estimated)

Expanded Tile:
1.

uniswap pool data
{"feeTier": "3000", "sqrtPrice": "1980595144200428976234839206",
"tick": "-73783",
"token0": {"decimals": "18", "id": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
  "name": "Matic Token", "symbol": "MATIC"},
  "token1": {"decimals": "18", "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "name": "Wrapped Ether", "symbol": "WETH"},
  "totalValueLockedUSD": "31607450.05733802402935138612877398"}
 */

function StakePoolTile(props) {
  const navigation = useNavigation();
  const sxCustom = useSx();

  return (
    <Bounceable
      onPress={() =>
        navigation.navigate('StakeToEarnUniSwapTransactionModal', {
          info: props.Pool,
          lpStakeDetails: props.PoolUniswapData,
        })
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
            fillColor: themeHere.colors.mid_ground + '25',
          }}>
          <View sx={{mx: '$4', flexDirection: 'row', alignItems: 'center'}}>
            <StyledFastImage30
              source={{
                uri: props.Pool.profile_pic_token0,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View
              sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                mx: '$4',
              }}>
              <Text variant="subhead_medium" sx={{color: 'foreground'}}>
                {props.PoolUniswapData.token0.symbol}
              </Text>
              <Text variant="subhead_medium" sx={{color: 'foreground'}}>
                {' '}
                -{' '}
              </Text>
              <Text variant="subhead_medium" sx={{color: 'foreground'}}>
                {props.PoolUniswapData.token1.symbol}
              </Text>
            </View>
            <StyledFastImage30
              source={{
                uri: props.Pool.profile_pic_token1,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View
            sx={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              height: 50,
              mx: 20,
            }}>
            <Text
              variant="header_bold"
              sx={{
                textAlign: 'right',
                color: 'success_green',
              }}>
              {Number(props.Pool.apy_calculation).toFixed(0)} %
            </Text>
          </View>
        </SquircleView>
      </View>
    </Bounceable>
  );
}

export default StakePoolTile;
