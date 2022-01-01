import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  Pressable,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import FastImage from 'react-native-fast-image';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;
const statusBarHeight = getStatusBarHeight();

function HeaderBlock({app_details}) {
  const navigation = useNavigation();

  function ButtonsSubBlock() {
    return (
      <View style={styles.buttons_subblock_view}>
        <Pressable style={styles.close_icon_view}>
          <Iconly
            name="CloseSquareBold"
            color={themeHere.colors.icon + '00'}
            size={30}
          />
        </Pressable>
        <Pressable
          style={styles.close_icon_view}
          onPress={() => navigation.goBack()}>
          <Iconly
            name="CloseSquareBold"
            color={themeHere.colors.icon}
            size={30}
          />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <FastImage
        style={styles.cover_image}
        source={{
          uri: app_details.app_icon,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}>
        <ButtonsSubBlock />
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
  },
  buttons_subblock_view: {
    width: windowWidth - 20,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: statusBarHeight,
  },
  close_icon_view: {
    // backgroundColor: themeHere.colors.icon_background,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
