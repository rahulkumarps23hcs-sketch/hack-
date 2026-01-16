import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Smile, User } from 'lucide-react-native';
import { View, ActivityIndicator } from 'react-native';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import MoodTrackerScreen from './src/screens/MoodTrackerScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Loading Fallback
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#6B9BD1" />
  </View>
);

export default function App() {
  return (
    <NavigationContainer fallback={<LoadingScreen />}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#6B9BD1',
          tabBarInactiveTintColor: '#B2BEC3',
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 10,
            height: 60,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarIcon: ({ color, size }) => {
            let IconComponent;

            if (route.name === 'Home') IconComponent = Home;
            else if (route.name === 'My Mood') IconComponent = Smile;
            else if (route.name === 'Profile') IconComponent = User;

            return <IconComponent color={color} size={size} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="My Mood" component={MoodTrackerScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
