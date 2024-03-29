import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {showMessage} from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import MainStack from './MainStack';
import WelcomeStack from './WelcomeStack';
import SplashScreen from 'react-native-splash-screen';
import {dripsytheme} from '../theme/DripsyTheme';

let state_here = {};

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
    SplashScreen.hide();
  }, []);

  const t_or_f = state_here.AuthStateReducer.logged_in_or_not;

  const MyTheme = {
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: '#050505',
      card: 'rgb(255, 255, 255, 00)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204, 00)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  if (t_or_f === true) {
    return (
      <NavigationContainer
        theme={MyTheme}
        style={{backgroundColor: dripsytheme.colors.layout_5}}>
        <MainStack />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer
        theme={MyTheme}
        style={{backgroundColor: dripsytheme.colors.layout_5}}>
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
