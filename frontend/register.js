import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (firstName === '' || lastName === '' || username === '' || email === '' || phoneNumber === '' || password === '') {
      console.error('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.108:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, username, email, phoneNumber, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { user, token } = data;
        console.log('Registration successful');
        // Save the token in your app's storage (e.g., AsyncStorage) for future requests
        // You can use any storage mechanism suitable for your app
        // For example, using AsyncStorage from '@react-native-async-storage/async-storage' package:
        // await AsyncStorage.setItem('token', token);
        navigation.navigate('SellCar');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
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
    //height: 50,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
     //style de la page register
     width: '100%',
     height: 55,
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
    //borderWidth: 1,
    //borderColor: '#ccc',
    //padding: 10,
    //marginBottom: 10,
  },
  button: {
    width: '40%',
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
  loginText: {
    color: '#0A4C92',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RegisterScreen;
