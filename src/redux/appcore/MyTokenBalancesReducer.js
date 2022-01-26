import {ADD_TOKENBALANCES} from '../types';

const initial_state = {
  tokens: [],
};

const MyTokenBalancesReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_TOKENBALANCES:
      const tokens = action.payload;
      const newState = {tokens};
      return newState;
    default:
      return state;
  }
};

export default MyTokenBalancesReducer;
