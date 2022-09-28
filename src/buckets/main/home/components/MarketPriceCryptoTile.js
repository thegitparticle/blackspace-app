import {Text, useSx, View} from 'dripsy';
import React from 'react';
import {Appearance, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle/src/index';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {StyledFastImage30} from '../../../../theme/DripsyTheme';

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
            <Text variant="body_thick" sx={{color: 'layout_1'}}>
              {props.coinDetails.name}
            </Text>
            <Text variant="body" sx={{color: 'layout_1', opacity: 0.5}}>
              {props.coinDetails.symbol.toUpperCase()}
            </Text>
          </View>
        </View>
      </SquircleView>
    </View>
  );
}

export default MarketPriceCryptoTile;
