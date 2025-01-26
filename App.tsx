import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen'; // Your home screen
import AppNavigator from './AppNavigator';
import ExpenseInput from './screens/ExpenseInput';  

const Stack = createStackNavigator();



const App = () => {
  return (
    <NavigationContainer>
          <AppNavigator />  
    </NavigationContainer>
  );
};

export default App;
