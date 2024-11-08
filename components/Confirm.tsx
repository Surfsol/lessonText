import React, { useState } from 'react';
import { Button, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { textLanguage } from '../assets/textTranslate/textLanguage';

interface Confirm {
  uriFileSys: string | null | undefined;
}

const Confirm: React.FC<Confirm> = ({ uriFileSys }) => {
  if (!uriFileSys) return;
  const [transcribeTxt, setTranscirbeTxt] = useState<string | null>();
  const tl = textLanguage.confirm
  const transcribe = async () => {
    let result;
    if(transcribeTxt)setTranscirbeTxt(null)
    try {
      // Read the file as base64
      const base64Audio = await FileSystem.readAsStringAsync(uriFileSys, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audio: base64Audio, filename: 'recording.m4a' }),
      };
      const response = await fetch('https://flask-server-transcribe.onrender.com/transcribe', settings);
      console.log('confirm',{ response });
      result = await response.json() // did not console.log
      console.log('confirm',{ result });
      if(result.error) setTranscirbeTxt(result.error)
      if(result._bodyBlob) result = await result._bodyBlob._data.json();
      if(typeof result === 'string') setTranscirbeTxt(result);
    } catch (error) {
      console.log('error try catch Confirm', { error });
      if(typeof error === 'string') setTranscirbeTxt(result);
    }
  };

  const buttonOrTxt = () => {
    if (transcribeTxt) {
      return <Text>{transcribeTxt}</Text>;
    } else {
      return (
        <>
          <Button title= {tl['Confirm']} onPress={transcribe} />
        </>
      );
    }
  };

  return <>{buttonOrTxt()}</>;
};
export default Confirm;
