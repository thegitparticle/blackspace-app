import {BlurView} from '@react-native-community/blur';
import MaskedView from '@react-native-masked-view/masked-view';
import {Text, useSx, View} from 'dripsy';
import _ from 'lodash';
import React from 'react';
import {Appearance, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle';
import {SvgUri} from 'react-native-svg';
import SpacerVertical from '../../../../bits/SpacerVertical';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function NFTDetailedView({route}) {
  const {nft_details} = route.params;
  const sxCustom = useSx();

  function Header() {
    if (_.endsWith(nft_details.media[0].gateway, 'svg')) {
      return (
        <View
          sx={{
            width: windowWidth,
            height: windowHeight * 0.4,
          }}>
          <View
            sx={{
              width: windowWidth,
              height: windowHeight * 0.4,
            }}>
            <SvgUri
              width="100%"
              height="100%"
              uri={nft_details.media[0].gateway}
            />
          </View>
          <BlurView
            style={sxCustom({
              width: windowWidth,
              height: windowHeight * 0.4,
              position: 'absolute',
            })}
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor="black"
          />
          <View
            sx={{
              position: 'absolute',
              alignItems: 'center',
              width: windowWidth,
            }}>
            <Text
              variant="title_3"
              sx={{
                my: '$10',
                color: 'foreground',
              }}>
              {nft_details.title}
            </Text>
            <MaskedView
              style={sxCustom({
                width: windowWidth * 0.8,
                height: windowHeight * 0.4,
              })}
              maskElement={
                <SquircleView
                  style={StyleSheet.absoluteFill}
                  squircleParams={{
                    cornerSmoothing: 1,
                    cornerRadius: 15,
                    fillColor: 'pink',
                  }}
                />
              }>
              <View
                sx={{
                  width: windowWidth * 0.8,
                  height: windowHeight * 0.4,
                  position: 'absolute',
                }}>
                <SvgUri
                  width="100%"
                  height="100%"
                  uri={nft_details.media[0].gateway}
                />
              </View>
            </MaskedView>
          </View>
        </View>
      );
    } else {
      return (
        <View
          sx={{
            width: windowWidth,
            height: windowHeight * 0.4,
          }}>
          <FastImage
            style={sxCustom({width: windowWidth, height: windowHeight * 0.4})}
            source={{
              uri: nft_details.media[0].gateway,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <BlurView
            style={sxCustom({
              width: windowWidth,
              height: windowHeight * 0.4,
              position: 'absolute',
            })}
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor="black"
          />
          <View
            sx={{
              position: 'absolute',
              alignItems: 'center',
              width: windowWidth,
            }}>
            <Text
              variant="title_3"
              sx={{
                my: '$10',
                color: 'foreground',
              }}>
              {nft_details.title}
            </Text>
            <MaskedView
              style={sxCustom({
                width: windowWidth * 0.8,
                height: windowHeight * 0.4,
              })}
              maskElement={
                <SquircleView
                  style={StyleSheet.absoluteFill}
                  squircleParams={{
                    cornerSmoothing: 1,
                    cornerRadius: 15,
                    fillColor: 'pink',
                  }}
                />
              }>
              <FastImage
                style={sxCustom({
                  width: windowWidth * 0.8,
                  height: windowHeight * 0.4,
                  position: 'absolute',
                })}
                source={{
                  uri: nft_details.media[0].gateway,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </MaskedView>
          </View>
        </View>
      );
    }
  }

  return (
    <View
      variant="layout.full_screen"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Header />
      <View variant="layout.sub_view_40_margin" sx={{my: '$10'}}>
        <Text
          variant="title_3"
          sx={{
            color: 'foreground',
            opacity: 0.5,
            my: '$2',
          }}>
          Project Name
        </Text>
        <Text
          variant="subhead_medium"
          sx={{
            color: 'foreground',
            my: '$2',
          }}>
          {nft_details.title}
        </Text>
        <SpacerVertical height={20} />
        <Text
          variant="title_3"
          sx={{
            color: 'foreground',
            opacity: 0.5,
            my: '$2',
          }}>
          Description
        </Text>
        <Text
          variant="subhead_medium"
          sx={{
            color: 'foreground',
            my: '$2',
          }}>
          {nft_details.description}
        </Text>
      </View>
    </View>
  );
}

export default NFTDetailedView;
