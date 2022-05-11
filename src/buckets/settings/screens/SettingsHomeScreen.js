import React from 'react';
import {
  Appearance,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import WalletTile from '../components/WalletTile';
import AppTile from '../components/AppTile';
import MiscTile from '../components/MiscTile';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function SettingsHomeScreen() {
  const navigation = useNavigation();

  function HeaderHere() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: windowWidth,
          flexDirection: 'row',
          height: 75,
        }}>
        <Pressable style={{padding: 20}}>
          <Iconly
            name="SettingBold"
            color={themeHere.colors.foreground + '00'}
            size={25}
          />
        </Pressable>
        <Text
          style={{
            ...themeHere.text.title_3,
            color: themeHere.colors.foreground,
          }}>
          SETTINGS
        </Text>
        <Pressable style={{padding: 20}} onPress={() => navigation.goBack()}>
          <Iconly
            name="ChevronDownBroken"
            color={themeHere.colors.foreground}
            size={25}
          />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.parent_view}>
      <HeaderHere />
      <ScrollView showsVerticalScrollIndicator={false}>
        <WalletTile />
        {/*<UserTile />*/}
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
