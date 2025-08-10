import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { SignProvider } from './src/context/SignContext';

import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';

const HomeStack = createNativeStackNavigator();
const JournalStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function JournalStackScreen() {
  return (
    <JournalStack.Navigator screenOptions={{ headerShown: false }}>
      <JournalStack.Screen name="JournalMain" component={JournalScreen} />
    </JournalStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SignProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#000" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName: string;
                if (route.name === 'Home') {
                  iconName = 'home';
                } else {
                  iconName = 'book';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              headerShown: false,
            })}
          >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Journal" component={JournalStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SignProvider>
    </SafeAreaProvider>
  );
}
