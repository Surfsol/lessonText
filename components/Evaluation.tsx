import React from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import dashCardStyles from '@/styles/dashboardCardStyles';
interface EvaluationProps { userLogin: string | undefined}

const Evaluation: React.FC<EvaluationProps> = ({ userLogin }) => {
    return(<View style={dashCardStyles.card}>
      <Text style={dashCardStyles.cardText}>
        Ready to evaluate your speaking level?
      </Text>
      <TouchableOpacity
        style={dashCardStyles.button}
        // onPress={}
      >
        <Text style={dashCardStyles.buttonText}>Evaluate Speaking</Text>
      </TouchableOpacity>
    </View>)
}
export default Evaluation