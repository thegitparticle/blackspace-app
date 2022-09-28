import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Appearance,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../theme/ButterTheme';

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
        <BlurView
          style={styles.test_item_glass_view}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor={themeHere.colors.background}
        />
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
        source={require('../../../assets/color_grad_bg_3.png')}>
        <BlurView
          style={styles.glass_view}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor={themeHere.colors.background}
        />
        <Text style={styles.header_text}>Where to find glass?</Text>
        {test_screens.map(item => Item(item))}
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
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  test_item_glass_view: {
    width: windowWidth - 40,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
