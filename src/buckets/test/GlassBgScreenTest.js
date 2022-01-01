import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ImageBackground,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../theme/ButterTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import GradientBgBehindGlass from './GradientBgBehindGlass';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function GlassBgScreenTest() {
  const navigation = useNavigation();

  const test_screens = [
    {
      title: 'Brazil',
    },
    {
      title: 'China',
    },
    {
      title: 'Russia',
    },
  ];

  function Item(item_deets) {
    return (
      <View style={styles.test_item_view}>
        <Text style={{...themeHere.text.subhead_medium, color: 'white'}}>
          {item_deets.title}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <ImageBackground
        style={styles.behind_glass_image}
        source={require('../../../assets/color_grad_bg_1.png')}>
        <View style={styles.glass_view}>
          <Text style={styles.header_text}>Where to find glass?</Text>
          {test_screens.map(item => Item(item))}
        </View>
      </ImageBackground>
    </View>
  );
}

export default GlassBgScreenTest;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
  behind_glass_image: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
    alignItems: 'center',
  },
  glass_view: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background + '50',
  },
  header_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: 60,
  },
  test_item_view: {
    marginVertical: 20,
    width: windowWidth - 40,
    height: 50,
    borderRadius: 15,
    backgroundColor: themeHere.colors.off_background,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
