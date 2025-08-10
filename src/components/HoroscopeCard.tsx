import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Horoscope } from '../types/horoscope';
/**
 * HoroscopeCard component displays the horoscope for a specific date.
 * @param {Horoscope} props - Contains date and description of the horoscope.
 */

export default function HoroscopeCard({ date, description }: Horoscope) {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
 card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  date: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6c63ff',
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    color: '#333',
    lineHeight: 21,
  },
});
