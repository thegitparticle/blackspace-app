import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Appearance,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT} from '../../../redux/types';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import {ButterThemeLight, ButterThemeDark} from '../../../theme/ButterTheme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();

const themeHere = colorScheme == 'dark' ? ButterThemeDark : ButterThemeLight;

var state_here = {};

function HomeLandingScreen({dispatch, navigation}) {
  return (
    <View style={styles.screen_view}>
      <Text>superblack inside bro</Text>
      <Text>{state_here.MyProfileReducer.myProfileDetails.username}</Text>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: windowHeight * 0.015,
        }}
        onPress={() => {
          dispatch({type: LOGOUT});
          AsyncStorage.clear();
        }}>
        <Text>log out</Text>
      </TouchableOpacity>

      <Button
        title="go to send eth screen"
        onPress={() => {
          navigation.navigate('TransactionScreen');
          ReactNativeHapticFeedback.trigger('impactLight', {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
          });
        }}
      />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(HomeLandingScreen);

const styles = StyleSheet.create({
  screen_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
