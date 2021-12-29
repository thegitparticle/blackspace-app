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

const StackMain = createNativeStackNavigator();
const TestMain = createStackNavigator();

function TestStack() {
  return (
    <TestMain.Navigator headerMode="none">
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
      </StackMain.Group>
    </StackMain.Navigator>
  );
}

export default MainStack;
