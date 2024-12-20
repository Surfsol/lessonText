import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

interface AuthModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  message: string;
  isLogin?: boolean | null;
  setLogOrReg?: React.Dispatch<React.SetStateAction<string>> | null;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isVisible,
  onCloseModal,
  message,
  isLogin,
  setLogOrReg,
}) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType='slide'>
      {/* Background overlay */}
      <Pressable style={styles.overlay} onPress={onCloseModal}>
        <View style={styles.modalContent}>
          {/* Title Container */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{message}</Text>
          </View>
          {isLogin &&
            !message.includes('not confirm') &&
            typeof setLogOrReg === 'function' && (
              <TouchableOpacity onPress={() => setLogOrReg('reg')}>
                <Text style={styles.createAccountLink}>Create an Account</Text>
              </TouchableOpacity>
            )}
          <Pressable style={styles.button} onPress={onCloseModal}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default AuthModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'flex-end', // Align modal at the bottom
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    padding: 20,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
  },
  title: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createAccountLink: {
    color: '#007bff',
    textAlign: 'center',
    marginVertical: 12,
    fontSize: 28,
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4c8bf5',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
