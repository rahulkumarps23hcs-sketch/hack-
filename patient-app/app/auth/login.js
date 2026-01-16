import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDoctor, setIsDoctor] = useState(false);
    const { login } = useAuth();
    const { theme } = useTheme();

    const handleLogin = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            const role = isDoctor ? 'doctor' : 'patient';
            login(role);

            if (role === 'doctor') {
                router.replace('/(doctor)');
            } else {
                router.replace('/(tabs)');
            }
        }, 1500);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.content}>
                <Text style={[styles.title, { color: theme.colors.textMain }]}>Welcome Back</Text>
                <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                    Sign in to continue
                </Text>

                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />

                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />

                <View style={styles.switchRow}>
                    <Text style={[styles.switchLabel, { color: theme.colors.textMain }]}>
                        Login as Doctor
                    </Text>
                    <Switch
                        value={isDoctor}
                        onValueChange={setIsDoctor}
                        trackColor={{ false: '#767577', true: theme.colors.primary }}
                    />
                </View>

                <Button
                    title="Login"
                    onPress={handleLogin}
                    loading={loading}
                />

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => router.push('/auth/signup')}
                >
                    <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                        Don't have an account? Sign up
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
        padding: 20,
    },
    content: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 32,
    },
    input: {
        marginBottom: 12,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
    },
    switchLabel: {
        fontSize: 16,
    },
    linkButton: {
        marginTop: 16,
        alignItems: 'center',
    },
    linkText: {
        fontSize: 14,
    },
});
