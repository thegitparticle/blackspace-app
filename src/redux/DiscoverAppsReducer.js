import {ADD_DISCOVERAPPS} from './types';

const INITIAL_STATE = {
  discoverapps: [],
};

const DiscoverAppsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_DISCOVERAPPS:
      const discoverapps = action.payload;

      const newState = {discoverapps};

      return newState;

    default:
      return state;
  }
};

export default DiscoverAppsReducer;
