import {useEffect, useState} from 'react'
import { Button, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Record from '@/components/Record';
import { textLanguage } from '@/assets/textTranslate/textLanguage';
import LoginScreen from '@/components/LoginScreen';
import loginLocalKey from '@/components/loginLocalKey';


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
        <LoginScreen setUserLogin={setUserLogin}/>
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

// {"voices": [{"identifier": "ur-PK-language", "language": "ur-PK", "name": "ur-PK-language", "quality": "Enhanced"}, {"identifier": "kn-in-x-knm-network", "language": "kn-IN", "name": "kn-in-x-knm-network", "quality": "Enhanced"}, {"identifier": "ru-ru-x-rud-local", "language": "ru-RU", "name": "ru-ru-x-rud-local", "quality": "Enhanced"}, {"identifier": "sv-se-x-lfs-local", "language": "sv-SE", "name": "sv-se-x-lfs-local", "quality": "Enhanced"}, {"identifier": "cmn-tw-x-ctc-network", "language": "zh-TW", "name": "cmn-tw-x-ctc-network", "quality": "Enhanced"}, {"identifier": "pt-br-x-afs-network", "language": "pt-BR", "name": "pt-br-x-afs-network", "quality": "Enhanced"}, {"identifier": "bn-BD-language", "language": "bn-BD", "name": "bn-BD-language", "quality": "Enhanced"}, {"identifier": "pt-pt-x-sfs-network", "language": "pt-PT", "name": "pt-pt-x-sfs-network", "quality": "Enhanced"}, {"identifier": "en-in-x-ene-network", "language": "en-IN", "name": "en-in-x-ene-network", "quality": "Enhanced"}, {"identifier": "vi-vn-x-vid-network", 
// "language": "vi-VN", "name": "vi-vn-x-vid-network", "quality": "Enhanced"}, {"identifier": "yue-hk-x-yud-network", "language": "yue-HK", "name": "yue-hk-x-yud-network", "quality": "Enhanced"}, {"identifier": "en-gb-x-gba-network", "language": "en-GB", "name": "en-gb-x-gba-network", "quality": "Enhanced"}, {"identifier": "pl-pl-x-bmg-network", "language": "pl-PL", "name": "pl-pl-x-bmg-network", "quality"