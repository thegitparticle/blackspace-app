import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import HomeLandingScreen from '../buckets/home/screens/HomeLandingScreen';
import TransactionScreen from '../buckets/test/TransactionScreen';
import TestHome from '../buckets/test/TestHome';
import MyProfileScreen from '../buckets/myprofile/screens/MyProfileScreen';
import SettingsHomeScreen from '../buckets/settings/screens/SettingsHomeScreen';
import NFTDetailedView from '../buckets/myprofile/screens/NFTDetailedView';

const StackMain = createNativeStackNavigator();
const TestMain = createStackNavigator();
const MyProfileMain = createStackNavigator();
const SettingsMain = createStackNavigator();

function TestStack() {
  return (
    <TestMain.Navigator>
      <TestMain.Screen
        name="TestHome"
        component={TestHome}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
    </TestMain.Navigator>
  );
}

function MyProfileStack() {
  return (
    <MyProfileMain.Navigator>
      <MyProfileMain.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
    </MyProfileMain.Navigator>
  );
}

function SettingsStack() {
  return (
    <SettingsMain.Navigator>
      <SettingsMain.Screen
        name="SettingsHomeScreen"
        component={SettingsHomeScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
    </SettingsMain.Navigator>
  );
}

function MainStack() {
  return (
    <StackMain.Navigator headerMode="none">
      <StackMain.Group>
        <StackMain.Screen
          name="HomeLandingScreen"
          component={HomeLandingScreen}
          options={{
            gestureEnabled: true,
            headerShown: false,
          }}
        />
        <StackMain.Screen
          name="TransactionScreen"
          component={TransactionScreen}
          options={{
            gestureEnabled: true,
          }}
        />
      </StackMain.Group>
      <StackMain.Group screenOptions={{presentation: 'modal'}}>
        <StackMain.Screen
          name="TestStack"
          component={TestStack}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <StackMain.Screen
          name="MyProfileStack"
          component={MyProfileStack}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <StackMain.Screen
          name="NFTDetailedView"
          component={NFTDetailedView}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <StackMain.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
      </StackMain.Group>
    </StackMain.Navigator>
  );
}

export default MainStack;
