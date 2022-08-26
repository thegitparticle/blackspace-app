import {useNavigation} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import {Appearance, Dimensions} from 'react-native';
import {Host} from 'react-native-portalize';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import BrandLandingScreen from '../buckets/main/brand/screens/BrandLandingScreen';
import SecretScreen from '../buckets/main/brand/screens/SecretScreen';
import HomeLandingScreen from '../buckets/main/home/screens/HomeLandingScreen';
import MyProfileScreen from '../buckets/main/myprofile/screens/MyProfileScreen';
import NFTDetailedView from '../buckets/main/myprofile/screens/NFTDetailedView';
import SettingsHomeScreen from '../buckets/main/settings/screens/SettingsHomeScreen';
import GlassBgScreenTest from '../buckets/test/GlassBgScreenTest';
import InfuraTestTransactionScreen from '../buckets/test/InfuraTestTransactionScreen';
import IDAppTestLanding from '../buckets/test/instadapptest/IDAppTestLanding';
import LogNetworkCalls from '../buckets/test/LogNetworkCalls';
import TestHome from '../buckets/test/TestHome';
import TransactionScreen from '../buckets/test/TransactionScreen';
import PoSPoolScreen from '../buckets/main/save/screens/PoSPoolScreen';
import {ButterThemeDark, ButterThemeLight} from '../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

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
      <TestMain.Screen
        name="IDAppTestLanding"
        component={IDAppTestLanding}
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
  const navigation = useNavigation();
  return (
    <Host>
      <HomeAndAppMain.Navigator style={{backgroundColor: '#050505'}}>
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
      </HomeAndAppMain.Navigator>
    </Host>
  );
}

function MainStack() {
  return (
    <StackMain.Navigator style={{backgroundColor: '#050505'}}>
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
          name="BrandLandingScreen"
          component={BrandLandingScreen}
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
          name="SecretScreen"
          component={SecretScreen}
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
        <StackMain.Screen
          name="PoSPoolScreen"
          component={PoSPoolScreen}
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
