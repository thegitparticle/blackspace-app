import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import MainDetails from '../components/MainDetails';
import WalletPie from '../components/WalletPie';
import AccordianPortfolio from '../components/AccordianPortfolio';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MyProfileScreen() {
  return (
    <View style={styles.parent_view}>
      <Text style={styles.header_text}>My Deets!</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainDetails />
        <WalletPie />
        <AccordianPortfolio />
      </ScrollView>
    </View>
  );
}

export default MyProfileScreen;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.dark,
  },
  header_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: 60,
  },
});
