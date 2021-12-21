import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome1Screen from '../buckets/welcome/screens/Welcome1Screen';
import WalletSetupOptionsScreen from '../buckets/walletsetup/screens/WalletSetupOptionsScreen';
import ImportWalletScreen from '../buckets/importwallet/screens/ImportWalletScreen';
import MakeWalletScreen from '../buckets/makewallet/screens/MakeWalletScreen';
import UserDetailsInputScreen from '../buckets/userdetailsinput/screens/UserDetailsInputScreen';

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
        name="MakeWalletScreen"
        component={MakeWalletScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <StackMain.Screen
        name="ImportWalletScreen"
        component={ImportWalletScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <StackMain.Screen
        name="UserDetailsInputScreen"
        component={UserDetailsInputScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
    </StackMain.Navigator>
  );
}

export default WelcomeStack;
