import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { addExpense } from '../firestoreServices';
import RNPickerSelect from 'react-native-picker-select';

const ExpenseInput = ({ navigation }: any) => {
    const [amount, setAmount] = useState('');
      const [category, setCategory] = useState('');
  // Handle back button click
  const handleBack = () => {
    navigation.goBack(); // Navigate to the previous screen
  };
    const categories = [
        { label: 'Food and Drink', value: 'food_drink' },
        { label: 'Groceries', value: 'groceries' },
        { label: 'Medical Expenses', value: 'med' },
        { label: 'Clothes', value: 'clothes' },
        { label: 'Childcare', value: 'child_things' },
        { label: 'Miscellaneous', value: 'misc' },
      ];
    const handleSubmit = () => {
        if (!amount || !category) {
          Alert.alert('Error', 'Please fill in both amount and category');
        } else {
          // Here you can send the data to Firestore or handle it
            addExpense(category, amount);
          // Clear the input fields after submission
          setAmount('');
          setCategory('');
          
          // Optionally, navigate back or show success message
          navigation.goBack();
        }
      };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Input</Text>
      
      {/* Your form or content goes here */}
      <Text>Enter your expense details below:</Text>
          
          {/* Amount Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />

                {/* Category Picker */}
                <RNPickerSelect
                  onValueChange={(value) => setCategory(value)}
                  items={categories}
                  placeholder={{ label: 'Select Category...', value: '' }}
                  style={pickerStyles}
                />

          <Button
          title="Submit" onPress={ handleSubmit}
          />
      {/* Back Button */}
      <Button title="Back" onPress={handleBack} />
         
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
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        width: '100%',
        marginBottom: 20,
        paddingLeft: 10,
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

export default ExpenseInput;
