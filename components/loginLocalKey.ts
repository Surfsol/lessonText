import AsyncStorage from '@react-native-async-storage/async-storage';

const loginLocalKey = async (
  setUserLogin: React.Dispatch<React.SetStateAction<Object | undefined>>
) => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    console.log('Stored keys:', allKeys);
    const value = await AsyncStorage.getItem('supabase.auth.token');
    console.log({ value });
    if (value !== null) {
      console.log({ value });
      // value previously stored
      setUserLogin(JSON.parse(value));
    }
  } catch (e) {
    // error reading value
    console.error('Error reading AsyncStorage data', e);
  }
};
export default loginLocalKey;
