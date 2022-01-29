import {ADD_UNISWAPSTAKEPOOLS} from '../../types';

const INITIAL_STATE = {
  stakePools: [],
};

const UniswapStakePoolsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_UNISWAPSTAKEPOOLS:
      const stakePools = action.payload;

      const newState = {stakePools};

      return newState;

    default:
      return state;
  }
};

export default UniswapStakePoolsReducer;
