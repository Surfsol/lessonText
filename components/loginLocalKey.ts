import AsyncStorage from '@react-native-async-storage/async-storage';

 

const loginLocalKey  = async (setUserLogin: React.Dispatch<React.SetStateAction<Object | undefined>>) => {
    try {
      const value = await AsyncStorage.getItem('Lesson');
      if (value !== null) {
        console.log({value})
        // value previously stored
        setUserLogin(JSON.parse(value))
      } else {console.log('value null for login token')}
    } catch (e) {
      // error reading value
      console.error("Error reading AsyncStorage data", e);
    }
}
export default loginLocalKey