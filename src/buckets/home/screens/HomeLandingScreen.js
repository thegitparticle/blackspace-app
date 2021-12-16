import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT} from '../../../redux/types';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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
        <Button
          icon={<Icon name="arrow-right" size={15} color="white" />}
          title="Button with icon component"
        />
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
