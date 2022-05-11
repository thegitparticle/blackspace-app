import React from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../Desktop/soupapp/src/theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

// Grids with FlatList or SectionList are efficient, yes, but they cannot directly be nested them inside other views.
// So, for small grids which need to nested, use this

function NestableGridComponent(renderItem, {renderList, gridColumns}) {
  let countOfList = renderList.length;
  let multipleRows = Math.trunc(countOfList / gridColumns);
  let demominator = countOfList % gridColumns;

  return (
    <View style={styles.parent_view}>
      <Text>...</Text>
      {/*{Array.from(Array(multipleRows) => {*/}

      {/*})}*/}
    </View>
  );
}

export default NestableGridComponent;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
