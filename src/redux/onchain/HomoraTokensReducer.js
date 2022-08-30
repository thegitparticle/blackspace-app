import {ADD_HOMORAV2TOKENS} from '../types';

const initial_state = {
  homora_tokens: [],
};

const HomoraTokensReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_HOMORAV2TOKENS:
      const homora_tokens = action.payload;
      const newState = {homora_tokens};
      return newState;
    default:
      return state;
  }
};

export default HomoraTokensReducer;
