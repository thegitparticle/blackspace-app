//ADD_SOLWALLETDEETS

import {ADD_SOLWALLETDEETS} from '../types';

export const AddSolWalletDeets = solwalletdeets => {
  return dispatch => {
    dispatch({
      type: ADD_SOLWALLETDEETS,
      payload: solwalletdeets,
    });
  };
};
