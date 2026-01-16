import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import { Bell, Calendar, CreditCard, Heart, ChevronLeft } from 'lucide-react-native';

const NOTIFICATIONS = [
    { id: '1', type: 'appointment', title: 'Appointment Reminder', message: 'Your appointment with Dr. Sarah Smith is tomorrow at 10:00 AM', time: '2h ago', read: false },
    { id: '2', type: 'payment', title: 'Payment Successful', message: 'Your payment of $52.50 has been processed', time: '1d ago', read: false },
    { id: '3', type: 'health', title: 'Health Tip', message: 'Remember to take your medication at 8:00 PM', time: '2d ago', read: true },
];

export default function NotificationsScreen() {
    const { theme } = useTheme();

    const getIcon = (type) => {
        switch (type) {
            case 'appointment': return Calendar;
            case 'payment': return CreditCard;
            case 'health': return Heart;
            default: return Bell;
        }
    };

    const renderNotification = ({ item }) => {
        const Icon = getIcon(item.type);

        return (
            <Card style={[!item.read && { borderLeftWidth: 3, borderLeftColor: theme.colors.primary }]}>
                <View style={styles.notifHeader}>
                    <View style={[styles.iconCircle, { backgroundColor: theme.colors.primary + '15' }]}>
                        <Icon size={20} color={theme.colors.primary} />
                    </View>
                    <View style={styles.notifContent}>
                        <Text style={[styles.title, { color: theme.colors.textMain }]}>{item.title}</Text>
                        <Text style={[styles.message, { color: theme.colors.textSecondary }]}>{item.message}</Text>
                        <Text style={[styles.time, { color: theme.colors.textSecondary }]}>{item.time}</Text>
                    </View>
                </View>
            </Card>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{
                title: 'Notifications',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
                        <ChevronLeft size={24} color={theme.colors.textMain} />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
            }} />

            <FlatList
                data={NOTIFICATIONS}
                renderItem={renderNotification}
                keyExtractor={item => item.id}
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
    notifHeader: {
        flexDirection: 'row',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    notifContent: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    message: {
        fontSize: 14,
        marginBottom: 4,
    },
    time: {
        fontSize: 12,
    },
});
