import React, { useState } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { createHash } from '@/utils/bcrypt';

interface SetLogOrRegProps {
  setLogOrReg: React.Dispatch<React.SetStateAction<string>>;
}

interface UserInfo {
  user_name: string;
  email: string;
  native_language: string;
  target_language: string;
  password: string;
  password_hash: string | null;
}
interface Errors {
  user_name: string | null;
  email: string | null;
  native_language: string | null;
  target_language: string | null;
  password: string | null;
}

const Register: React.FC<SetLogOrRegProps> = ({ setLogOrReg }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    user_name: '',
    email: '',
    native_language: '',
    target_language: '',
    password: '',
    password_hash: null,
  });
  const [errors, setErrors] = useState<Errors>({
    user_name: null,
    email: null,
    native_language: null,
    target_language: null,
    password: null,
  });

  const validateForm = () => {
    console.log('validate form');
    let validationErrors: Errors = {
      user_name: null,
      email: null,
      native_language: null,
      target_language: null,
      password: null,
    };

    if (!userInfo.user_name) {
      validationErrors.user_name = 'User name is required.';
    }
    if (!userInfo.email) {
      validationErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      validationErrors.email = 'Email is invalid.';
    }
    if (!userInfo.native_language) {
      validationErrors.native_language = 'Native language is required.';
    }
    if (!userInfo.target_language) {
      validationErrors.target_language = 'Target language is required.';
    }
    if (!userInfo.password) {
      validationErrors.password = 'Password is required.';
    } else if (userInfo.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(validationErrors);
    console.log({ validationErrors });
    let result = Object.values(validationErrors).every(
      (error) => error === null
    );
    return result
  };

  const handleRegister = async () => {
    console.log(userInfo);
    const validForm = await validateForm();
    if (validForm) {
      console.log('in is valid');
      // Submit the form
      userInfo.password_hash = await createHash(userInfo.password);
      if (userInfo.password_hash) {
        //verify
        console.log(userInfo.password_hash);
      }
      console.log('Registration data:', userInfo);
    } else {
      console.log('form not valid false');
    }
  };

  const getInputStyle = (error: string | null) => [
    styles.input,
    error ? styles.inputError : {},
  ];

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={getInputStyle(errors.user_name)}
        placeholder='Create a User Name'
        value={userInfo.user_name}
        onChangeText={(text) => setUserInfo({ ...userInfo, user_name: text })}
      />
      {errors.user_name && (
        <Text style={styles.errorText}>{errors.user_name}</Text>
      )}

      <TextInput
        style={getInputStyle(errors.email)}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        value={userInfo.email}
        onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={getInputStyle(errors.native_language)}
        placeholder='Native Language'
        value={userInfo.native_language}
        onChangeText={(text) =>
          setUserInfo({ ...userInfo, native_language: text })
        }
      />
      {errors.native_language && (
        <Text style={styles.errorText}>{errors.native_language}</Text>
      )}

      <TextInput
        style={getInputStyle(errors.target_language)}
        placeholder='Target Language'
        value={userInfo.target_language}
        onChangeText={(text) =>
          setUserInfo({ ...userInfo, target_language: text })
        }
      />
      {errors.target_language && (
        <Text style={styles.errorText}>{errors.target_language}</Text>
      )}

      <TextInput
        style={getInputStyle(errors.password)}
        placeholder='Password'
        secureTextEntry
        autoCapitalize='none'
        value={userInfo.password}
        onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setLogOrReg('logIn')}>
        <Text style={styles.logInLink}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  contentContainer: {
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
    marginHorizontal: 20,
    maxWidth: '90%',
  },
  inputError: {
    borderColor: '#ff7675',
  },
  logInLink: {
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
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
