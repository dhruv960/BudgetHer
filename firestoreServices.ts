import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from './firebaseConfig';

export const addExpense = async (category: string, value: number | null = null) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      const expenseRef = collection(db, 'users', user.uid, 'expenses');
      await addDoc(expenseRef, {
        category,
          value,
          timestamp: serverTimestamp()
      });

      console.log('Expense added successfully!');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  } else {
    console.log('User not logged in');
  }
};


export const addInvestment = async (value: number, g_rate: number | null = null) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (true) {
    try {
      const invRef = collection(db, 'users', user.uid, 'investments');
        await addDoc(invRef, {
        value,
          g_rate,
          timestamp: serverTimestamp()
      });

      console.log('Expense added successfully!');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  } else {
    console.log('User not logged in');
  }
};

