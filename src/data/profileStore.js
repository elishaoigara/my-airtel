import AsyncStorage from '@react-native-async-storage/async-storage';

// Versioned key intentionally prevents older school-demo data from reappearing.
const STORAGE_KEY = '@airtel_clone_profile_v2';

export const defaultProfile = {
  name: '',
  shortName: '',
  phone: '',
  accountType: '',
  airtimeBalance: '',
  voiceBalance: '',
  dataBalance: '',
  airtelMoneyBalance: '',
};

export async function loadProfile() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch (error) {
    return defaultProfile;
  }
}

export async function saveProfile(profile) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export async function resetProfile() {
  await AsyncStorage.removeItem(STORAGE_KEY);
  return defaultProfile;
}
