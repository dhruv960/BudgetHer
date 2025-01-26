import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import firestore from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;
const expenseRef = collection(db, 'users', 'qQogfhxDTPPE74UaTcVgyknsA2G3', 'expenses');


const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [previousCategoryTotals, setPreviousCategoryTotals] = useState({});
  const categories = [
    { label: 'Food and Drink', value: 'food_drink' },
    { label: 'Groceries', value: 'groceries' },
    { label: 'Medical Expenses', value: 'med' },
    { label: 'Clothes', value: 'clothes' },
    { label: 'Childcare', value: 'child_things' },
    { label: 'Miscellaneous', value: 'misc' },
  ];
    

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      // Fetch expenses for the last 30 days
      const currentDate = new Date();
      const lastMonthDate = new Date();
      lastMonthDate.setDate(currentDate.getDate() - 30);

        const q = query(expenseRef, where('timestamp', '>=', lastMonthDate));

        const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);
        
        

      // Calculate totals for each category
      const totals = {};
      data.forEach((expense) => {
        if (totals[expense.category]) {
            totals[expense.category] += parseFloat(expense.value);
            
        } else {
          totals[expense.category] = parseFloat(expense.value);
            
        }
      });
      setCategoryTotals(totals);
        const previousDate = new Date();
        previousDate.setDate(currentDate.getDate() - 60);
        
       

      // Fetch previous 30-day data for comparison
        const p = query(expenseRef, where('timestamp', '<', lastMonthDate), where ('timestamp', '>=', previousDate))

        const previousSnapshot = await getDocs(p);

      const previousData = previousSnapshot.docs.map((doc) => doc.data());
      const previousTotals = {};
      previousData.forEach((expense) => {
        if (previousTotals[expense.category]) {
          previousTotals[expense.category] += parseFloat(expense.value);
        } else {
          previousTotals[expense.category] = parseFloat(expense.value);
        }
      });
      setPreviousCategoryTotals(previousTotals);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleCategoryPress = (category) => {
    const currentTotal = categoryTotals[category] || 0;
    const previousTotal = previousCategoryTotals[category] || 0;
    const difference = currentTotal - previousTotal;
    const trend = difference > 0 ? 'increased' : 'decreased';
      const newTotal = categoryTotals[category] || 0;

    Alert.alert(
      `${categories.find((cat) => cat.value === category)?.label} Trend`,
      `Your spending has ${trend} by $${Math.abs(difference.toFixed(2))} to $${newTotal} compared to the previous 30 days.`
    );
  };
    const getCategoryColor = (category) => {
      const colors = {
        food_drink: '#FF6384',
        groceries: '#36A2EB',
        med: '#FFCE56',
        clothes: '#4BC0C0',
        child_things: '#9966FF',
        misc: '#FF9F40',
      };
      return colors[category] || '#ccc';
    };

  const pieData = categories.map((cat) => ({
    name: cat.label,
    amount: categoryTotals[cat.value] || 0,
      color: getCategoryColor(cat.value),
    legendFontColor: '#7F7F7F',
    legendFontSize: 14,
  }));


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
          
          
      <PieChart
        data={pieData}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
      />
          
      <FlatList
        data={categories}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(item.value)}
          >
            <Text style={styles.buttonText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
    
  categoryButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ExpenseTracker;
