import {ADD_SECRETSETTINGS} from '../types';

export const ChangeSecretSettings = secretsettings => {
  return dispatch => {
    dispatch({
      type: ADD_SECRETSETTINGS,
      payload: secretsettings,
    });
  };
};
