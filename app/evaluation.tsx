import React from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import dashCardStyles from '@/styles/dashboardCardStyles';
import { Link } from 'expo-router';

interface EvaluationProps {
  userLogin: string | undefined;
}

const Evaluation: React.FC<EvaluationProps> = ({ userLogin }) => {
  return (
    <View style={dashCardStyles.card}>
      <Text style={dashCardStyles.cardText}>
        In Evaluation
      </Text>
    </View>
  );
};
export default Evaluation;
