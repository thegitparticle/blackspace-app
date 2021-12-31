import {ADD_MYAPPS} from './types';

const INITIAL_STATE = {
  myapps: [],
};

const MyAppsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MYAPPS:
      const myapps = action.payload;

      const newState = {myapps};

      return newState;

    default:
      return state;
  }
};

export default MyAppsReducer;
