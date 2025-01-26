import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

import { auth } from '../firebaseConfig'; // Import Firebase config
import { signInWithEmailAndPassword , createUserWithEmailAndPassword} from '../firebaseConfig';

const LoginScreen = ({ navigation }: any) => {
  // State for email and password inputs
    const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isSignUp, setIsSignUp] = useState(false);

  // Function to handle user login
  const handleLogin = async () => {
    try {
      // Firebase authentication login
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful!', 'You are logged in now.');
      // Navigate to the main screen or the next screen
      navigation.navigate('Home'); // Replace 'Home' with the next screen
    } catch (error) {
      // Handle login errors
      Alert.alert('Login Failed', error.message);
    }
  };
    const handleSignUp = async () => {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          Alert.alert('Account Created!', 'You can now log in.');
          setIsSignUp(false); // Switch to login mode after successful sign-up
        } catch (error) {
          Alert.alert('Sign Up Failed', error.message);
        }
      };


  return (
    <View style={styles.container}>
          <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
          <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
          <Button
                  title={isSignUp ? 'Sign Up' : 'Login'}
                  onPress={isSignUp ? handleSignUp : handleLogin} // Dynamically switch between login and signup
                />
                <Button
                  title={isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
                  onPress={() => setIsSignUp((prev) => !prev)} // Toggle between login and signup modes
                />
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
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
  },
});

export default LoginScreen;
