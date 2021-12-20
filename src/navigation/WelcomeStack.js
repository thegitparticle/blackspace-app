import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome1Screen from '../buckets/welcome/screens/Welcome1Screen';
import WalletSetupOptionsScreen from '../buckets/walletsetup/screens/WalletSetupOptionsScreen';

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
    </StackMain.Navigator>
  );
}

export default WelcomeStack;
