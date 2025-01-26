import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ExpenseInput from './screens/ExpenseInput';  // Assuming you have this screen
import ExpenseTracker from './screens/ExpenseTracker'; // Assuming you have this screen
import AutoInvestor from './screens/AutoInvester';  // Assuming you have this screen
import PortfolioView from './screens/PortfolioView'; // Assuming you have this screen
import LoginScreen from './screens/LoginScreen'; // Assuming you have this screen
import { auth } from './firebaseConfig';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

      useEffect(() => {
        // Check if the user is logged in via Firebase Authentication (or other service)
          const unsubscribe = auth.onAuthStateChanged((user) => {
          setIsLoggedIn(!!user);  // Set login state based on user
        });

        // Cleanup on unmount
        return unsubscribe;
      }, []);
  return (
          <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
                  {/* Conditionally render Home or Login based on isLoggedIn */}
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="ExpenseInput" component={ExpenseInput} />
          <Stack.Screen name="ExpenseTracker" component={ExpenseTracker} />
          <Stack.Screen name="AutoInvestor" component={AutoInvestor} />
          <Stack.Screen name="PortfolioView" component={PortfolioView} />
                  <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
