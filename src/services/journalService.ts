// src/services/journalService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JOURNAL_STORAGE_PREFIX } from '../constants';

/**
 * Saves a journal entry for a specific date.
 * @param date - The date string (YYYY-MM-DD) for the journal entry.
 * @param content - The content of the journal entry.
 */
export async function saveJournalEntry(date: string, content: string): Promise<void> {
  try {
    await AsyncStorage.setItem(`${JOURNAL_STORAGE_PREFIX}${date}`, content);
  } catch (err) {
    console.warn(`Failed to save journal entry for ${date}:`, err);
  }
}

/**
 * Loads a saved journal entry for a specific date.
 * @param date - The date string (YYYY-MM-DD) to load the entry for.
 * @returns The saved journal content, or an empty string if none exists.
 */
export async function loadJournalEntry(date: string): Promise<string> {
  try {
    const saved = await AsyncStorage.getItem(`${JOURNAL_STORAGE_PREFIX}${date}`);
    return saved ?? '';
  } catch (err) {
    console.warn(`Failed to load journal entry for ${date}:`, err);
    return '';
  }
}
