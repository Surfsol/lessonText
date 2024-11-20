import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import dashCardStyles from '@/styles/dashboardCardStyles'

interface TravelProps {
  userLogin: string | undefined;
}

const Travel: React.FC<TravelProps> = ({ userLogin }) => {
  return (
    <View style={dashCardStyles.card}>
      <Text style={dashCardStyles.cardText}>Travel</Text>
      <TouchableOpacity
        style={dashCardStyles.button}
        // onPress={}
      >
        <Text style={dashCardStyles.buttonText}>Communicating with Locals</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Travel;

