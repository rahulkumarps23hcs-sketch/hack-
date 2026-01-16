import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/Card';
import VitalsCard from '../../components/VitalsCard';
import MentalHealthCard from '../../components/MentalHealthCard';
import { Bell, Heart, Activity, Droplet, MessageCircle, TrendingUp } from 'lucide-react-native';

export default function DashboardScreen() {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>Good Morning,</Text>
                    <Text style={[styles.userName, { color: theme.colors.textMain }]}>Alex Johnson</Text>
                </View>
                <TouchableOpacity
                    style={styles.notifButton}
                    onPress={() => router.push('/notifications')}
                >
                    <Bell size={24} color={theme.colors.textMain} />
                    <View style={[styles.badge, { backgroundColor: theme.colors.error }]} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Daily Goals */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: theme.colors.textMain }]}>Daily Goals</Text>
                    <View style={styles.goalRow}>
                        <View style={styles.goalItem}>
                            <TrendingUp size={20} color={theme.colors.primary} />
                            <Text style={[styles.goalText, { color: theme.colors.textSecondary }]}>
                                Daily Steps
                            </Text>
                            <Text style={[styles.goalValue, { color: theme.colors.textMain }]}>
                                7,234 / 10,000
                            </Text>
                            <TouchableOpacity onPress={() => router.push('/wellness/setup')}>
                                <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                                    Connect Device
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>

                {/* Vitals */}
                <Text style={[styles.sectionTitle, { color: theme.colors.textMain }]}>Vitals</Text>
                <View style={styles.vitalsGrid}>
                    <VitalsCard title="Heart Rate" value="72" unit="bpm" icon={Heart} />
                    <VitalsCard title="Blood Pressure" value="120/80" unit="mmHg" icon={Activity} />
                    <VitalsCard title="Oxygen" value="98" unit="%" icon={Droplet} />
                </View>

                {/* Mental Health */}
                <MentalHealthCard mood="Good" score={8} />

                {/* Upcoming Appointments */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: theme.colors.textMain }]}>
                        Upcoming Appointments
                    </Text>
                    <View style={styles.appointmentItem}>
                        <Text style={[styles.appointmentTitle, { color: theme.colors.textMain }]}>
                            Dr. Sarah Smith
                        </Text>
                        <Text style={[styles.appointmentTime, { color: theme.colors.textSecondary }]}>
                            Tomorrow, 10:00 AM
                        </Text>
                    </View>
                </Card>
            </ScrollView>

            {/* Chatbot FAB */}
            <TouchableOpacity
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                onPress={() => router.push('/chatbot')}
            >
                <MessageCircle size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
    },
    greeting: {
        fontSize: 14,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    notifButton: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    content: {
        padding: 20,
        paddingTop: 0,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    goalRow: {
        marginTop: 8,
    },
    goalItem: {
        alignItems: 'center',
    },
    goalText: {
        fontSize: 14,
        marginTop: 8,
    },
    goalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },
    linkText: {
        fontSize: 12,
        marginTop: 4,
        textDecorationLine: 'underline',
    },
    vitalsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    appointmentItem: {
        paddingVertical: 8,
    },
    appointmentTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    appointmentTime: {
        fontSize: 14,
        marginTop: 4,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
});
