import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import HomeScreen from './Home';
import SearchResults from './SearchResults';
import MakeCarsScreen from './MakeCars';
import CarDetailsScreen from './CarDetails';
import SellCarScreen from './SellCar';
import RegisterScreen from './register';
import ChatScreen from './ChatScreen';
import ProfileScreen from './Profile';
import SearchScreen from './SearchScreen';
import FavoritesScreen from './Favorites';

const Stack = createStackNavigator();

function App() {
  return (
    
    <NavigationContainer>
      
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SearchResults" component={SearchResults} /> 
          <Stack.Screen name="MakeCars" component={MakeCarsScreen} /> 
          <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="SellCar" component={SellCarScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
        </Stack.Navigator>
      
    </NavigationContainer>
    
  );
}

export default App;
