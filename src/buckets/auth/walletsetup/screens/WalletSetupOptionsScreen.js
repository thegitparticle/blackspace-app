import {View} from 'dripsy';
import React from 'react';
import {
  Appearance,
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {connect} from 'react-redux';
import {LOGIN} from '../../../../redux/types';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import ConnectWalletPart from '../components/ConnectWalletPart';
import CreateWalletPart from '../components/CreateWalletPart';

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
            backgroundColor: themeHere.colors.off_light,
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
        source={require('../../../../../assets/colors_background_1.png')}
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
          {/*<ImportWalletPart />*/}
          <ConnectWalletPart />
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
