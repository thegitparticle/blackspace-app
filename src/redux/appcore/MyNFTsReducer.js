import {ADD_MYNFTS} from '../types';

const initial_state = {
  tokens: [],
};

const MyNFTsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_MYNFTS:
      const tokens = action.payload;
      const newState = {tokens};
      return newState;
    default:
      return state;
  }
};

export default MyNFTsReducer;
