import {ADD_MYPROFILEDETAILS, GET_MYPROFILEDETAILS} from './types';

const initial_state = {
  myProfileDetails: {
    username: null,
    userid: null,
  },
};

const MyProfileReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_MYPROFILEDETAILS:
      var myProfileDetails = action.payload;
      const newState = {myProfileDetails};
      return newState;
    default:
      return state;
  }
};

export default MyProfileReducer;
