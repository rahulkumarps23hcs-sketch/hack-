import { Stack } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function DoctorLayout() {
    const { theme } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.surface,
                },
                headerTintColor: theme.colors.textMain,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: 'Doctor Dashboard',
                }}
            />
        </Stack>
    );
}
