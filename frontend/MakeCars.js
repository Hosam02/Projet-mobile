import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const MakeCarsScreen = ({ route, navigation }) => {
  const { make } = route.params;
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch all cars
    fetch('http://192.168.1.108:3000/cars')
      .then((response) => response.json())
      .then((data) => {
        // Filter cars based on the selected make
        const filteredCars = data.filter((car) => car.make === make);
        setCars(filteredCars);
      })
      .catch((error) => console.error('Error fetching cars:', error));
  }, [make]);

  const handleCarPress = (car) => {
    // Navigate to the CarDetails screen with the selected car
    navigation.navigate('CarDetails', { car });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Cars for ${make}`}</Text>

      {cars.length > 0 ? (
        <FlatList
          data={cars}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCarPress(item)} style={styles.carItem}>
              {item.pictures ? (
                <Image source={{ uri: item.pictures[0] }} style={styles.carPicture} resizeMode="contain" />
              ) : null}
              <Text style={styles.carMake}>{item.make}</Text>
              <Text style={styles.carModel}>{`${item.year} - $${item.price}`}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noCars}>No cars available for this make</Text>
      )}
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
  carItem: {
    marginBottom: 16,
  },
  carPicture: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  carMake: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carModel: {
    fontSize: 16,
  },
  noCars: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default MakeCarsScreen;
