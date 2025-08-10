// src/hooks/useJournalEntry.ts
import { useState, useEffect, useCallback } from 'react';
import { saveJournalEntry, loadJournalEntry } from '../services/journalService';

/**
 * Manages a journal entry for a specific date.
 */
export function useJournalEntry(date: string) {
  const [entry, setEntry] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const saved = await loadJournalEntry(date);
      if (isMounted) {
        setEntry(saved);
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [date]);

  const save = useCallback(async () => {
    await saveJournalEntry(date, entry);
    setEntry('');
  }, [date, entry]);

  return { entry, setEntry, save, loading };
}
