import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Evaluation from './Evaluation';
import Travel from './Travel';

interface DashboardProps {
  userLogin: string | undefined;
  setUserLogin: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Dashboard: React.FC<DashboardProps> = ({ userLogin, setUserLogin }) => {
  return (
    <View style={styles.container}>
      <Evaluation userLogin={userLogin} />
      <Travel userLogin={userLogin} />
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
