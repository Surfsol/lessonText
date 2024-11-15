import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import Register from './Register';
import { createHash } from '@/utils/bcrypt';
import { getSB } from '@/services/supabase';

interface LoginScreenProps {
  setUserLogin: React.Dispatch<React.SetStateAction<Object | undefined>>;
}

interface EmailPass {
  email: string;
  password: string;
  password_hash: string | undefined;
}

interface Errors {
  email: string | null;
  password: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [emailPass, setEmailPass] = useState<EmailPass>({
    email: '',
    password: '',
    password_hash: ''
  });
 // const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({ email: null, password: null });
  const [logOrReg, setLogOrReg] = useState<string>('logIn');
 

 

  const validateForm = () => {
    console.log('in validate form')
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
    //setErrors(errors);
   // console.log('errors', Object.values(errors).length, {errors}, Object.values(errors))
    let arr = []
    let valuesArray = Object.values(errors)
    console.log({valuesArray})
    for(let i=0; i < valuesArray.length; i++){
      if(valuesArray[i] != null) arr.push(valuesArray[i])
    }
  console.log({arr})
    if (arr.length === 0) {
      return 'valid'
    } 
    if (arr.length > 0) {
      return 'notValid'
    } 
  };

  const handleLogin = async() => {
    console.log('in handle')
    const isFormValid = await validateForm();
    console.log({isFormValid})
    if (isFormValid === 'valid') {
      // Submit form
      emailPass.password_hash = await createHash(emailPass.password)
      console.log(emailPass.password_hash)
      if(emailPass.password_hash){
        //verify 
        const tableFetch = getSB('Users')
        console.log({tableFetch})
      }
    }
  };

  const getInputStyle = (error: string | null) => [
    styles.input,
    error ? styles.inputError : {},
  ];
  const logReg = () => {
    if (logOrReg === 'logIn') {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
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
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <Text style={styles.title}>Password</Text>
          <TextInput
            style={getInputStyle(errors.password)}
            placeholder='Password'
            secureTextEntry // hides the password input
            autoCapitalize='none'
            value={emailPass.password}
            id='password'
            onChangeText={(text) =>
              setEmailPass({ ...emailPass, password: text })
            }
          ></TextInput>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLogOrReg('reg')}>
            <Text style={styles.createAccountLink}>Create an Account</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else {
      return <Register setLogOrReg={setLogOrReg}/>;
    }
  };
  return logReg();
};
export default LoginScreen;

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
    marginHorizontal: 25,
    maxWidth: '90%',   
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
    marginHorizontal: 32,
  },
  button: {
    backgroundColor: '#4c8bf5',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 20
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
