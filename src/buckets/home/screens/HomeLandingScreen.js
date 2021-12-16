import React from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {ButterThemeLight, ButterThemeDark} from '../../../theme/ButterTheme';
import FastImage from 'react-native-fast-image';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();

const themeHere = colorScheme == 'dark' ? ButterThemeDark : ButterThemeLight;

function HomeLandingScreen({dispatch}) {
  return (
    <View style={styles.screen_view}>
      <Text>superblack inside bro</Text>
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
        <FastImage
          style={{width: 200, height: 200}}
          source={{
            uri: 'https://unsplash.it/400/400?image=1',
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text
          style={{
            ...themeHere.text.title_3,
            color: themeHere.colors.you_prime,
          }}>
          this is the custom font
        </Text>
        <Button
          icon={<Icon name="arrow-right" size={15} color="white" />}
          title="Button with icon component"
        />
        <Iconly name="ChevronLeftBroken" color="#000" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLogInClick: () => {
      dispatch({type: LOGOUT});
    },
  };
};

export default connect(mapDispatchToProps)(HomeLandingScreen);

const styles = StyleSheet.create({
  screen_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
