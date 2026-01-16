import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/Card';
import { FileText, ChevronLeft } from 'lucide-react-native';

const TRANSACTIONS = [
    { id: '1', date: 'Jan 20, 2026', doctor: 'Dr. Sarah Smith', amount: '$52.50', status: 'Success' },
    { id: '2', date: 'Jan 10, 2026', doctor: 'Initial Consultation', amount: '$30.00', status: 'Success' },
    { id: '3', date: 'Dec 15, 2025', doctor: 'Lab Tests', amount: '$120.00', status: 'Success' },
];

export default function PaymentHistoryScreen() {
    const { theme } = useTheme();

    const renderTransaction = ({ item }) => (
        <Card>
            <View style={styles.transactionHeader}>
                <View style={[styles.iconCircle, { backgroundColor: theme.colors.primary + '15' }]}>
                    <FileText size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.transactionInfo}>
                    <Text style={[styles.doctor, { color: theme.colors.textMain }]}>{item.doctor}</Text>
                    <Text style={[styles.date, { color: theme.colors.textSecondary }]}>{item.date}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={[styles.amount, { color: theme.colors.textMain }]}>{item.amount}</Text>
                    <Text style={[styles.status, { color: theme.colors.success }]}>{item.status}</Text>
                </View>
            </View>
        </Card>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{
                title: 'Payment History',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
                        <ChevronLeft size={24} color={theme.colors.textMain} />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
            }} />

            <FlatList
                data={TRANSACTIONS}
                keyExtractor={item => item.id}
                renderItem={renderTransaction}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: 20,
    },
    transactionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    transactionInfo: {
        flex: 1,
    },
    doctor: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    date: {
        fontSize: 12,
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 12,
        fontWeight: '500',
    },
});
