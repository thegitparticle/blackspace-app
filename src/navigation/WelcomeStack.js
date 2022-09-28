import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SettingUpAppScreen from '../buckets/auth/settingupapp/screens/SettingUpAppScreen';
import WalletSetupOptionsScreen from '../buckets/auth/walletsetup/screens/WalletSetupOptionsScreen';
import Welcome1Screen from '../buckets/auth/welcome/screens/Welcome1Screen';

const StackMain = createStackNavigator();

function WelcomeStack() {
  return (
    <StackMain.Navigator>
      <StackMain.Screen
        name="WelcomeScreen"
        component={Welcome1Screen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <StackMain.Screen
        name="WalletSetupOptionsScreen"
        component={WalletSetupOptionsScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />

      <StackMain.Screen
        name="SettingUpAppScreen"
        component={SettingUpAppScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
    </StackMain.Navigator>
  );
}

export default WelcomeStack;
