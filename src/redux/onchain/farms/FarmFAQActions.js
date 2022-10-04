import {supabase} from '../../../miscsetups/supabaseClient';
import {ADD_FARMFAQS} from '../../types';

export const GetFarmFaqs = () => async dispatch => {
  try {
    const {data, error} = await supabase.from('Farms FAQs').select('*');
    if (error) {
      console.log(error);
    }

    console.log(data);

    dispatch({type: ADD_FARMFAQS, payload: data});
  } catch (err) {
    console.log(err);
  }
};
