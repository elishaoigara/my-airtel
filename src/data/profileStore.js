import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@airtel_clone_profile';

export const defaultProfile = {
  name: 'BRIAN NYAKUNDI',
  shortName: 'BRIAN NYAKUNDI',
  phone: '781047471',
  accountType: 'PREPAID',
  airtimeBalance: '0.01',
  voiceBalance: '67.30',
  dataBalance: '974.88',
  airtelMoneyBalance: 'XXXXXX',
};

export async function loadProfile() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfile));
      return defaultProfile;
    }
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch (e) {
    return defaultProfile;
  }
}

export async function saveProfile(profile) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export async function resetProfile() {
  await saveProfile(defaultProfile);
  return defaultProfile;
}
