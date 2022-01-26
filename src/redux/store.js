import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import AuthStateReducer from './appcore/AuthStateReducer';
import MyProfileReducer from './appcore/MyProfileReducer';
import WDeetsReducer from './appcore/WDeetsReducer';
import MyAppsReducer from './appcore/MyAppsReducer';
import DiscoverAppsReducer from './appcore/DiscoverAppsReducer';
import MarketPricesReducer from './appcore/MarketPricesReducer';
import UniswapTokenListReducer from './dapps/uniswap/UniswapTokenListReducer';
import MyEmojiColorReducer from './appcore/MyEmojiColorReducer';
import UserDetailsReducer from './appcore/UserDetailsReducer';
import MyTokenBalancesReducer from './appcore/MyTokenBalancesReducer';

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

export const persistConfigMyApps = {
  key: 'my_apps',
  storage: AsyncStorage,
};

export const persistConfigDiscoverApps = {
  key: 'discover_apps',
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

// dapps redux work only below

export const persistConfigUniswapTokenList = {
  key: 'uniswap_tokenlist',
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
  MyAppsReducer: persistReducer(persistConfigMyApps, MyAppsReducer),
  DiscoverAppsReducer: persistReducer(
    persistConfigDiscoverApps,
    DiscoverAppsReducer,
  ),
  MarketPricesReducer: persistReducer(
    persistConfigMarketPrices,
    MarketPricesReducer,
  ),
  MyEmojiColorReducer: persistReducer(
    persistConfigMyEmojiColor,
    MyEmojiColorReducer,
  ),

  // dapps redux work only below

  UniswapTokenListReducer: persistReducer(
    persistConfigUniswapTokenList,
    UniswapTokenListReducer,
  ),
});

export const storehere = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(storehere);
