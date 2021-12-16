import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import HomeLandingScreen from '../buckets/home/screens/HomeLandingScreen';

const StackMain = createStackNavigator();

function MainStack() {
  return (
    <StackMain.Navigator headerMode="none">
      <StackMain.Screen
        name="HomeLandingScreen"
        component={HomeLandingScreen}
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

export default MainStack;
