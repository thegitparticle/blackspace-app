import {ADD_ALLTIPS} from '../types';

const INITIAL_STATE = {
  alltips: [],
};

const AllTipsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ALLTIPS:
      const alltips = action.payload;

      const newState = {alltips};

      return newState;

    default:
      return state;
  }
};

export default AllTipsReducer;
