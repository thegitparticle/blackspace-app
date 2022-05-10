import React from 'react';
import {Appearance, Dimensions, StyleSheet} from 'react-native';
import {Text, useSx, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-native-shared-element';
import {Bounceable} from 'rn-bounceable';
import {Amplitude} from '@amplitude/react-native';
import {SquircleView} from 'react-native-figma-squircle';
import {BlurView} from '@react-native-community/blur';
import MaskedView from '@react-native-masked-view/masked-view';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const width = (windowWidth - 80) / 3;

function NFTDAppThumbnail(props) {
  const navigation = useNavigation();
  const sxCustom = useSx();

  return (
    <Bounceable
      onPress={() => {
        Amplitude.getInstance().logEvent('NFTDAPP_OPEN_BUTTON_CLICK', {
          'NFT DApp Name': String(props.app_details.name),
        });
        navigation.navigate('NFTDAppLanding', {
          app_details: props.app_details,
          discover_or_not: false,
        });
      }}>
      <MaskedView
        style={sxCustom({
          width: width,
          height: width * 1.5,
          backgroundColor: 'off_background',
          flexDirection: 'column',
          borderRadius: 15,
          flexWrap: 'wrap',
          my: '$2',
        })}
        maskElement={
          <SquircleView
            style={StyleSheet.absoluteFill}
            squircleParams={{
              cornerRadius: 15,
              cornerSmoothing: 1,
            }}
          />
        }>
        <FastImage
          source={{
            uri: props.app_details.dapp_cover,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={sxCustom({
            width: width,
            height: width * 1.5,
            borderRadius: 15,
            backgroundColor: 'off_background',
            alignItems: 'center',
            justifyContent: 'flex-end',
          })}>
          <View
            sx={{
              width: width,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <BlurView
              style={{
                width: props.app_details.name.length * 0.1 * width,
                height: 25,
                borderRadius: 12.5,
                position: 'absolute',
              }}
              blurType="dark"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
            <Text
              sx={{
                color: 'foreground',
                flexWrap: 'wrap',
                position: 'absolute',
              }}
              variant="caption_medium">
              {props.app_details.name}
            </Text>
          </View>
        </FastImage>
      </MaskedView>
    </Bounceable>
  );
}

export default NFTDAppThumbnail;
