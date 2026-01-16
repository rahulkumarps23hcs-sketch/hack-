import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/Card';
import { Calendar, Clock, MessageSquare, Video, Plus } from 'lucide-react-native';

const APPOINTMENTS = [
    { id: '1', doctor: 'Dr. Sarah Smith', specialty: 'Cardiologist', date: 'Tomorrow', time: '10:00 AM', status: 'upcoming' },
    { id: '2', doctor: 'Dr. John Doe', specialty: 'General Physician', date: 'Jan 25', time: '2:00 PM', status: 'upcoming' },
    { id: '3', doctor: 'Dr. Emily Brown', specialty: 'Dermatologist', date: 'Jan 15', time: '11:00 AM', status: 'past' },
];

export default function AppointmentsScreen() {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('upcoming');

    const filteredAppointments = APPOINTMENTS.filter(apt => apt.status === activeTab);

    const renderAppointment = ({ item }) => (
        <Card>
            <View style={styles.appointmentHeader}>
                <View>
                    <Text style={[styles.doctorName, { color: theme.colors.textMain }]}>{item.doctor}</Text>
                    <Text style={[styles.specialty, { color: theme.colors.textSecondary }]}>{item.specialty}</Text>
                </View>
                <Calendar size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.timeRow}>
                <Clock size={16} color={theme.colors.textSecondary} />
                <Text style={[styles.timeText, { color: theme.colors.textSecondary }]}>
                    {item.date} at {item.time}
                </Text>
            </View>

            {activeTab === 'upcoming' && (
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.msgBtn, { borderColor: theme.colors.primary }]}
                        onPress={() => router.push(`/consultation/chat/${item.id}`)}
                    >
                        <MessageSquare size={18} color={theme.colors.primary} />
                        <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>Message</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.callBtn, { backgroundColor: theme.colors.primary }]}
                        onPress={() => router.push(`/consultation/video/${item.id}`)}
                    >
                        <Video size={18} color="#FFF" />
                        <Text style={[styles.actionButtonText, { color: '#FFF' }]}>Join Call</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Card>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Tabs */}
            <View style={[styles.tabs, { backgroundColor: theme.colors.surface }]}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'upcoming' && { borderBottomColor: theme.colors.primary }]}
                    onPress={() => setActiveTab('upcoming')}
                >
                    <Text style={[
                        styles.tabText,
                        { color: activeTab === 'upcoming' ? theme.colors.primary : theme.colors.textSecondary }
                    ]}>
                        Upcoming
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'past' && { borderBottomColor: theme.colors.primary }]}
                    onPress={() => setActiveTab('past')}
                >
                    <Text style={[
                        styles.tabText,
                        { color: activeTab === 'past' ? theme.colors.primary : theme.colors.textSecondary }
                    ]}>
                        Past
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredAppointments}
                renderItem={renderAppointment}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />

            {/* FAB */}
            <TouchableOpacity
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                onPress={() => router.push('/payment/checkout')}
            >
                <Plus size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabs: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
    },
    list: {
        padding: 20,
    },
    appointmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    specialty: {
        fontSize: 14,
        marginTop: 4,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    timeText: {
        fontSize: 14,
        marginLeft: 8,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 8,
        gap: 6,
    },
    msgBtn: {
        borderWidth: 1,
    },
    callBtn: {
        // backgroundColor set dynamically
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '600',
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
