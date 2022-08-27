import {ADD_HOMORAV2FARMS} from '../types';

const initial_state = {
  homora_farms: [],
};

const HomoraFarmsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_HOMORAV2FARMS:
      const homora_farms = action.payload;
      const newState = {homora_farms};
      return newState;
    default:
      return state;
  }
};

export default HomoraFarmsReducer;
