import {ADD_WDEETS} from '../types';

const initial_state = {
  wdeets: {
    wallet_address: null,
    wallet_phrase: null,
    wallet_privateKey: null,
    wallet_eth_balance: null,
    wallet_eth_balance_readable_string: null,
  },
};

const WDeetsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_WDEETS:
      var wdeets = action.payload;
      const newState = {wdeets};
      return newState;
    default:
      return state;
  }
};

export default WDeetsReducer;
