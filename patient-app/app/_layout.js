import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { View } from 'react-native';

function RootLayoutNav() {
    const { theme, isDark } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar style={isDark ? "light" : "dark"} />
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(doctor)" />
            </Stack>
        </View>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RootLayoutNav />
            </ThemeProvider>
        </AuthProvider>
    );
}
