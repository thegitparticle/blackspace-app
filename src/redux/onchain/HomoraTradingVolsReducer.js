import {ADD_HOMORAV2TRADINGVOLS} from '../types';

const initial_state = {
  homora_trading_vols: [],
};

const HomoraTradingVolsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_HOMORAV2TRADINGVOLS:
      const homora_trading_vols = action.payload;
      const newState = {homora_trading_vols};
      return newState;
    default:
      return state;
  }
};

export default HomoraTradingVolsReducer;
