import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const url = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const key = process.env.EXPO_PUBLIC_SUPABASE_KEY || '';
const supabase = createClient(url, key);

const getSB = async (table: string) => {
  const { data, error } = await supabase.from(table).select();
  console.log({data, error})
};
const postSB = () => {};

export {getSB, postSB}