import React from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import { signOut,signInWithEmailAndPassword , createUserWithEmailAndPassword} from '../firebaseConfig';
import { auth } from '../firebaseConfig';

const HomeScreen = ({ navigation }: any) => {
    const handleLogout = async () => {
        try {
          // Log the user out of Firebase Authentication
          await signOut(auth);

          // After logging out, navigate the user to the Login screen
          navigation.navigate('Login');
        } catch (error) {
          console.log('Error logging out:', error);  // Optional: handle any errors
        }
      };
  return (
          <View style={styles.container}>
                <Text style={styles.title}>Welcome to Your Budgeting App</Text>

                <Button
                  title="Expense Input"
                  onPress={() => navigation.navigate('ExpenseInput')}
                />

                <Button
                  title="Expense Tracker"
                  onPress={() => navigation.navigate('ExpenseTracker')}
                />

                <Button
                  title="Auto Invester"
                  onPress={() => navigation.navigate('AutoInvestor')}
                />

                <Button
                  title="Portfolio View"
                  onPress={() => navigation.navigate('PortfolioView')}
                />
          
          <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
});

export default HomeScreen;
