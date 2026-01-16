import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function LandingScreen() {
    const { userRole } = useAuth();
    const { theme } = useTheme();

    useEffect(() => {
        if (userRole === 'patient') {
            router.replace('/(tabs)');
        } else if (userRole === 'doctor') {
            router.replace('/(doctor)');
        }
    }, [userRole]);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.content}>
                <Text style={[styles.title, { color: theme.colors.textMain }]}>HealthCare App</Text>
                <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                    Your Health, Our Priority
                </Text>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.colors.primary }]}
                    onPress={() => router.push('/auth/login')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.linkButton]}
                    onPress={() => router.push('/auth/signup')}
                >
                    <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                        Create an Account
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 8,
    },
    linkText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
