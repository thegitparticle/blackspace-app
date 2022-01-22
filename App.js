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
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';

const App: () => Node = () => {
  LogBox.ignoreLogs([
    'Warning: Each child in a list should have a unique "key" prop.',
  ]);

  return (
    <Provider store={storehere}>
      <PersistGate loading={null} persistor={persistor}>
        <TailwindProvider utilities={utilities}>
          <RootStack />
          <ModalPortal />
          <FlashMessage
            position="top"
            duration={3000}
            textStyle={{fontFamily: 'GothamRounded-Medium', fontSize: 15}}
            titleStyle={{fontFamily: 'GothamRounded-Medium', fontSize: 15}}
          />
        </TailwindProvider>
      </PersistGate>
    </Provider>
  );
};

export default codePush(App);
