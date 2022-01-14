import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import axios from 'axios';
import {getCoinChartInfo} from '../../helpers/GetCoinChartInfo';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function TrendingTokensProductDetailsModal({route, dispatch}) {
  const {token} = route.params;

  const chartInfo = [];

  useEffect(() => {
    chartInfo = getCoinChartInfo(token.token_gecko_id);
  }, []);

  return (
    <View style={styles.parent_view}>
      <Text>...</Text>
    </View>
  );
}

export default TrendingTokensProductDetailsModal;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeHere.colors.background,
  },
});
