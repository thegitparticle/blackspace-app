import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-native-shared-element';
import HeaderBlock from '../components/HeaderBlock';
import RenderAppBluePrintHelper from '../helpers/RenderAppBluePrintHelper';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MiniAppLanding({route}) {
  const {app_details} = route.params;

  console.log(app_details.landing_blueprint_function_name);

  return (
    <View style={styles.parent_view}>
      <SharedElement id={`item.${app_details.app_name}.app_icon`}>
        <HeaderBlock app_details={app_details} style={{top: 0}} />
      </SharedElement>
      <RenderAppBluePrintHelper
        function_name={app_details.landing_blueprint_function_name}
      />
    </View>
  );
}

export default MiniAppLanding;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
  cover_image: {
    width: windowWidth,
    height: 200,
  },
});
