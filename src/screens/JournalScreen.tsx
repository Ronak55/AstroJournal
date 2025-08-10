import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournalEntry } from '../hooks/useJournalEntry';

export default function JournalScreen() {
  const today = new Date().toISOString().split('T')[0];
  const { entry, setEntry, save, loading } = useJournalEntry(today);

  const handleSave = async () => {
    await save();
    Alert.alert('Saved', 'Your journal entry has been saved.');
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6c63ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.header}>Journal for Today</Text>
            <Text style={styles.date}>{today}</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Write your thoughts..."
              placeholderTextColor="#a0a0a0"
              value={entry}
              onChangeText={setEntry}
              textAlignVertical="top"
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>Save Entry</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView:{ flex: 1, backgroundColor: '#f5f6fa' },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4a47a3',
    marginBottom: 4,
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7d7d7d',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    fontSize: 16,
    minHeight: 280,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 30,
    color: '#222',
  },
  saveButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#6c63ff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
