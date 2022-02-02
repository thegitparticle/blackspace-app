import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import CrispChat, {
  setUserEmail,
  setUserNickname,
  setUserPhone,
  resetSession,
} from 'react-native-crisp-chat-sdk';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function SupportScreen() {
  return (
    <View style={styles.parent_view}>
      <Text>...</Text>
    </View>
  );
}

export default SupportScreen;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
