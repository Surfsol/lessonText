import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';

interface AuthModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  message: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isVisible,
  onCloseModal,
  message,
}) => {
  console.log('in auth moooo', isVisible);
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      {/* Background overlay */}
      <Pressable style={styles.overlay} onPress={onCloseModal}>
        <View style={styles.modalContent}>
          {/* Title Container */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{message}</Text>
          </View>
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
