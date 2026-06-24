import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@airtel_clone_transactions';

// Default seed data — purely illustrative placeholder examples for the demo.
// Edit these from Settings → Edit Transactions, not from the live transaction screens.
export const defaultTransactions = [
  {
    id: 't1',
    type: 'TOPUP',
    direction: 'sent',
    amount: 3500,
    currency: 'KES',
    closingBalance: 50690.73,
    transactionId: '94770367941',
    date: '17 Jun 2026',
    time: '6:43 PM',
    status: 'SUCCESSFUL',
  },
  {
    id: 't2',
    type: 'Send Money',
    direction: 'sent',
    amount: 1000,
    currency: 'KES',
    closingBalance: 49690.73,
    transactionId: '94770367942',
    date: '16 Jun 2026',
    time: '11:02 AM',
    status: 'SUCCESSFUL',
    recipient: '0712 345 678',
  },
  {
    id: 't3',
    type: 'Money Received',
    direction: 'received',
    amount: 2500,
    currency: 'KES',
    closingBalance: 52190.73,
    transactionId: '94770367943',
    date: '14 Jun 2026',
    time: '9:15 AM',
    status: 'SUCCESSFUL',
    sender: 'JOHN KAMAU',
  },
  {
    id: 't4',
    type: 'Buy Bundles',
    direction: 'sent',
    amount: 250,
    currency: 'KES',
    closingBalance: 49440.73,
    transactionId: '94770367944',
    date: '12 Jun 2026',
    time: '4:21 PM',
    status: 'FAILED',
  },
];

export async function loadTransactions() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTransactions));
      return defaultTransactions;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultTransactions;
  }
}

export async function saveTransactions(transactions) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export async function addTransaction(tx) {
  const current = await loadTransactions();
  const updated = [{ ...tx, id: `t${Date.now()}` }, ...current];
  await saveTransactions(updated);
  return updated;
}

export async function updateTransaction(id, patch) {
  const current = await loadTransactions();
  const updated = current.map((t) => (t.id === id ? { ...t, ...patch } : t));
  await saveTransactions(updated);
  return updated;
}

export async function deleteTransaction(id) {
  const current = await loadTransactions();
  const updated = current.filter((t) => t.id !== id);
  await saveTransactions(updated);
  return updated;
}

export async function resetTransactions() {
  await saveTransactions(defaultTransactions);
  return defaultTransactions;
}
