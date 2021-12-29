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
import WalletTile from '../components/WalletTile';
import UserTile from '../components/UserTile';
import AppTile from '../components/AppTile';
import MiscTile from '../components/MiscTile';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function SettingsHomeScreen() {
  return (
    <View style={styles.parent_view}>
      <Text style={styles.header_text}>Settings</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WalletTile />
        <UserTile />
        <AppTile />
        <MiscTile />
      </ScrollView>
    </View>
  );
}

export default SettingsHomeScreen;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.dark,
  },
  header_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: 50,
  },
});
