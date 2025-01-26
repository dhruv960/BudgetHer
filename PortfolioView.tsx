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
function getInvestmentCategory(g_rate) {
  if (g_rate < 0.05)
      return 'Low Risk';
  else if (g_rate <= 0.06)
      return 'Medium Risk';
  else
      return 'High Risk';
}

const PortfolioView = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const fetchPortfolio = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const investmentsRef = collection(db, 'users', 'qQogfhxDTPPE74UaTcVgyknsA2G3', 'investments');
        const q = query(investmentsRef);
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => {
        const investment = doc.data();
        const yearsElapsed = (Date.now() - investment.timestamp.toDate()) / (1000 * 60 * 60 * 24 * 365);
        const currentValue = investment.value * (1 + investment.g_rate) ** yearsElapsed;

        return {
          ...investment,
          currentValue,
            category: getInvestmentCategory(investment.g_rate),
        };
      });

      const grouped = data.reduce(
        (acc, item) => {
            const cat = getInvestmentCategory(item.g_rate)
          acc[cat] += item.currentValue;
          return acc;
        },
        { 'Low Risk': 0, 'Medium Risk': 0, 'High Risk': 0 }
      );

      const total = Object.values(grouped).reduce((sum, val) => sum + val, 0);

      setPortfolioData([
        { name: 'Low Risk', value: grouped['Low Risk'], color: '#4caf50', legendFontColor: '#333', legendFontSize: 12 },
        { name: 'Medium Risk', value: grouped['Medium Risk'], color: '#ff9800', legendFontColor: '#333', legendFontSize: 12 },
        { name: 'High Risk', value: grouped['High Risk'], color: '#f44336', legendFontColor: '#333', legendFontSize: 12 },
      ]);

      setTotalValue(total);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      Alert.alert('Error', 'Failed to load portfolio data');
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio Manager</Text>
      <PieChart
        data={portfolioData}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
          hasLegend={false}
      />
          <View style={styles.legendContainer}>
          {portfolioData.map((entry, index) => (
                    <View key={index} style={styles.legendItem}>
                      <View style={[styles.colorBox, { backgroundColor: entry.color }]} />
                      <Text style={styles.legendText}>{entry.name}</Text>
                    </View>
                  ))}
                </View>
      <Text style={styles.total}>Total Portfolio Value: ${totalValue.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
      alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
    legendContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
      },
      legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 10
      },
      colorBox: {
        width: 20,
        height: 20,
        marginRight: 10
      },
      legendText: {
        fontSize: 14,
        color: '#333'
      },
    });


export default PortfolioView;
