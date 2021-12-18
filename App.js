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

const App: () => Node = () => {
  return (
    <Provider store={storehere}>
      <PersistGate loading={null} persistor={persistor}>
        <RootStack />
        <ModalPortal />
      </PersistGate>
    </Provider>
  );
};

export default App;
