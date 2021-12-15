import {LOGIN, LOGOUT} from './types';

const INITIAL_STATE = {
  logged_in_or_not: false,
};

const AuthStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      var logged_in_or_not = true;
      const newState = {logged_in_or_not};
      return newState;

    case LOGOUT:
      var logged_in_or_not = false;
      const newState2 = {logged_in_or_not};
      return newState2;

    default:
      return state;
  }
};

export default AuthStateReducer;
