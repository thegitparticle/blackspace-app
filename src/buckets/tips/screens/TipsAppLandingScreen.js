import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import HeaderMiniAppV2 from '../../../bits/HeaderMiniAppV2';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function TipsAppLandingScreen({route}) {
  const {app_details} = route.params;

  return (
    <View style={styles.parent_view}>
      <HeaderMiniAppV2 app_details={app_details} />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(TipsAppLandingScreen);

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
