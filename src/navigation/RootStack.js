import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {showMessage} from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import Welcome1Screen from '../buckets/welcome/screens/Welcome1Screen';
import {connect} from 'react-redux';
import HomeLandingScreen from '../buckets/home/screens/HomeLandingScreen';
import MainStack from './MainStack';
import WelcomeStack from './WelcomeStack';

var state_here = {};

function RootStack() {
  const netinfo = NetInfo.addEventListener(state => {
    console.log('Is connected?', state.isConnected);
    if (state.isConnected === false) {
      showMessage({
        message: 'Check your internet connection!',
        type: 'info',
        backgroundColor: 'indianred',
      });
    }
  });

  useEffect(() => {
    netinfo();
  }, []);

  var t_or_f = state_here.AuthStateReducer.logged_in_or_not;

  if (t_or_f === true) {
    return (
      <NavigationContainer style={{backgroundColor: '#050505'}}>
        <MainStack />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer style={{backgroundColor: '#050505'}}>
        <WelcomeStack />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(RootStack);
