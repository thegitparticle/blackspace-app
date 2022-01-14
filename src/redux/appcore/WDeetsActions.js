import {GET_WDEETS, ADD_WDEETS} from '../types';

export const AddWDeets = wdeets => {
  return dispatch => {
    dispatch({
      type: ADD_WDEETS,
      payload: wdeets,
    });
  };
};
