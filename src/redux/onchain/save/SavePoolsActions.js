// ADD_SAVEPOOLS
import {supabase} from '../../../miscsetups/supabaseClient';
import {ADD_SAVEPOOLS} from '../../types';

export const GetSavePools = () => async dispatch => {
  try {
    const {data, error} = await supabase.from('Save Pools').select();
    if (error) {
      console.log(error);
    }

    console.log(data);

    dispatch({type: ADD_SAVEPOOLS, payload: data});
  } catch (err) {
    console.log(err);
  }
};
