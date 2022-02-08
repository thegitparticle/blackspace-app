import React from 'react';
import {StyleSheet, Image, Dimensions, Appearance} from 'react-native';
import {Text, View, useSx, styled} from 'dripsy';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../theme/ButterTheme';
import {SquircleView} from 'react-native-figma-squircle';
import FastImage from 'react-native-fast-image';
import {StyledFastImage30} from '../../../../../theme/DripsyTheme';

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
 */

function StakePoolTile(props) {
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
              flexDirection: 'column',
              justifyContent: 'space-around',
              height: 50,
              mx: '$4',
            }}>
            <Text variant="subhead_medium" sx={{color: 'foreground'}}>
              {props.Pool.pool_name}
            </Text>
            <Text variant="subhead_medium" sx={{color: 'foreground'}}>
              {props.Pool.pool_name}
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
            variant="header_medium"
            sx={{
              textAlign: 'right',
              color: 'success_green',
            }}>
            {Number(props.Pool.apy_calculation).toFixed(0)} %
          </Text>
        </View>
      </SquircleView>
    </View>
  );
}

export default StakePoolTile;
