import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Appearance,
} from 'react-native';
import {LOGIN} from '../../../redux/types';
import {connect} from 'react-redux';
import CreateWalletPart from '../components/CreateWalletPart';
import ImportWalletPart from '../components/ImportWalletPart';
import {ZStack} from 'swiftui-react-native';
import {View, Image} from 'dripsy';
import FastImage from 'react-native-fast-image';
import {StylesFastImageFullScreen} from '../../../theme/DripsyTheme';
import {Divider} from 'react-native-elements';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function WalletSetupOptionsScreen({dispatch, navigation}) {
  function OrDivider() {
    return (
      <View style={{justifyContent: 'center'}}>
        <Divider
          orientation="horizontal"
          width={3}
          color={themeHere.colors.light + '25'}
        />
        <View
          sx={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: themeHere.colors.light,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
          }}>
          <Text
            style={{
              ...themeHere.text.subhead_medium,
              color: themeHere.colors.background,
            }}>
            or
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View variant="layout.full_screen">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/colors_background_1.png')}
        resizeMode="cover"
        style={{width: windowWidth, height: windowHeight}}>
        <View
          sx={{
            width: windowWidth,
            height: windowHeight,
            backgroundColor: '#17171710',
          }}>
          <CreateWalletPart />
          <OrDivider />
          <ImportWalletPart />
        </View>
      </ImageBackground>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLogInClick: () => {
      dispatch({type: LOGIN});
    },
  };
};

export default connect(mapDispatchToProps)(WalletSetupOptionsScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
