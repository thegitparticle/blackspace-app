import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Welcome1Screen from '../buckets/welcome/screens/Welcome1Screen';

const StackMain = createStackNavigator();

function WelcomeStack() {
  return (
    <StackMain.Navigator headerMode="none">
      <StackMain.Screen
        name="WelcomeScreen"
        component={Welcome1Screen}
        options={{
          gestureEnabled: true,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </StackMain.Navigator>
  );
}

export default WelcomeStack;
