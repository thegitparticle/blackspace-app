import {ADD_WDEETS, GET_WDEETS} from './types';

const initial_state = {
  wdeets: {
    wallet_address: null,
    wallet_phrase: null,
    wallet_privateKey: null,
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
