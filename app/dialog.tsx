import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { dialogScript } from '@/utils/chatRespons';

const Dialog: React.FC = () => {

  return (
    <View>
      {Object.entries(dialogScript).map(([id, line]) => {
        let arrayLine = line.split('**');
        console.log({ arrayLine }, arrayLine[0], arrayLine[1]);
        return (
          <Text key={id} style={styles.dialogLine}>
            <Text style={styles.speaker}>{arrayLine[1]}</Text> {arrayLine[2]}
          </Text>
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
