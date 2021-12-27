import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Appearance,
} from 'react-native';
import {LOGIN, LOGOUT} from '../../../redux/types';
import {connect} from 'react-redux';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import SquircleButton from '../../../bits/SquircleButton';
import window from '@react-navigation/native/src/__mocks__/window';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme == 'dark' ? ButterThemeDark : ButterThemeLight;

function Welcome1Screen({dispatch, navigation}) {
  return (
    <View style={styles.screen_view}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/space_bg_1.jpeg')}
        style={styles.background_image}>
        <View style={styles.bottom_block}>
          <Text style={{color: 'white', ...themeHere.text.title_3}}>
            WELCOME TO CRYPTO INTERNET
          </Text>
          <TouchableOpacity
            style={{marginVertical: windowHeight * 0.1}}
            onPress={() => {
              navigation.navigate('WalletSetupOptionsScreen');
            }}>
            <SquircleButton
              buttonColor={themeHere.colors.light}
              width={windowWidth * 0.8}
              height={50}
              buttonText={'LFG! 🚀'}
              font={themeHere.text.title_3}
              textColor={themeHere.colors.red}
            />
          </TouchableOpacity>
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

export default connect(mapDispatchToProps)(Welcome1Screen);

const styles = StyleSheet.create({
  screen_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
  },
  background_image: {
    flex: 1,
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  bottom_block: {
    width: windowWidth,
    height: windowHeight * 0.3,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
