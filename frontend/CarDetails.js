import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
const CarDetailsScreen = ({ route, navigation }) => {
  const { car, user } = route.params;

  const handleChatPress = () => {
    // Navigate to the ChattingScreen 
    navigation.navigate("ChatScreen")
  };
  const verifyToken = (token) => {
    try {
      // Decode the token payload
      const decoded = jwtDecode(token);
  
      // Extract the information from the decoded payload
      const { userId, username, email } = decoded;
  
      // Return an object with the extracted information
      return {
        userId,
        username,
        email,
      };
    } catch (error) {
      // If decoding or any error occurs, return null
      return null;
    }
  };
  const handleAddToFavorites = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        console.error('Token not available');
        return;
      }
  
      const requestBody = { carId: car._id }; // Assuming the car object has an '_id' property
  
      const response = await axios.post('http://192.168.1.108:3000/users/favorites', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        console.log('Car added to favorites successfully');
        // Refresh the favorites list after successful addition
        
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error('Car already in favorites');
      } else {
        console.error('Error adding car to favorites:', error);
      }
    }
  };
  
  
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{car.make}</Text>
      <Text style={styles.model}>{car.model}</Text>

      <View style={styles.slideContainer}>
        <ScrollView horizontal pagingEnabled>
          {car.pictures.map((picture, index) => (
            <Image key={index} source={{ uri: picture }} style={styles.picture} resizeMode="contain" />
          ))}
        </ScrollView>
      </View>

      <Text style={styles.price}>Price: ${car.price}</Text>

      <Text style={styles.subtitle}>Description:</Text>
      <Text style={styles.description}>{car.description}</Text>

      {user && (
        <View style={styles.sellerContactZone}>
          <Text style={styles.contactTitle}>Contact Seller:</Text>
          <Text style={styles.contactInfo}>Email: {user.email}</Text>
          <Text style={styles.contactInfo}>Phone: {user.phoneNumber}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.addToFavoritesButton} onPress={handleAddToFavorites}>
        <Text style={styles.addToFavoritesButtonText}>Add to Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
        <Text style={styles.chatButtonText}>Chat with Seller</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 8,
  },
  model: {
    fontSize: 18,
    marginBottom: 16,
  },
  slideContainer: {
    height: 300,
    marginBottom: 16,
  },
  picture: {
    width: 300,
    height: 200,
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
  sellerContactZone: {
    marginTop: 24,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 16,
    borderRadius: 4,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  addToFavoritesButton: {
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  addToFavoritesButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatButton: {
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  chatButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});


export default CarDetailsScreen;
