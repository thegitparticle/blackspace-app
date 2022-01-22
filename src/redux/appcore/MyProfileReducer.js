import {ADD_MYPROFILEDETAILS} from '../types';

const initial_state = {
  myProfileDetails: {
    username: null,
    userid: null,
    wallet_address: null,
  },
};

const MyProfileReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_MYPROFILEDETAILS:
      const myProfileDetails = action.payload;
      const newState = {myProfileDetails};
      return newState;
    default:
      return state;
  }
};

export default MyProfileReducer;
