import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@airtel_clone_auth_v2';

export const DEMO_PIN = '1234';

export async function loadAuth() {
  try {
    const raw = await AsyncStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : { isLoggedIn: false, phone: '' };
  } catch (error) {
    return { isLoggedIn: false, phone: '' };
  }
}

export async function saveAuth(phone) {
  const auth = { isLoggedIn: true, phone };
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  return auth;
}

export async function clearAuth() {
  await AsyncStorage.removeItem(AUTH_KEY);
}
