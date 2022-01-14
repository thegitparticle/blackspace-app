import {ADD_MARKETPRICES} from '../types';

const INITIAL_STATE = {
  marketprices: [],
};

const MarketPricesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MARKETPRICES:
      const marketprices = action.payload;

      const newState = {marketprices};

      return newState;

    default:
      return state;
  }
};

export default MarketPricesReducer;
