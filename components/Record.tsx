import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { saveRecording } from './FileSystem/downloadFiles';
import PlayBackAudio from './PlaybackAudio';
import Confirm from './Confirm';
import { textLanguage } from '../assets/textTranslate/textLanguage';

export default function Record() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined
  );
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [uriFileSys, setUriFileSys] = useState<string | null>();
  const tl = textLanguage.record
  
  async function startRecording() {
    try {
      if (permissionResponse && permissionResponse.status !== 'granted') {
        await requestPermission();
      } else {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRecording);
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }``

  async function stopRecording() {
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        const uriCache = recording.getURI();

        saveRecording(uriCache, 'AudioRecording.m4a', setUriFileSys); // downloads to FileSystem
      } catch (err) {
        console.error('Failed to stop recording', err);
      } finally {
        setRecording(undefined);
      }
    } else {
      console.log('No recording');
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? tl['Stop_Recording'] : tl['Start_Recording']}
        onPress={recording ? stopRecording : startRecording}
      />
      {uriFileSys && <PlayBackAudio uriFileSys={uriFileSys} />}
      {uriFileSys && <Confirm uriFileSys={uriFileSys}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
