import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  TouchableOpacity,
} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../../Desktop/soupapp/src/theme/ButterTheme';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-native-shared-element';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const width = (windowWidth - 80) / 3;

function DiscoverAppThumbnail(app_details: {
  app_id: number,
  app_icon: string,
  app_name: string,
  extra_message: string,
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.parent_view}
      key={app_details.app_id.toString()}
      onPress={() =>
        navigation.navigate('MiniAppLanding', {
          app_details,
        })
      }>
      <SharedElement id={`item.${app_details.app_name}.app_icon`}>
        <FastImage
          source={{
            uri: app_details.app_icon,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.app_image}
        />
      </SharedElement>
      <View style={styles.text_view}>
        <Text style={styles.title}>{app_details.app_name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default DiscoverAppThumbnail;

const styles = StyleSheet.create({
  parent_view: {
    width: width,
    height: width * 1.5,
    backgroundColor: themeHere.colors.off_background,
    flexDirection: 'column',
    borderRadius: 15,
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  app_image: {
    width: width,
    height: width * 1.125,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  text_view: {
    width: width,
    height: width * 0.375,
    alignItems: 'center',
    justifyContent: 'center',
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
