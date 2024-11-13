// @types/env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_LOCAL_IP: string;
      EXPO_PUBLIC_SUPABASE_KEY: string;
      EXPO_PUBLIC_SUPABASE_URL: string;
      EXPO_PUBLIC_SALT: string;
      // Add other environment variables here as needed
    }
  }
  