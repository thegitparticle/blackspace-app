import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import FastImage from 'react-native-fast-image';
import {BlurView} from '@react-native-community/blur';
import {SquircleView} from 'react-native-figma-squircle';
import MaskedView from '@react-native-masked-view/masked-view';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function NFTDetailedView({route}) {
  const {nft_details} = route.params;

  function Header() {
    return (
      <View style={styles.header_view}>
        <FastImage
          style={styles.header_background_image}
          source={{
            uri: nft_details.item_icon,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <BlurView
          style={styles.header_blur_view}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="black"
        />
        <View style={styles.header_front_items_view}>
          <Text style={styles.title_text}>{nft_details.item_name}</Text>
          <MaskedView
            style={styles.header_foreground_image_squircle_view}
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
              style={styles.header_foreground_image}
              source={{
                uri: nft_details.item_icon,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </MaskedView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <Header />
    </View>
  );
}

export default NFTDetailedView;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    width: windowWidth,
    backgroundColor: themeHere.colors.dark,
  },
  header_view: {
    width: windowWidth,
    height: windowHeight * 0.4,
  },
  header_background_image: {
    width: windowWidth,
    height: windowHeight * 0.4,
  },
  header_blur_view: {
    width: windowWidth,
    height: windowHeight * 0.4,
    position: 'absolute',
  },
  header_front_items_view: {
    position: 'absolute',
    alignItems: 'center',
    width: windowWidth,
  },
  title_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: 50,
  },
  header_foreground_image_squircle_view: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
  },
  header_foreground_image: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    position: 'absolute',
  },
});
