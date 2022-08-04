import {ADD_SOLWALLETDEETS} from '../types';

const initial_state = {
  solwalletdeets: {
    wallet_address: null,
    wallet_sessionKey: null,
    wallet_connected: false,
  },
};

const SolWalletDetailsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_SOLWALLETDEETS:
      var solwalletdeets = action.payload;
      const newState = {solwalletdeets};
      return newState;
    default:
      return state;
  }
};

export default SolWalletDetailsReducer;
