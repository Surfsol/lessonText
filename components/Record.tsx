import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { saveRecording } from './FileSystem/DownloadFiles';

export default function Record() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined
  );
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [uri, setUri] = useState<String | null>();

  async function startRecording() {
    try {
      if (permissionResponse && permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
      console.log('Recording started', recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (recording) {
      console.log('Stopping recording..');
      try {
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        const uriFile = recording.getURI();
        setUri(uriFile);
        saveRecording(uriFile, 'AudioRecording.m4a');
        console.log('Recording stopped and stored at', uriFile);
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
        title={recording ? 'Stop Recording' : 'Startrr Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
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
