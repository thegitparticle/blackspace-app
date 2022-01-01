import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import FastImage from 'react-native-fast-image';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function HeaderBlock(app_details) {
  return (
    <View style={styles.parent_view}>
      <FastImage
        style={styles.cover_image}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}>
        <Text>go go go</Text>
      </FastImage>
    </View>
  );
}

export default HeaderBlock;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    width: windowWidth,
    height: 300,
    top: 0,
  },
  cover_image: {
    width: windowWidth,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
