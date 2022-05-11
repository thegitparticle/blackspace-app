import {ADD_SECRETSETTINGS} from '../types';

const initial_state = {
  secretsettings: false,
};

const SecretSettingsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_SECRETSETTINGS:
      var secretsettings = action.payload;
      const newState = {secretsettings};
      return newState;
    default:
      return state;
  }
};

export default SecretSettingsReducer;
