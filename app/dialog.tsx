import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { dialogScript } from '@/utils/chatRespons';
import * as Speech from 'expo-speech';

interface SpeakerObj {
  [key: string]: number;
}

const Dialog: React.FC = () => {
  const [availableVoices, setAvailableVoices] = useState<Speech.Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Speech.Voice | undefined>(
    undefined
  );
  const [speech, setSpeech] = useState();
  const [speakers, setSpeakers] = useState<SpeakerObj>({});
  const languageSpk = 'es-US';

  useEffect(() => {
    // Fetch the available voices when the component mounts
    let objSpks: SpeakerObj = {};
    let idxArr: number[] = [];
    Speech.getAvailableVoicesAsync()
      .then((voices) => {
        setAvailableVoices(voices);
        for (let i = 0; i < voices.length; i++) {
          if (
            voices[i]['language'] === languageSpk &&
            voices[i]['quality'] === 'Enhanced'
          ) {
            idxArr.push(i); // array of index of languge to use
            console.log({ i }, idxArr);
          }
        }
        return idxArr;
      })
      .then((idxArr) => {
        console.log({ idxArr });
        Object.values(dialogScript).map((e) => {
          let colonIndex = e.indexOf(':');
          let person: string = e.substring(0, colonIndex).replace(/\*\*/g, '').replace(':', '');
          if (objSpks[person] === undefined) {
            // typescript error Property 'person' does not exist on type 'SpeakerVar[]'.
            objSpks[person] = idxArr[0];
            console.log({objSpks})
            idxArr.shift();
          }
        });
        setSpeakers(objSpks);
      });
  }, []);
  console.log({ speakers });
  const speak = (person: string, toSay: string) => {
    // speaker will set selected voice
    console.log({ speakers, person }, speakers[person.replace(':', '')]);
    let voice = availableVoices[speakers[person.replace(':', '')]];
    console.log({ voice });
    const options: Speech.SpeechOptions = {
      language: languageSpk, // Setting language to Brazilian Portuguese
      pitch: 1.2, // Slightly higher pitch
      rate: 0.9, // Slower rate
      voice: voice?.identifier, // Using the selected voice
      volume: 1.0, // Maximum volume
      onDone: () => console.log('Speech finished'),
      onError: (error) => console.error('Error occurred:', error),
    };

    Speech.speak(toSay, options);
  };

  useEffect(() => {}, []);
  console.log({ speakers });
  return (
    <View>
      {Object.entries(dialogScript).map(([id, line]) => {
        let arrayLine = line.split('**');
        let speaker = String(arrayLine[1]);

        let lineText = arrayLine[2];
        return (
          <TouchableOpacity key={id} onPress={() => speak(speaker, lineText)}>
            <Text style={styles.dialogLine}>
              <Text style={styles.speaker}>{speaker}</Text> {lineText}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default Dialog;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  dialogLine: {
    marginVertical: 4,
    fontSize: 16,
    lineHeight: 24,
    padding: 10,
  },
  speaker: {
    fontWeight: 'bold',
  },
});
