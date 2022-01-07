import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import HomeLandingScreen from '../buckets/home/screens/HomeLandingScreen';
import TransactionScreen from '../buckets/test/TransactionScreen';
import TestHome from '../buckets/test/TestHome';
import MyProfileScreen from '../buckets/myprofile/screens/MyProfileScreen';
import SettingsHomeScreen from '../buckets/settings/screens/SettingsHomeScreen';
import NFTDetailedView from '../buckets/myprofile/screens/NFTDetailedView';
import MiniAppLanding from '../buckets/miniapp/screens/MiniAppLanding';
import GlassBgScreenTest from '../buckets/test/GlassBgScreenTest';
import InfuraTestTransactionScreen from '../buckets/test/InfuraTestTransactionScreen';
import LogNetworkCalls from '../buckets/test/LogNetworkCalls';

const StackMain = createStackNavigator();
const HomeAndAppMain = createSharedElementStackNavigator();
const TestMain = createStackNavigator();
const MyProfileMain = createStackNavigator();
const SettingsMain = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

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
      <TestMain.Screen
        name="GlassBgScreenTest"
        component={GlassBgScreenTest}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <TestMain.Screen
        name="InfuraTestTransactionScreen"
        component={InfuraTestTransactionScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <TestMain.Screen
        name="LogNetworkCalls"
        component={LogNetworkCalls}
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

function HomeAndAppsStack() {
  return (
    <HomeAndAppMain.Navigator>
      <HomeAndAppMain.Screen
        name="HomeLandingScreen"
        component={HomeLandingScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <HomeAndAppMain.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{
          gestureEnabled: true,
        }}
      />
      <HomeAndAppMain.Screen
        name="MiniAppLanding"
        component={MiniAppLanding}
        sharedElements={(route, otherRoute, showing) => {
          const {app_details} = route.params;
          return [`item.${app_details.app_name}.app_icon`];
        }}
        options={{
          gestureEnabled: true,
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </HomeAndAppMain.Navigator>
  );
}

function MainStack() {
  return (
    <StackMain.Navigator>
      <StackMain.Group>
        <StackMain.Screen
          name="HomeAndAppsStack"
          component={HomeAndAppsStack}
          options={{
            gestureEnabled: true,
            headerShown: false,
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
