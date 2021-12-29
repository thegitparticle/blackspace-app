import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../../Desktop/soupapp/src/theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function HomeMainPage() {
  return (
    <View style={styles.parent_view}>
      <ScrollView style={styles.parent_scrollview}>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white'}}>Home page</Text>
        <Text style={{color: 'white', marginVertical: 30}}>Home page</Text>
        <Text style={{color: 'white', marginVertical: 30}}>Home page</Text>
        <Text style={{color: 'white', marginVertical: 30}}>Home page</Text>
        <Text style={{color: 'white', marginVertical: 30}}>Home page</Text>
        <Text style={{color: 'white', marginVertical: 30}}>Home page</Text>
        <Text style={{color: 'white', marginVertical: 30}}>Home page</Text>
        <Text style={{color: 'white', marginVertical: 30}}>Home page</Text>
        <Text style={{color: 'white', marginVertical: 30}}>Home page</Text>
        <Text style={{color: 'white', marginVertical: 30}}>Home page</Text>
        <Text style={{color: 'white', marginVertical: 30}}>Home page</Text>
        <Text style={{color: 'white', marginVertical: 30}}>Home page</Text>
        <Text style={{color: 'white', marginVertical: 30}}>Home page</Text>
      </ScrollView>
    </View>
  );
}

export default HomeMainPage;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parent_scrollview: {
    width: windowWidth,
  },
  header_right_image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
