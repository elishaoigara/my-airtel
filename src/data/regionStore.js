import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@airtel_clone_region_v1';

export const REGIONS = {
  KE: { code: 'KE', name: 'Kenya', label: 'Airtel Kenya', dialCode: '+254', currency: 'KES' },
  UG: { code: 'UG', name: 'Uganda', label: 'Airtel Uganda', dialCode: '+256', currency: 'UGX' },
};

export const defaultRegion = REGIONS.KE;

export function getRegion(code) {
  return REGIONS[code] || defaultRegion;
}

export async function loadRegion() {
  try {
    const savedCode = await AsyncStorage.getItem(STORAGE_KEY);
    return getRegion(savedCode);
  } catch (error) {
    return defaultRegion;
  }
}

export async function saveRegion(code) {
  const region = getRegion(code);
  await AsyncStorage.setItem(STORAGE_KEY, region.code);
  return region;
}
