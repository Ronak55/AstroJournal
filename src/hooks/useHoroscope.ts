// src/hooks/useHoroscope.ts
import { useEffect, useState, useCallback } from 'react';
import { fetchHoroscope } from '../services/horoscopeService';
import { Horoscope } from '../types/horoscope';

export function useHoroscope(sign: string) {
  const [data, setData] = useState<Horoscope | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!sign) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchHoroscope(sign);
      setData(result);
    } catch (err) {
      console.error('Failed to load horoscope:', err);
      setError('Could not fetch horoscope. Please try again.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [sign]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
