import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchResults = ({ route }) => {
  const { makeId, query } = route.params; // Get the makeId or query from the route params

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        let url = 'http://192.168.1.108:3000/search';
        if (makeId) {
          url += `?make=${makeId}`;
        } else if (query) {
          url += `?query=${query}`;
        }

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error('Error retrieving search results:', response.status);
        }
      } catch (error) {
        console.error('Error retrieving search results:', error);
      }
    };

    fetchSearchResults();
  }, [makeId, query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results</Text>

      <Text style={styles.subtitle}>Results for:</Text>
      {makeId && <Text style={styles.queryText}>{makeId}</Text>}
      {query && <Text style={styles.queryText}>{query}</Text>}

      <View style={styles.resultsContainer}>
        {searchResults.map((car) => (
          <View key={car._id} style={styles.carItem}>
            <Text style={styles.carMake}>{car.make}</Text>
            <Text style={styles.carModel}>{car.model}</Text>
            <Text style={styles.carDetails}>{`${car.year} | $${car.price}`}</Text>
          </View>
        ))}
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  queryText: {
    fontSize: 16,
  },
  resultsContainer: {
    marginTop: 16,
  },
  carItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  carMake: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  carModel: {
    fontSize: 16,
    marginBottom: 4,
  },
  carDetails: {
    fontSize: 14,
  },
});

export default SearchResults;
