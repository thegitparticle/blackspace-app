import {ADD_UNISWAPTOKENLIST} from './types';

const INITIAL_STATE = {
  token_list: [],
};

const UniswapTokenListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_UNISWAPTOKENLIST:
      const token_list = action.payload;

      const newState = {token_list};

      return newState;

    default:
      return state;
  }
};

export default UniswapTokenListReducer;
