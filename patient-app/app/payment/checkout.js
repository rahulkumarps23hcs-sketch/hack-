import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { CreditCard, Smartphone, Building, ChevronLeft } from 'lucide-react-native';

export default function CheckoutScreen() {
    const { theme } = useTheme();
    const [selectedMethod, setSelectedMethod] = useState('card');

    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
        { id: 'upi', name: 'UPI', icon: Smartphone },
        { id: 'clinic', name: 'Pay at Clinic', icon: Building },
    ];

    const handlePayment = () => {
        router.push('/payment/success');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{
                title: 'Checkout',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
                        <ChevronLeft size={24} color={theme.colors.textMain} />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
            }} />

            <ScrollView contentContainerStyle={styles.content}>
                {/* Consultation Summary */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: theme.colors.textMain }]}>
                        Consultation Summary
                    </Text>
                    <View style={styles.summaryRow}>
                        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Doctor</Text>
                        <Text style={[styles.value, { color: theme.colors.textMain }]}>Dr. Sarah Smith</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Date</Text>
                        <Text style={[styles.value, { color: theme.colors.textMain }]}>Tomorrow, 10:00 AM</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Type</Text>
                        <Text style={[styles.value, { color: theme.colors.textMain }]}>Video Consultation</Text>
                    </View>
                </Card>

                {/* Fee Breakdown */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: theme.colors.textMain }]}>Fee Breakdown</Text>
                    <View style={styles.feeRow}>
                        <Text style={[styles.feeLabel, { color: theme.colors.textSecondary }]}>Consultation Fee</Text>
                        <Text style={[styles.feeValue, { color: theme.colors.textMain }]}>$50.00</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={[styles.feeLabel, { color: theme.colors.textSecondary }]}>Service Fee</Text>
                        <Text style={[styles.feeValue, { color: theme.colors.textMain }]}>$2.50</Text>
                    </View>
                    <View style={[styles.feeRow, styles.totalRow, { borderTopColor: theme.colors.border }]}>
                        <Text style={[styles.totalLabel, { color: theme.colors.textMain }]}>Total</Text>
                        <Text style={[styles.totalValue, { color: theme.colors.primary }]}>$52.50</Text>
                    </View>
                </Card>

                {/* Payment Methods */}
                <Text style={[styles.sectionTitle, { color: theme.colors.textMain }]}>Payment Method</Text>
                {paymentMethods.map(method => {
                    const Icon = method.icon;
                    const isSelected = selectedMethod === method.id;
                    return (
                        <TouchableOpacity
                            key={method.id}
                            onPress={() => setSelectedMethod(method.id)}
                        >
                            <Card style={[
                                styles.methodCard,
                                isSelected && { borderColor: theme.colors.primary, borderWidth: 2 }
                            ]}>
                                <Icon size={24} color={isSelected ? theme.colors.primary : theme.colors.textSecondary} />
                                <Text style={[
                                    styles.methodName,
                                    { color: isSelected ? theme.colors.primary : theme.colors.textMain }
                                ]}>
                                    {method.name}
                                </Text>
                            </Card>
                        </TouchableOpacity>
                    );
                })}

                <Button title="Pay & Confirm" onPress={handlePayment} style={styles.payButton} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
    },
    value: {
        fontSize: 14,
        fontWeight: '600',
    },
    feeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    feeLabel: {
        fontSize: 14,
    },
    feeValue: {
        fontSize: 14,
    },
    totalRow: {
        borderTopWidth: 1,
        paddingTop: 12,
        marginTop: 8,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
    },
    methodName: {
        fontSize: 16,
        marginLeft: 12,
        fontWeight: '600',
    },
    payButton: {
        marginTop: 20,
    },
});
