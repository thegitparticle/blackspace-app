import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGIN, LOGOUT} from '../../../redux/types';
import {connect} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Welcome1Screen({dispatch, navigation}) {
  return (
    <View style={styles.screen_view}>
      <StatusBar barStyle="light-content" />
      <Text style={{color: 'white'}}>superblack</Text>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: windowHeight * 0.015,
          backgroundColor: '#FFFFFF50',
          width: 200,
          height: 50,
          borderRadius: 10,
        }}
        onPress={() => {
          navigation.navigate('WalletSetupOptionsScreen');
        }}>
        <Text style={{color: 'white'}}>gm</Text>
      </TouchableOpacity>
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
});
