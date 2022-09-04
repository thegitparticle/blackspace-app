import {createClient} from '@supabase/supabase-js';
import Config from 'react-native-config';

const supabaseUrl = Config.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = Config.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
