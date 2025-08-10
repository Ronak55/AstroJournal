import { Horoscope } from '../types/horoscope';
import { SIGNS } from '../constants';
import { ApiResponse } from '../types/apiResponse';

/**
 * Fetches today's horoscope for a given zodiac sign.
 * @param sign - The zodiac sign to fetch the horoscope for.
 * @returns A Promise resolving to a Horoscope object or null if the request fails.
 */
export async function fetchHoroscope(sign:string): Promise<Horoscope | null> {
  const baseUrl = 'https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily';
  const url = new URL(baseUrl);

  url.searchParams.append('sign', sign);
  url.searchParams.append('day', 'today');

  try {
    const response = await fetch(url.toString(), { method: 'GET' });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const responseData: ApiResponse = await response.json();

    console.log('[fetchHoroscope] API response:', responseData);

    return {
      date: responseData.data.date,
      description: responseData.data.horoscope_data,
    };
  } catch (error) {
    console.warn('[fetchHoroscope] error:', error);
    return null;
  }
}
