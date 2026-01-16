import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/Card';
import { CheckCircle, Download } from 'lucide-react-native';

export default function PaymentSuccessScreen() {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.content}>
                <View style={[styles.iconCircle, { backgroundColor: theme.colors.success + '15' }]}>
                    <CheckCircle size={64} color={theme.colors.success} />
                </View>

                <Text style={[styles.title, { color: theme.colors.textMain }]}>Payment Successful!</Text>
                <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                    Your appointment has been confirmed
                </Text>

                <Card style={styles.detailsCard}>
                    <Text style={[styles.cardTitle, { color: theme.colors.textMain }]}>Transaction Details</Text>
                    <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Transaction ID</Text>
                        <Text style={[styles.detailValue, { color: theme.colors.textMain }]}>TXN123456789</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Amount Paid</Text>
                        <Text style={[styles.detailValue, { color: theme.colors.textMain }]}>$52.50</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Date</Text>
                        <Text style={[styles.detailValue, { color: theme.colors.textMain }]}>
                            {new Date().toLocaleDateString()}
                        </Text>
                    </View>

                    <TouchableOpacity style={[styles.downloadButton, { borderColor: theme.colors.primary }]}>
                        <Download size={20} color={theme.colors.primary} />
                        <Text style={[styles.downloadText, { color: theme.colors.primary }]}>Download Invoice</Text>
                    </TouchableOpacity>
                </Card>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.colors.primary }]}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text style={styles.buttonText}>Back to Dashboard</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 32,
        textAlign: 'center',
    },
    detailsCard: {
        width: '100%',
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    detailLabel: {
        fontSize: 14,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginTop: 16,
    },
    downloadText: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
