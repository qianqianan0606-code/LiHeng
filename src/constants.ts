import { Category, Transaction } from './types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Morning Oat Latte',
    amount: 6.50,
    category: 'Food',
    date: new Date(),
    type: 'expense',
    notes: 'Coffee with oat milk'
  },
  {
    id: '2',
    title: 'Art Supplies (Washi Tape!)',
    amount: 24.00,
    category: 'Other',
    date: new Date(),
    type: 'expense'
  },
  {
    id: '3',
    title: 'Freelance Project Payout',
    amount: 450.00,
    category: 'Income',
    date: new Date(Date.now() - 86400000),
    type: 'income'
  },
  {
    id: '4',
    title: 'Monthly Rent',
    amount: 1200.00,
    category: 'Bills',
    date: new Date(Date.now() - 86400000),
    type: 'expense'
  },
  {
    id: '5',
    title: 'Weekly Goal!',
    amount: 200.00,
    category: 'Savings',
    date: new Date(Date.now() - 172800000),
    type: 'income'
  }
];

export const CATEGORIES: { name: Category; icon: string; color: string }[] = [
  { name: 'Food', icon: 'Utensils', color: '#FF9F66' },
  { name: 'Transport', icon: 'Car', color: '#775a7e' },
  { name: 'Shopping', icon: 'ShoppingBag', color: '#66B2FF' },
  { name: 'Bills', icon: 'ReceiptText', color: '#66CC99' },
  { name: 'Health', icon: 'Dumbbell', color: '#FF6666' },
  { name: 'Other', icon: 'MoreHorizontal', color: '#A0A0A0' },
];
