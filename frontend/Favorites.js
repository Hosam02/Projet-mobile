import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.1.108:3000/users/favoriteCars', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(response.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        console.log('Network Error');
      } else {
        console.error('Error fetching favorite cars:', error);
        // Handle the error gracefully, e.g., show an error message to the user
      }
    }
  };
  
  

  const removeFavorite = async (carId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`http://192.168.1.108:3000/users/favorites/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(favorites.filter((car) => car._id !== carId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      // Handle the error gracefully, e.g., show an error message to the user
    }
  };

  const handleSellCar = () => {
    navigation.navigate('SellCar');
  };

  const renderCarItem = ({ item }) => (
    <View style={styles.carContainer}>
      <Text style={styles.makeModelText}>{`${item.make} ${item.model}`}</Text>
      <Text style={styles.descriptionText}>{item.description}</Text>
      <TouchableOpacity
        style={styles.removeFavoriteButton}
        onPress={() => removeFavorite(item._id)}
      >
        <Text style={styles.removeFavoriteButtonText}>Remove Favorite</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Favorites</Text>

      {favorites.length === 0 ? (
        <Text>No favorite cars found.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderCarItem}
          keyExtractor={(item) => item._id}
        />
      )}

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navButtonText}><AntDesign name="home" size={24} color="white" /></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('SearchScreen')}
        >
          <Text style={styles.navButtonText}><FontAwesome name="search" size={24} color="white" /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sellCarButton} onPress={handleSellCar}>
          {/* Sell car icon */}
          <Ionicons name="ios-add" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('FavoritesScreen')}
        >
          <Text style={styles.navButtonText}><AntDesign name="hearto" size={24} color="white" /></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Text style={styles.navButtonText}><MaterialIcons name="account-circle" size={24} color="white" /></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  carContainer: {
    marginBottom: 20,
  },
  makeModelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
  },
  removeFavoriteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  removeFavoriteButtonText: {
    color: 'white',
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

export default FavoritesScreen;
