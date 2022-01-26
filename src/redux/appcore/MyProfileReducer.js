import {ADD_MYPROFILEDETAILS} from '../types';

const initial_state = {
  myProfileDetails: {
    user: {
      id: 0,
      wallet_address: '',
      username: '',
    },
    id: 2,
    erc20_token_holdings: '',
    eth_balance: '',
    portfolio_value: '0',
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
