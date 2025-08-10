import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY, DEFAULT_SIGN } from '../constants';

/**
 * Save the selected zodiac sign to AsyncStorage.
 * Falls back silently if saving fails.
 */
export async function saveSign(sign: string): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, sign);
  } catch (error) {
    console.warn('[signStorage] Failed to save sign:', error);
  }
}

/**
 * Load the selected zodiac sign from AsyncStorage.
 * Returns DEFAULT_SIGN if not found or if loading fails.
 */
export async function loadSign(): Promise<string> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored || DEFAULT_SIGN;
  } catch (error) {
    console.warn('[signStorage] Failed to load sign:', error);
    return DEFAULT_SIGN;
  }
}
