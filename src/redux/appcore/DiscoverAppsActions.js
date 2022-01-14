import {ADD_DISCOVERAPPS} from '../types';
import axios from 'axios';

export const GetDiscoverApps = user_id => {
  console.log(user_id, 'user_id passed to actions api calls');

  return dispatch => {
    let res = [];

    axios
      .get('https://run.mocky.io/v3/66004f3d-e25e-43e8-a95e-a44a5a614508')
      .then(response => (res = response.data))
      .then(() =>
        dispatch({
          type: ADD_DISCOVERAPPS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
