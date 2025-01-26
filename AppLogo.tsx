import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AppLogo = () => {
  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={require('./assets/myLOGO.png')} // Path to your local image
        style={styles.logo}
      />
      {/* Other UI components */}
      <Text>Welcome to the App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,      // Adjust width of the logo
    height: 150,     // Adjust height of the logo
    marginBottom: 20,  // Space below the logo
  }
});

export default AppLogo;
