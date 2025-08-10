import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSign } from '../context/SignContext';
import SignPicker from '../components/SignPicker';
import HoroscopeCard from '../components/HoroscopeCard';
import { useHoroscope } from '../hooks/useHoroscope';
import {
  scheduleJournalReminder,
  requestNotificationPermissions,
} from '../services/notificationService';

type HomeScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { sign, isLoading: signLoading } = useSign();
  const { data: horoscope, loading, error } = useHoroscope(sign);

  const today = new Date().toLocaleDateString();

  const handleSetReminder = async () => {
    const granted = await requestNotificationPermissions();
    if (!granted) {
      Alert.alert(
        'Permission required',
        'Please enable notifications in settings to receive reminders.'
      );
      return;
    }
    await scheduleJournalReminder();
    Alert.alert('Reminder Set', 'You will get daily journal reminders.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>🌟 Astro Journal</Text>

        <SignPicker />

        {signLoading || loading ? (
          <ActivityIndicator
            size="large"
            color="#6c63ff"
            style={{ marginTop: 30 }}
          />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          horoscope && (
            <HoroscopeCard date={today} description={horoscope.description} />
          )
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Journal')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Write Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.outlineButton]}
          onPress={handleSetReminder}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, styles.outlineButtonText]}>
            Remind me to journal
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    color: '#4a47a3',
  },
  error: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#6c63ff',
    shadowColor: '#6c63ff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  outlineButton: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#6c63ff',
  },
  outlineButtonText: {
    color: '#6c63ff',
  },
});
