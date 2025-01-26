import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebaseConfig'; // Adjust path to your Firebase config
import { doc, setDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig'; // Ensure Firebase Auth is set up
import RNPickerSelect from 'react-native-picker-select';
import { addInvestment } from '../firestoreServices';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AutoInvestor = () => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [growthRate, setGrowthRate] = useState(0);

  const investmentOptions = [
    { label: 'Low Risk (3% Annual Growth)', value: 'low', rate: 0.03 },
    { label: 'Medium Risk (5% Annual Growth)', value: 'medium', rate: 0.05 },
    { label: 'High Risk (8% Annual Growth)', value: 'high', rate: 0.08 },
  ];

  // Handle investment option selection
  const handleOptionChange = (value: string) => {
    const selected = investmentOptions.find((option) => option.value === value);
    if (selected) {
      setSelectedOption(selected.value);
      setGrowthRate(selected.rate);
    }
  };

  // Generate a 5-year projection
  const generateProjection = () => {
    if (!investmentAmount || !selectedOption) {
      Alert.alert('Error', 'Please enter an amount and select an investment option.');
      return;
    }

    const amount = parseFloat(investmentAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid investment amount.');
      return;
    }

    const projection = [];
    let currentAmount = amount;
    for (let i = 1; i <= 5; i++) {
      currentAmount += currentAmount * growthRate;
      projection.push(`Year ${i}: $${currentAmount.toFixed(2)}`);
    }

    Alert.alert('5-Year Projection', projection.join('\n'));
  };

  // Save investment preferences to Firestore
  const saveInvestmentPreferences = async () => {
      addInvestment(investmentAmount,growthRate);
      navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Auto Investor</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter amount to invest"
        keyboardType="numeric"
        value={investmentAmount}
        onChangeText={setInvestmentAmount}
      />
          <RNPickerSelect
            onValueChange={(value) => handleOptionChange(value)}
          items={investmentOptions}
            placeholder={{ label: 'Select an investment option', value: '' }}
            style={pickerStyles}
          />
          

          

      <View style={styles.buttonContainer}>
        <Button title="Generate 5-Year Projection" onPress={generateProjection} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Save Investment Preferences" onPress={
            
            saveInvestmentPreferences} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        overflow: 'hidden', // Ensures the picker fits well
      },
      picker: {
        height: 40,
      },
  buttonContainer: {
    marginVertical: 10,
  },
});
const pickerStyles = {
  inputIOS: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  inputAndroid: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
};

export default AutoInvestor;
