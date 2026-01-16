import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/Card';
import { Pill, Clock } from 'lucide-react-native';

const MEDICATIONS = [
    { id: '1', name: 'Aspirin', dosage: '100mg', time: '8:00 AM', frequency: 'Daily' },
    { id: '2', name: 'Metformin', dosage: '500mg', time: '12:00 PM', frequency: 'Twice Daily' },
    { id: '3', name: 'Lisinopril', dosage: '10mg', time: '8:00 PM', frequency: 'Daily' },
];

export default function MedicationsScreen() {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('schedule');

    const renderMedication = ({ item }) => (
        <Card>
            <View style={styles.medHeader}>
                <View style={[styles.iconCircle, { backgroundColor: theme.colors.primary + '15' }]}>
                    <Pill size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.medInfo}>
                    <Text style={[styles.medName, { color: theme.colors.textMain }]}>{item.name}</Text>
                    <Text style={[styles.dosage, { color: theme.colors.textSecondary }]}>{item.dosage}</Text>
                </View>
            </View>
            <View style={styles.timeRow}>
                <Clock size={16} color={theme.colors.textSecondary} />
                <Text style={[styles.timeText, { color: theme.colors.textSecondary }]}>
                    {item.time} - {item.frequency}
                </Text>
            </View>
        </Card>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Tabs */}
            <View style={[styles.tabs, { backgroundColor: theme.colors.surface }]}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'schedule' && { borderBottomColor: theme.colors.primary }]}
                    onPress={() => setActiveTab('schedule')}
                >
                    <Text style={[
                        styles.tabText,
                        { color: activeTab === 'schedule' ? theme.colors.primary : theme.colors.textSecondary }
                    ]}>
                        Schedule
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'all' && { borderBottomColor: theme.colors.primary }]}
                    onPress={() => setActiveTab('all')}
                >
                    <Text style={[
                        styles.tabText,
                        { color: activeTab === 'all' ? theme.colors.primary : theme.colors.textSecondary }
                    ]}>
                        All Medications
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={MEDICATIONS}
                renderItem={renderMedication}
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
    medHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    medInfo: {
        flex: 1,
    },
    medName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dosage: {
        fontSize: 14,
        marginTop: 2,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 14,
        marginLeft: 8,
    },
});
