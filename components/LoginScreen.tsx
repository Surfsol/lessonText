import React, { useState } from 'react';
import { Button, View, StyleSheet, Text, TextInput } from 'react-native';

interface LoginScreenProps {
  setUserLogin: React.Dispatch<React.SetStateAction<Object | undefined>>;
}

interface EmailPass {
  email: string;
  password: string;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [emailPass, setEmailPass] = useState<EmailPass>({
    email: '',
    password: '',
  });
  const handleLogin = () => {
    
    //setEmailPass()
  };
  console.log({ emailPass });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.title}
        placeholder='Enter your email'
        keyboardType='email-address' // for showing the email keyboard
        autoCapitalize='none'
        value={emailPass.email}
        id='email'
        onChangeText={(text) => setEmailPass({ ...emailPass, email: text })}
      ></TextInput>
      <Text style={styles.title}>Password</Text>
      <TextInput
        style={styles.title}
        placeholder='Enter your password'
        secureTextEntry // hides the password input
        autoCapitalize='none'
        value={emailPass.password}
        id='password'
        onChangeText={(text) => setEmailPass({ ...emailPass, password: text })}
      ></TextInput>
      <Button title='Login' onPress={handleLogin} />
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 12,
    backgroundColor: '#fff',
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
