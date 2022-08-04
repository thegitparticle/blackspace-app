import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome1Screen from '../buckets/auth/welcome/screens/Welcome1Screen';
import WalletSetupOptionsScreen from '../buckets/auth/walletsetup/screens/WalletSetupOptionsScreen';
import ImportWalletScreen from '../buckets/auth/importwallet/screens/ImportWalletScreen';
import MakeWalletScreen from '../buckets/auth/makewallet/screens/MakeWalletScreen';
import SaveSeedPhraseScreen from '../buckets/auth/makewallet/screens/SaveSeedPhraseScreen';
import UserDetailsInputScreen from '../buckets/auth/userdetailsinput/screens/UserDetailsInputScreen';
import SettingUpAppScreen from '../buckets/auth/settingupapp/screens/SettingUpAppScreen';
import ConnectWalletScreen from '../buckets/auth/connectwallet/screens/ConnectWalletScreen';

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
        name="ConnectWalletScreen"
        component={ConnectWalletScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <StackMain.Screen
        name="SaveSeedPhraseScreen"
        component={SaveSeedPhraseScreen}
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
