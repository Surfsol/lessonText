import React, { useState } from 'react';
import { Button, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface Confirm {
  uriFileSys: string | null | undefined;
}

const Confirm: React.FC<Confirm> = ({ uriFileSys }) => {
  if (!uriFileSys) return;
  const [transcribeTxt, setTranscirbeTxt] = useState<string | null>();

  const transcribe = async () => {
    let result;

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
      const response = await fetch('https://flask-server-transcribe.onrender.com', settings);
      console.log('confirm',{ response });
      result = await response.json() // did not console.log
      console.log('confirm',{ result });
      if(result._bodyBlob) result = await result._bodyBlob._data.json();
    } catch (error) {
      console.log('error try catch Confirm', { error });
    }
    if (result) {
      console.log(result);
      setTranscirbeTxt(result);
    }
  };

  const buttonOrTxt = () => {
    if (transcribeTxt) {
      return <Text>{transcribeTxt}</Text>;
    } else {
      return (
        <>
          <Button title='Confirm' onPress={transcribe} />
        </>
      );
    }
  };

  return <>{buttonOrTxt()}</>;
};
export default Confirm;
