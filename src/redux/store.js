import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

import AuthStateReducer from './appcore/AuthStateReducer';
import MarketPricesReducer from './appcore/MarketPricesReducer';
import MyEmojiColorReducer from './appcore/MyEmojiColorReducer';
import MyNFTsReducer from './appcore/MyNFTsReducer';
import MyProfileReducer from './appcore/MyProfileReducer';
import MyTokenBalancesReducer from './appcore/MyTokenBalancesReducer';
import SecretSettingsReducer from './appcore/SecretSettingsReducer';
import UserDetailsReducer from './appcore/UserDetailsReducer';
import WDeetsReducer from './appcore/WDeetsReducer';

export const persistConfigAuth = {
  key: 'auth_here',
  storage: AsyncStorage,
};

export const persistConfigWDeets = {
  key: 'w_deets',
  storage: AsyncStorage,
};

export const persistConfigUserDetails = {
  key: 'user_details',
  storage: AsyncStorage,
};

export const persistConfigMyProfile = {
  key: 'my_profile',
  storage: AsyncStorage,
};

export const persistConfigMyTokenBalances = {
  key: 'my_token_balances',
  storage: AsyncStorage,
};

export const persistConfigMyNfts = {
  key: 'my_nfts',
  storage: AsyncStorage,
};

export const persistConfigMarketPrices = {
  key: 'market_prices',
  storage: AsyncStorage,
};

export const persistConfigMyEmojiColor = {
  key: 'emojicolor',
  storage: AsyncStorage,
};

export const persistConfigSecretSettings = {
  key: 'secret_settings',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  AuthStateReducer: persistReducer(persistConfigAuth, AuthStateReducer),
  MyProfileReducer: persistReducer(persistConfigMyProfile, MyProfileReducer),
  WDeetsReducer: persistReducer(persistConfigWDeets, WDeetsReducer),

  UserDetailsReducer: persistReducer(
    persistConfigUserDetails,
    UserDetailsReducer,
  ),
  MyTokenBalancesReducer: persistReducer(
    persistConfigMyTokenBalances,
    MyTokenBalancesReducer,
  ),
  MyNFTsReducer: persistReducer(persistConfigMyTokenBalances, MyNFTsReducer),

  MarketPricesReducer: persistReducer(
    persistConfigMarketPrices,
    MarketPricesReducer,
  ),
  MyEmojiColorReducer: persistReducer(
    persistConfigMyEmojiColor,
    MyEmojiColorReducer,
  ),
  SecretSettingsReducer: persistReducer(
    persistConfigSecretSettings,
    SecretSettingsReducer,
  ),
});

export const storehere = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(storehere);
