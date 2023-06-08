import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SellCarScreen = () => {
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    pictures: '',
    description: '',
  });

  const navigation = useNavigation();

  const handleInputChange = (key, value) => {
    setCarData({ ...carData, [key]: value });
  };

  const handleSubmit = async () => {
    // Validate the form inputs
    if (carData.make === '' || carData.model === '' || carData.year === '' || carData.price === '') {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
  
    // Prepare the car object to be added to the database
    const car = {
      make: carData.make,
      model: carData.model,
      year: carData.year,
      price: carData.price,
      pictures: carData.pictures,
      description: carData.description,
    };
  
    try {
      // Retrieve the JWT token from the user session or storage
      const token = await AsyncStorage.getItem('token');
  
      // Make the API call to add the car to the database
      const response = await fetch('http://192.168.1.108:3000/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: JSON.stringify(car),
      });
  
      // Handle the API response
      if (response.ok) {
        // Show a success message
        Alert.alert('Success', 'Thank you for adding the car!');
  
        setCarData({
          make: '',
          model: '',
          year: '',
          price: '',
          pictures: '',
          description: '',
        });
      } else {
        // Show an error message
        Alert.alert('Error', 'Failed to add the car. Please try again.');
        console.log(response);
      }
    } catch (error) {
      // Handle any network or server errors
      Alert.alert('Error', 'An error occurred. Please try again later.');
      console.log(error);
    }
  };
  

  const handleSellCar = () => {
    // Navigate to the sell car page
    navigation.navigate('SellCarScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sell Your Car</Text>

      <TextInput
        style={styles.input}
        placeholder="Make"
        value={carData.make}
        onChangeText={(value) => handleInputChange('make', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Model"
        value={carData.model}
        onChangeText={(value) => handleInputChange('model', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Year"
        keyboardType="numeric"
        value={carData.year}
        onChangeText={(value) => handleInputChange('year', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={carData.price}
        onChangeText={(value) => handleInputChange('price', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Pictures (separated by commas)"
        value={carData.pictures}
        onChangeText={(value) => handleInputChange('pictures', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        value={carData.description}
        onChangeText={(value) => handleInputChange('description', value)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navButtonText}><AntDesign name="home" size={24} color="white" /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('SearchScreen')}>
          <Text style={styles.navButtonText}><FontAwesome name="search" size={24} color="white" /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sellCarButton} onPress={handleSellCar}>
          {/* Sell car icon */}
          <Ionicons name="ios-add" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('FavoritesScreen')}>
          <Text style={styles.navButtonText}><AntDesign name="hearto" size={24} color="white" /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Text style={styles.navButtonText}><MaterialIcons name="account-circle" size={24} color="white" /></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#0A4C92',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0A4C92',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sellCarButton: {
    backgroundColor: '#0A4C92',
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});

export default SellCarScreen;
