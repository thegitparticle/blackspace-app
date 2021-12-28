import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeLandingScreen from '../buckets/home/screens/HomeLandingScreen';
import TransactionScreen from '../buckets/test/TransactionScreen';

const StackMain = createNativeStackNavigator();

function MainStack() {
  return (
    <StackMain.Navigator headerMode="none">
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
    </StackMain.Navigator>
  );
}

export default MainStack;
