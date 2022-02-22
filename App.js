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
import {Amplitude} from '@amplitude/react-native';

import * as Sentry from '@sentry/react-native';

// // dev mode
// Sentry.init({
//   dsn: 'https://75dfb14196fb466a87028e482a9113bc@o578195.ingest.sentry.io/6212337',
// });

// production
Sentry.init({
  dsn: 'https://9230dc56e7754eab81d37474629416e5@o578195.ingest.sentry.io/6219940',
});

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

  // Amplitude analytics setup
  const ampInstance = Amplitude.getInstance();
  // ampInstance.init('3f8238f4e3a8c083393f5a5c86631f75'); // dev mode

  ampInstance.init('de072a1eacb5ba8927a6362092a50d50'); // production

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
