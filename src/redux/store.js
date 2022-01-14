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

// dapps redux work only below

export const persistConfigUniswapTokenList = {
  key: 'uniswap_tokenlist',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  AuthStateReducer: persistReducer(persistConfigAuth, AuthStateReducer),
  MyProfileReducer: persistReducer(persistConfigWDeets, MyProfileReducer),
  WDeetsReducer: persistReducer(persistConfigMyProfile, WDeetsReducer),
  MyAppsReducer: persistReducer(persistConfigMyApps, MyAppsReducer),
  DiscoverAppsReducer: persistReducer(
    persistConfigDiscoverApps,
    DiscoverAppsReducer,
  ),
  MarketPricesReducer: persistReducer(
    persistConfigMarketPrices,
    MarketPricesReducer,
  ),

  // dapps redux work only below

  UniswapTokenListReducer: persistReducer(
    persistConfigUniswapTokenList,
    UniswapTokenListReducer,
  ),
});

export const storehere = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(storehere);
