import {ADD_MEMECOINSLIST} from '../../types';

const INITIAL_STATE = {
  memecoinslist: [],
};

const MemeCoinsListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MEMECOINSLIST:
      const memecoinslist = action.payload;

      const newState = {memecoinslist};

      return newState;

    default:
      return state;
  }
};

export default MemeCoinsListReducer;
