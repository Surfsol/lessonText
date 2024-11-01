import React, { useState } from 'react';
import { Button, Text } from 'react-native';
interface Confirm {
  uriFileSys: string | null | undefined;
}

const Confirm: React.FC<Confirm> = ({ uriFileSys }) => {
  console.log('in Confirm', uriFileSys);
  const [transcribeTxt, setTranscirbeTxt] = useState<string | null>();

  const transcribe = async () => {
    const formData = new FormData();
    formData.append('audio', {
      uri: uriFileSys,
      type: 'audio/m4a',
      name: 'recording.m4a',
    });
    const settings = {
      method: 'POST',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
      body: formData
    };
    let result;
    try {
      result = await fetch('http://127.0.0.1:5000/transcribe', settings);
      console.log({ result });
      result = await result.json();
    } catch (error) {
      console.log('error');
    }
    if (result) {
      console.log(result);
      setTranscirbeTxt(result);
    }
  };

  const buttonOrTxt = () => {
    if (transcribeTxt) {
      console.log('intranscribe');
      return <Text>{transcribeTxt}</Text>;
    } else {
      console.log('intranscribe button');
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
