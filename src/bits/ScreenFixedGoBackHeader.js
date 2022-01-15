import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  Pressable,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../theme/ButterTheme';
import Iconly from '../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function ModalGoBackHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.parent_view}>
      <View style={styles.left_side_icon}>
        <Iconly name="ChevronLeftBroken" color="transparent" size={25} />
      </View>
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

export default ModalGoBackHeader;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth,
    flexDirection: 'row',
    height: 75,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
  },
  left_side_icon: {
    marginHorizontal: 20,
  },
  right_side_icon: {
    marginHorizontal: 20,
  },
});
