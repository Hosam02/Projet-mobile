import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cars, setCars] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const fetchCars = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.1.108:3000/search', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };
  

  // Filter recommendations based on search query
  useEffect(() => {
    const filteredCars = cars.filter((car) => {
      const make = car.make.toLowerCase();
      const model = car.model.toLowerCase();
      const description = car.description.toLowerCase();
      const query = searchQuery.toLowerCase();
      return (
        make.includes(query) ||
        model.includes(query) ||
        description.includes(query)
      );
    });

    setRecommendations(filteredCars);
  }, [cars, searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleSellCar = () => {
    
    // This function will be called when the "Sell car" button is pressed
    navigation.navigate('SellCar');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Search</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <Text style={styles.subtitle}>Recommendations:</Text>
      {recommendations.length === 0 ? (
        <Text>No recommendations found.</Text>
      ) : (
        <View>
          {recommendations.map((car) => (
            <View key={car._id}>
              <Text style={styles.carTitle}>
                {car.make} {car.model}
              </Text>
              <Text style={styles.carDescription}>{car.description}</Text>
            </View>
          ))}
        </View>
      )}

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
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carDescription: {
    fontSize: 16,
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

export default SearchScreen;
