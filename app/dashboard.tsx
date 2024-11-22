import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Link } from 'expo-router';
import dashCardStyles from '@/styles/dashboardCardStyles';
import { useRouter } from 'expo-router';
interface DashboardProps {
  userLogin: string | undefined;
  setUserLogin: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Dashboard: React.FC<DashboardProps> = ({ userLogin, setUserLogin }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/evaluation')}>
        <View style={dashCardStyles.card}>
          <Text style={dashCardStyles.cardText}>
            Ready to evaluate your speaking level?
          </Text>
        </View>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/travel')}>
        <View style={dashCardStyles.card}>
          <Text style={dashCardStyles.cardText}>Travel</Text>
        </View>
        </TouchableOpacity>
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
  },
});
