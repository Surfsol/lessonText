import { supabase } from './supabase';

const getSB = async (table: string) => {
  const { data, error } = await supabase.from(table).select();
  console.log({ data, error });
};
const postSB = () => {};

const authUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log({ error });
    return { success: false, message: error.message };
  }
  return { success: true, user: data.user };
};

const signUp = async (email: string, password: string) => {console.log('in signup')
  try{
    const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.log({ error });
    return { success: false, message: error.message };
  }
  console.log({error, data})
  return { success: true, data };
} catch (err) {
    console.log({err})
    return { success: false, message: err };
}
};
export { getSB, postSB, authUser, signUp };
