import { Tabs } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Home, Calendar, Pill, Heart, User } from 'lucide-react-native';

export default function TabsLayout() {
    const { theme } = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.border,
                },
                headerStyle: {
                    backgroundColor: theme.colors.surface,
                },
                headerTintColor: theme.colors.textMain,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="appointments"
                options={{
                    title: 'Appointments',
                    tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="medications"
                options={{
                    title: 'Medications',
                    tabBarIcon: ({ color, size }) => <Pill size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="wellness"
                options={{
                    title: 'Wellness',
                    tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
