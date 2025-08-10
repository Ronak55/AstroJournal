import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

// Configure how notifications are displayed when the app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Requests notification permissions from the user.
 * Returns true if permissions are granted, false otherwise.
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    return newStatus === 'granted';
  }
  return true;
}

/**
 * Schedules a daily reminder notification at 8 PM local time.
 * The notification repeats every day at the same time.
 */
export async function scheduleJournalReminder(): Promise<void> {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Time to write your journal 📝',
        body: 'Reflect on your day and jot down your thoughts.',
      },
      trigger: {
        hour: 20,
        minute: 0,
        repeats: true,
      },
    });
    Alert.alert('Reminder set', 'We’ll remind you every evening at 8 PM.');
  } catch (err) {
    console.error('Failed to schedule notification', err);
    Alert.alert('Error', 'Could not schedule the reminder.');
  }
}
