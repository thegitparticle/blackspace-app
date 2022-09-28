import {ADD_HOMORAV2APYS} from '../types';

const initial_state = {
  homora_apys: {},
};

const HomoraAPYsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_HOMORAV2APYS:
      const homora_apys = action.payload;
      const newState = {homora_apys};
      return newState;
    default:
      return state;
  }
};

export default HomoraAPYsReducer;
