import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

interface LoginScreenProps {
  setUserLogin: React.Dispatch<React.SetStateAction<Object | undefined>>;
}

interface EmailPass {
  email: string;
  password: string;
}

interface Errors {
  email: string | null;
  password: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [emailPass, setEmailPass] = useState<EmailPass>({
    email: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({ email: null, password: null });
  const handleLogin = () => {
    validateForm();
    if (isFormValid) {
      // Submit form
    }
  };

  useEffect(() => {
    // Trigger form validation when name,
    // email, or password changes
  }, [emailPass]);

  const validateForm = () => {
    let errors: Errors = { email: null, password: null };

    // Validate email field
    if (!emailPass.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(emailPass.email)) {
      errors.email = 'Email is invalid.';
    }

    // Validate password field
    if (!emailPass.password) {
      errors.password = 'Password is required.';
    } else if (emailPass.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };
  const getInputStyle = (error: string | null) => [
    styles.input,
    error ? styles.inputError : {},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={getInputStyle(errors.email)}
        placeholder='Email'
        keyboardType='email-address' // for showing the email keyboard
        autoCapitalize='none'
        value={emailPass.email}
        id='email'
        onChangeText={(text) => setEmailPass({ ...emailPass, email: text })}
      ></TextInput>
      {errors.email && <Text>{errors.email}</Text>}
      <Text style={styles.title}>Password</Text>
      <TextInput
        style={getInputStyle(errors.password)}
        placeholder='Password'
        secureTextEntry // hides the password input
        autoCapitalize='none'
        value={emailPass.password}
        id='password'
        onChangeText={(text) => setEmailPass({ ...emailPass, password: text })}
      ></TextInput>
      {errors.password && <Text>{errors.password}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('Navigate to Create Account screen')}
      >
        <Text style={styles.createAccountLink}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9f9fb',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff7675',
  },
  createAccountLink: {
    color: '#007bff',
    textAlign: 'center',
    marginVertical: 12,
    fontSize: 28,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#ff7675',
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#4c8bf5',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  forgotText: {
    textAlign: 'center',
    color: '#4c8bf5',
    marginTop: 16,
    fontSize: 16,
  },
});
