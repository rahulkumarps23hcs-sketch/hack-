import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, Activity, ChevronRight } from 'lucide-react-native';

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Good Morning,</Text>
                    <Text style={styles.name}>John Doe</Text>
                </View>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>JD</Text>
                </View>
            </View>

            {/* Daily Snapshot */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Daily Snapshot</Text>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Today's Mood</Text>
                    <Text style={styles.placeholderText}>No entry yet. How are you feeling?</Text>
                    <TouchableOpacity style={styles.buttonSmall}>
                        <Text style={styles.buttonTextSmall}>Log Mood</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Upcoming Appointment */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
                <View style={[styles.card, styles.appointmentCard]}>
                    <View style={styles.iconContainer}>
                        <Calendar color="#6B9BD1" size={24} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.appointmentTitle}>Dr. Sarah Smith</Text>
                        <Text style={styles.appointmentTime}>Tomorrow, 10:00 AM</Text>
                        <Text style={styles.appointmentType}>Monthly Check-up</Text>
                    </View>
                </View>
            </View>

            {/* Quick Tips */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Daily Wisdom</Text>
                <View style={[styles.card, { backgroundColor: '#E8EDF2' }]}>
                    <Text style={styles.tipText}>"Take deep breaths. Small steps lead to big changes."</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
    },
    greeting: {
        fontSize: 16,
        color: '#636E72',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#6B9BD1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3436',
        marginBottom: 15,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#2D3436',
    },
    placeholderText: {
        color: '#B2BEC3',
        marginBottom: 15,
    },
    buttonSmall: {
        backgroundColor: '#6B9BD1',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    buttonTextSmall: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    appointmentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#F0F4F8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appointmentTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3436',
    },
    appointmentTime: {
        color: '#6B9BD1',
        fontWeight: '500',
        marginTop: 2,
    },
    appointmentType: {
        color: '#636E72',
        fontSize: 12,
        marginTop: 2,
    },
    tipText: {
        fontStyle: 'italic',
        color: '#636E72',
        textAlign: 'center',
    },
});
