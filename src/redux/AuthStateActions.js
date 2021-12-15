import {LOGIN, LOGOUT} from './types';

export const logInAction = () => ({
  type: LOGIN,
});

export const logOutAction = () => ({
  type: LOGOUT,
});
