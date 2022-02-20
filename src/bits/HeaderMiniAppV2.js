import React from 'react';
import {StyleSheet, Dimensions, Appearance, Pressable} from 'react-native';
import {Text, View, Image, useSx} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../theme/ButterTheme';
import Iconly from '../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function HeaderMiniAppV2(props) {
  // props - app_details
  const navigation = useNavigation();

  return (
    <View style={styles.parent_view}>
      <View style={styles.left_side_icon}>
        <Iconly name="ChevronLeftBroken" color="transparent" size={25} />
      </View>
      <Text style={styles.title_text}>{props.app_details.name}</Text>
      <Pressable
        style={styles.right_side_icon}
        onPress={() => navigation.goBack()}>
        <Iconly
          name="ChevronDownBroken"
          color={themeHere.colors.foreground}
          size={25}
        />
      </Pressable>
    </View>
  );
}

export default HeaderMiniAppV2;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth,
    flexDirection: 'row',
    height: 75,
  },
  left_side_icon: {
    marginHorizontal: 20,
  },
  right_side_icon: {
    marginHorizontal: 20,
  },
  title_text: {
    ...themeHere.text.title_3,
    color: themeHere.colors.foreground,
  },
});