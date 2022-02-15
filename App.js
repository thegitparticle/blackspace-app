/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React from 'react';
import RootStack from './src/navigation/RootStack';
import {Provider} from 'react-redux';
import {storehere, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ModalPortal} from 'react-native-modals';
import codePush from 'react-native-code-push';
import FlashMessage from 'react-native-flash-message';
import {LogBox} from 'react-native';
import {DripsyProvider, makeTheme} from 'dripsy';
import {dripsytheme} from './src/theme/DripsyTheme';
import OneSignal from 'react-native-onesignal';

const App: () => Node = () => {
  LogBox.ignoreLogs([
    'Warning: Each child in a list should have a unique "key" prop.',
  ]);

  const theme = makeTheme(dripsytheme);

  //OneSignal Init Code
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId('96444dbd-88fe-4408-bf7c-c22eeda3ea3b');
  //END OneSignal Init Code

  //Prompt for push on iOS
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log('Prompt response:', response);
  });

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
  });

  return (
    <Provider store={storehere}>
      <PersistGate loading={null} persistor={persistor}>
        <DripsyProvider theme={theme}>
          <RootStack />
          <ModalPortal />
          <FlashMessage
            position="top"
            duration={3000}
            textStyle={{fontFamily: 'GothamRounded-Medium', fontSize: 15}}
            titleStyle={{fontFamily: 'GothamRounded-Medium', fontSize: 15}}
          />
        </DripsyProvider>
      </PersistGate>
    </Provider>
  );
};

export default codePush(App);
