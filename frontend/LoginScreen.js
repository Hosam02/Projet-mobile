import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.108:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        console.log('Logged in');
        saveTokenToStorage(token);
        navigation.navigate('SellCar');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const saveTokenToStorage = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerText}>Not a Seller? Register now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    //borderWidth: 1,
    //borderColor: '#ccc',
    //padding: 10,
    //marginBottom: 10,


    //style 
  width: '100%',
  height: 60,
  borderRadius: 20,
  backgroundColor: '#FFFFFF',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  paddingVertical: 20,
  marginVertical: 4,
  borderColor: '#0A4C92',
  borderWidth: 1,
  elevation: 2,
  shadowColor: '#CCCCCC',
  shadowRadius: 3,
  },
  button: {
    backgroundColor: '#0A4C92',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    color: '#0A4C92',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
