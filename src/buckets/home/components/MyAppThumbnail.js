import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../../Desktop/soupapp/src/theme/ButterTheme';
import FastImage from 'react-native-fast-image';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MyAppThumbnail({app_image, app_name, extra_message}) {
  return (
    <View style={styles.parent_view}>
      <FastImage
        source={{uri: app_image, priority: FastImage.priority.normal}}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.app_image}
      />
      <Text style={styles.title}>{app_name}</Text>
      <Text style={styles.subtitle}>{extra_message}</Text>
    </View>
  );
}

export default MyAppThumbnail;

const styles = StyleSheet.create({
  parent_view: {
    width: (windowWidth - 80) / 3,
    height: ((windowWidth - 80) / 3) * 1.5,
    backgroundColor: themeHere.colors.off_background,
    flexDirection: 'column',
  },
  app_image: {
    width: (windowWidth - 80) / 3,
    height: ((windowWidth - 80) / 3) * 1.125,
  },
  title: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
  },
  subtitle: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + '75',
  },
});
