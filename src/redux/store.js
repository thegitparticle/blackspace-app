import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import AuthStateReducer from './AuthStateReducer';
import MyProfileReducer from './MyProfileReducer';
import WDeetsReducer from './WDeetsReducer';

export const persistConfigAuth = {
  key: 'auth_here',
  storage: AsyncStorage,
};

export const persistConfigWDeets = {
  key: 'w_deets',
  storage: AsyncStorage,
};

export const persistConfigMyProfile = {
  key: 'my_profile',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  AuthStateReducer: persistReducer(persistConfigAuth, AuthStateReducer),
  MyProfileReducer: persistReducer(persistConfigWDeets, MyProfileReducer),
  WDeetsReducer: persistReducer(persistConfigMyProfile, WDeetsReducer),
});

export const storehere = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(storehere);
