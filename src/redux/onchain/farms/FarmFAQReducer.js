import {ADD_FARMFAQS} from '../../types';

const initial_state = {
  farm_faqs: [],
};

const FarmFAQReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_FARMFAQS:
      const farm_faqs = action.payload;
      const newState = {farm_faqs};
      return newState;
    default:
      return state;
  }
};

export default FarmFAQReducer;
