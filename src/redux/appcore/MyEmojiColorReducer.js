import {ADD_EMOJICOLOR} from '../types';

const initial_state = {
  details: {
    emoji: '🚀',
    color: '#53F4FF',
  },
};

const MyEmojiColorReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_EMOJICOLOR:
      const details = action.payload;
      const newState = {details};
      return newState;
    default:
      return state;
  }
};

export default MyEmojiColorReducer;
