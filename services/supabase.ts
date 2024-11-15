import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Create a single supabase client for interacting with your database
const url = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const key = process.env.EXPO_PUBLIC_SUPABASE_KEY || '';
const supabase = createClient(url, key, {
    auth: {
      storage: AsyncStorage, // Persist user session
    },
  });

export {supabase}

