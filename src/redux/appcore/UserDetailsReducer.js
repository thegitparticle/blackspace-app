import {ADD_USERDETAILS} from '../types';

const initial_state = {
  userdetails: {
    id: null,
    username: null,
    wallet_address: null,
  },
};

const UserDetailsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_USERDETAILS:
      const userdetails = action.payload;
      const newState = {userdetails};
      return newState;
    default:
      return state;
  }
};

export default UserDetailsReducer;
