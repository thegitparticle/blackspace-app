import {ADD_MYNFTS} from '../types';

const initial_state = {
  mynfts: [],
};

const MyNFTsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_MYNFTS:
      const mynfts = action.payload;
      const newState = {mynfts};
      return newState;
    default:
      return state;
  }
};

export default MyNFTsReducer;
