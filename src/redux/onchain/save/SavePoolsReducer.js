// ADD_SAVEPOOLS
import {ADD_SAVEPOOLS} from '../../types';

const initial_state = {
  save_pools: [],
};

const SavePoolsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_SAVEPOOLS:
      const save_pools = action.payload;
      const newState = {save_pools};
      return newState;
    default:
      return state;
  }
};

export default SavePoolsReducer;
