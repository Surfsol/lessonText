import { Button, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function ButtonSpeech() {
  const speak = () => {
    const thingToSay = 'Bem Vindo Mio';
    Speech.speak(thingToSay);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Press to Speak</Text>

      <Button title='Press to hear some words' onPress={speak} />

      <EditScreenInfo path='app/(tabs)/index.tsx' />
    </View>
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
