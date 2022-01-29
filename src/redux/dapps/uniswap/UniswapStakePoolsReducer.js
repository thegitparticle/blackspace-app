import {ADD_UNISWAPSTAKEPOOLS} from '../../types';

const INITIAL_STATE = {
  stakePools: [],
};

const UniswapStakePoolsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_UNISWAPSTAKEPOOLS:
      const token_list = action.payload;

      const newState = {token_list};

      return newState;

    default:
      return state;
  }
};

export default UniswapStakePoolsReducer;
