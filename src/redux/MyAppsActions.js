import {ADD_MYAPPS} from './types';
import axios from 'axios';

export const GetMyApps = user_id => {
  return dispatch => {
    let res = [];

    axios
      .get('https://run.mocky.io/v3/0db8ff64-1dd6-4ec9-a88a-efbc1b8265a9')
      .then(response => (res = response.data))
      .then(() =>
        dispatch({
          type: ADD_MYAPPS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
