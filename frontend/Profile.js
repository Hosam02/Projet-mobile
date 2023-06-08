import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';


const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [sellingCars, setSellingCars] = useState([]);

  useEffect(() => {
    getUserInfo();
    getSellingCars();
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get('http://192.168.1.108:3000/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user information: ${error.message}`);
    }
  };

  const getUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userInfo = await fetchUserInfo(token);
      setUser(userInfo);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  const fetchSellingCarsByUserId = async (userId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`http://192.168.1.108:3000/user/selling-cars`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the access token in the request headers
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching selling cars:', error);
      return [];
    }
  };

  const getSellingCars = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const cars = await fetchSellingCarsByUserId(userId);
      setSellingCars(cars);
    } catch (error) {
      console.error('Error fetching selling cars:', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>first name:</Text>
        <Text style={styles.info}>{user.firstName}</Text>
        <Text style={styles.label}>last name:</Text>
        <Text style={styles.info}>{user.lastName}</Text>
        <Text style={styles.label}>phone number:</Text>
        <Text style={styles.info}>{user.phoneNumber}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>

      <Text style={styles.subtitle}>Cars Being Sold:</Text>

      {sellingCars.length === 0 ? (
  <Text>No cars being sold.</Text>
) : (
  <FlatList
    data={sellingCars}
    keyExtractor={(item) => item._id.toString()}
    renderItem={({ item }) => (
      <View style={styles.carItem}>
        <Text style={styles.carInfo}>{item.make}</Text>
        <Text style={styles.carInfo}>{item.model}</Text>
        <Text style={styles.carInfo}>Price: ${item.price}</Text>
      </View>
    )}
  />
)}

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navButtonText}><AntDesign name="home" size={24} color="white" /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('SearchScreen')}>
          <Text style={styles.navButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sellCarButton} onPress={() => navigation.navigate('SellCar')}>
          <Ionicons name="ios-add" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('FavoritesScreen')}>
          <Text style={styles.navButtonText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  userInfoContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  info: {
    fontSize: 16,
    color: '#777',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 16,
  },
  carItem: {
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  carInfo: {
    fontSize: 16,
    color: '#333',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
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
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});

export default ProfileScreen;
