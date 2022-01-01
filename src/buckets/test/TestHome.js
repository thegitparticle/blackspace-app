import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../theme/ButterTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function TestHome() {
  const navigation = useNavigation();

  const test_screens = [
    {
      title: 'Glass BG',
      screen_name: 'GlassBgScreenTest',
    },
  ];

  function TestItem(item_deets) {
    return (
      <TouchableOpacity
        style={styles.test_item_view}
        onPress={() => navigation.navigate(item_deets.screen_name)}>
        <Text style={{...themeHere.text.subhead_medium, color: 'white'}}>
          {item_deets.title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.parent_view}>
      <Text style={styles.header_text}>TEST</Text>
      {test_screens.map(item => TestItem(item))}
    </View>
  );
}

export default TestHome;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
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
