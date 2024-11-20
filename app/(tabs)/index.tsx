import {useEffect, useState} from 'react'
import { Button, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Record from '@/components/Record';
import { textLanguage } from '@/assets/textTranslate/textLanguage';
import LoginScreen from '@/components/LoginScreen';
import loginLocalKey from '@/components/loginLocalKey';
import Dashboard from '@/components/Dashboard';

export default function ButtonSpeech() {
  const [availableVoices, setAvailableVoices] = useState<Speech.Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Speech.Voice | undefined>(undefined);
  const [userLogin, setUserLogin] = useState<Object | undefined>()
  const tl = textLanguage.index
  const speak = () => {
    const thingToSay = 'Bem Vindo Mio';

    const options: Speech.SpeechOptions = {
      language: 'pt-BR', // Setting language to Brazilian Portuguese
      pitch: 1.2, // Slightly higher pitch
      rate: 0.9, // Slower rate
      voice: selectedVoice?.identifier, // Using the selected voice
      volume: 1.0, // Maximum volume
      onDone: () => console.log('Speech finished'),
      onError: (error) => console.error('Error occurred:', error),
    };

    Speech.speak(thingToSay, options);
  };

  useEffect(() => {
    loginLocalKey(setUserLogin)
  }, [])
  
  useEffect(() => {
    // Fetch the available voices when the component mounts
    Speech.getAvailableVoicesAsync().then((voices) => {
      console.log(voices[5])
      setAvailableVoices(voices);
      setSelectedVoice(voices[5]); // Set the first available voice as default
    });
  }, []);

  const homeView = () => {
    if(userLogin === undefined){
      //Login screen
      return(
        <Dashboard setUserLogin={setUserLogin} userLogin={userLogin}/>
      )
    } else {
      return (
      <View style={styles.container}>
      <Text style={styles.title}>{tl['Press to Speak']}</Text>

      <Button title= {tl['Press to hear some words']} onPress={speak} />
      <Record/>

      <EditScreenInfo path='app/(tabs)/index.tsx' />
    </View>
      )
    }
  }

  return (
    homeView()
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
