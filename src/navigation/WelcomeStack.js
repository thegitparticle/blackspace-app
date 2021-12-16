import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome1Screen from '../buckets/welcome/screens/Welcome1Screen';

const StackMain = createNativeStackNavigator();

function WelcomeStack() {
  return (
    <StackMain.Navigator headerMode="none">
      <StackMain.Screen
        name="WelcomeScreen"
        component={Welcome1Screen}
        options={{
          gestureEnabled: true,
        }}
      />
    </StackMain.Navigator>
  );
}

export default WelcomeStack;
