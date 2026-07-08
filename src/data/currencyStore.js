import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@airtel_clone_currency';

// Mock FX rates relative to KES (base currency the mock balances are stored in).
// These are illustrative only — swap in a live rates API if this ever needs to be accurate.
export const CURRENCIES = [
  { code: 'KES', label: 'Kenya', symbol: 'KES', rateFromKes: 1 },
  { code: 'UGX', label: 'Uganda', symbol: 'UGX', rateFromKes: 28.4 },
  { code: 'TZS', label: 'Tanzania', symbol: 'TZS', rateFromKes: 19.9 },
  { code: 'NGN', label: 'Nigeria', symbol: 'NGN', rateFromKes: 11.6 },
  { code: 'ZMW', label: 'Zambia', symbol: 'ZMW', rateFromKes: 0.19 },
  { code: 'RWF', label: 'Rwanda', symbol: 'RWF', rateFromKes: 10.4 },
  { code: 'MWK', label: 'Malawi', symbol: 'MWK', rateFromKes: 13.5 },
];

export const defaultCurrency = CURRENCIES[0];

export function getCurrency(code) {
  return CURRENCIES.find((c) => c.code === code) || defaultCurrency;
}

export async function loadCurrency() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCurrency;
    return getCurrency(raw);
  } catch (e) {
    return defaultCurrency;
  }
}

export async function saveCurrency(code) {
  await AsyncStorage.setItem(STORAGE_KEY, code);
}

// Converts a KES-denominated numeric string/number into the target currency,
// formatted with thousands separators and 2 decimals.
export function convertFromKes(value, currency) {
  const num = parseFloat(value) || 0;
  const converted = num * currency.rateFromKes;
  return converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}