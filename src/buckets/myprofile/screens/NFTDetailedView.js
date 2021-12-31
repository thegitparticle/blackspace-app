import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function NFTDetailedView({route}) {
  const {nft_details} = route.params;
  return (
    <View style={styles.parent_view}>
      <Text style={styles.header_text}>{nft_details.item_name}</Text>
    </View>
  );
}

export default NFTDetailedView;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    width: windowWidth,
    backgroundColor: themeHere.colors.dark,
  },
  header_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: 60,
  },
});
