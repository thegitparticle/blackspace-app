import React from "react";
import { Appearance, Dimensions } from "react-native";
import { Text, useSx, View } from "dripsy";
import { ButterThemeDark, ButterThemeLight } from "../../../theme/ButterTheme";
import window from "@react-navigation/native/src/__mocks__/window";
import { SquircleView } from "react-native-figma-squircle/src/index";
import FastImage from "react-native-fast-image";
import { StyledFastImage30 } from "../../../theme/DripsyTheme";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MarketPriceCryptoTile(props) {
  const sxCustom = useSx();

  return (
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
        <View sx={{mx: '$4', flexDirection: 'row', alignItems: 'center'}}>
          <StyledFastImage30
            source={{
              uri: props.coinDetails.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View
            sx={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              height: 50,
              mx: '$4',
            }}>
            <Text variant="subhead_medium" sx={{color: 'foreground'}}>
              {props.coinDetails.name}
            </Text>
            <Text
              variant="body_medium"
              sx={{color: 'foreground', opacity: 0.5}}>
              {props.coinDetails.symbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <View
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: 50,
            mx: 20,
          }}>
          <Text
            variant="subhead_medium"
            sx={{color: 'foreground', textAlign: 'right'}}>
            ${props.coinDetails.current_price}
          </Text>
          <Text
            variant="body_medium"
            sx={{
              textAlign: 'right',
              color:
                props.coinDetails.price_change_percentage_24h < 0
                  ? 'danger_red'
                  : 'success_green',
            }}>
            {props.coinDetails.price_change_percentage_24h.toFixed(2)} %
          </Text>
        </View>
      </SquircleView>
    </View>
  );
}

export default MarketPriceCryptoTile;
