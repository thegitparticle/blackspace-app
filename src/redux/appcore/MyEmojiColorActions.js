// ADD_EMOJICOLOR
import {ADD_EMOJICOLOR} from '../types';

export const AddMyEmojiColor = details => {
  return dispatch => {
    dispatch({
      type: ADD_EMOJICOLOR,
      payload: details,
    });
  };
};
