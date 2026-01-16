import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Watch, Check, ChevronLeft } from 'lucide-react-native';

export default function WearableSetupScreen() {
    const { theme } = useTheme();
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);

    const handleConnect = () => {
        setConnecting(true);
        setTimeout(() => {
            setConnecting(false);
            setConnected(true);
        }, 2000);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{
                title: 'Connect Device',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
                        <ChevronLeft size={24} color={theme.colors.textMain} />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
            }} />

            <View style={styles.hero}>
                <View style={[styles.iconCircle, { backgroundColor: theme.colors.primary + '15' }]}>
                    <Watch size={60} color={theme.colors.primary} />
                </View>
                <Text style={[styles.title, { color: theme.colors.textMain }]}>Connect your Health Data</Text>
                <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                    Sync your Steps, Heart Rate, and Sleep data from Google Fit or Apple Health to get personalized insights.
                </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.colors.surface }, theme.shadows.card]}>
                <View style={styles.row}>
                    <Text style={[styles.label, { color: theme.colors.textMain }]}>Supported Services</Text>
                </View>
                <View style={styles.serviceRow}>
                    <Text style={[styles.serviceName, { color: theme.colors.textMain }]}>Google Fit / Apple Health</Text>
                    {connected && <Check size={20} color={theme.colors.success} />}
                </View>
            </View>

            <View style={styles.footer}>
                {!connected ? (
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: theme.colors.primary }]}
                        onPress={handleConnect}
                        disabled={connecting}
                    >
                        {connecting ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Connect Now</Text>}
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: theme.colors.success }]}
                        onPress={() => router.back()}
                    >
                        <Text style={[styles.btnText, { color: '#FFF' }]}>Done</Text>
                    </TouchableOpacity>
                )}

                <Text style={[styles.disclaimer, { color: theme.colors.textSecondary }]}>
                    We only access data you explicitly allow. You can disconnect at any time.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    hero: {
        alignItems: 'center',
        marginVertical: 40,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    row: {
        marginBottom: 12,
    },
    label: {
        fontWeight: 'bold',
    },
    serviceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    serviceName: {
        fontSize: 16,
    },
    footer: {
        marginTop: 'auto',
    },
    btn: {
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    btnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disclaimer: {
        fontSize: 12,
        textAlign: 'center',
    },
});
