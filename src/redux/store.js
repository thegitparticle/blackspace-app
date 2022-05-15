import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

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
import UniswapStakePoolsReducer from './dapps/uniswap/UniswapStakePoolsReducer';
import AllTipsReducer from './appcore/AllTipsReducer';
import MemeCoinsListReducer from './dapps/memecoins/MemeCoinsListReducer';
import MyNFTsReducer from './appcore/MyNFTsReducer';
import SecretSettingsReducer from './appcore/SecretSettingsReducer';
import SolWalletDetailsReducer from './appcore/SolWalletDetailsReducer';

export const persistConfigAuth = {
  key: 'auth_here',
  storage: AsyncStorage,
};

export const persistConfigWDeets = {
  key: 'w_deets',
  storage: AsyncStorage,
};

export const persistConfigSolWalletDeets = {
  key: 'sol_wallet_deets',
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

export const persistConfigAllTips = {
  key: 'all_tips',
  storage: AsyncStorage,
};

export const persistConfigSecretSettings = {
  key: 'secret_settings',
  storage: AsyncStorage,
};

// dapps redux work only below

export const persistConfigUniswapTokenList = {
  key: 'uniswap_tokenlist',
  storage: AsyncStorage,
};

export const persistConfigUniswapStakePools = {
  key: 'uniswap_stakepools',
  storage: AsyncStorage,
};

export const persistConfigMemeCoinsList = {
  key: 'memecoins_list',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  AuthStateReducer: persistReducer(persistConfigAuth, AuthStateReducer),
  MyProfileReducer: persistReducer(persistConfigMyProfile, MyProfileReducer),
  WDeetsReducer: persistReducer(persistConfigWDeets, WDeetsReducer),
  SolWalletDetailsReducer: persistReducer(
    persistConfigSolWalletDeets,
    SolWalletDetailsReducer,
  ),
  UserDetailsReducer: persistReducer(
    persistConfigUserDetails,
    UserDetailsReducer,
  ),
  MyTokenBalancesReducer: persistReducer(
    persistConfigMyTokenBalances,
    MyTokenBalancesReducer,
  ),
  MyNFTsReducer: persistReducer(persistConfigMyTokenBalances, MyNFTsReducer),
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
  AllTipsReducer: persistReducer(persistConfigAllTips, AllTipsReducer),
  SecretSettingsReducer: persistReducer(
    persistConfigSecretSettings,
    SecretSettingsReducer,
  ),

  // dapps redux work only below

  UniswapTokenListReducer: persistReducer(
    persistConfigUniswapTokenList,
    UniswapTokenListReducer,
  ),

  UniswapStakePoolsReducer: persistReducer(
    persistConfigUniswapStakePools,
    UniswapStakePoolsReducer,
  ),
  MemeCoinsListReducer: persistReducer(
    persistConfigMemeCoinsList,
    MemeCoinsListReducer,
  ),
});

export const storehere = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(storehere);
