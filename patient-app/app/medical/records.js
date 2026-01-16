import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/Card';
import { FileText, Download, ChevronLeft, Calendar, User, Activity } from 'lucide-react-native';

const MEDICAL_RECORDS = [
    { id: '1', title: 'Blood Test Results', date: 'Jan 15, 2026', type: 'Lab Report', doctor: 'Dr. Sarah Smith' },
    { id: '2', title: 'X-Ray Chest', date: 'Dec 20, 2025', type: 'Imaging', doctor: 'Dr. John Doe' },
    { id: '3', title: 'Annual Checkup', date: 'Nov 10, 2025', type: 'Consultation', doctor: 'Dr. Emily Brown' },
    { id: '4', title: 'Prescription - Aspirin', date: 'Oct 5, 2025', type: 'Prescription', doctor: 'Dr. Sarah Smith' },
];

export default function MedicalRecordsScreen() {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{
                title: 'Medical Records',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
                        <ChevronLeft size={24} color={theme.colors.textMain} />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
            }} />

            <ScrollView contentContainerStyle={styles.content}>
                {/* Patient Info */}
                <Card>
                    <View style={styles.patientHeader}>
                        <View style={[styles.avatarCircle, { backgroundColor: theme.colors.primary }]}>
                            <User size={32} color="#FFFFFF" />
                        </View>
                        <View style={styles.patientInfo}>
                            <Text style={[styles.patientName, { color: theme.colors.textMain }]}>Alex Johnson</Text>
                            <Text style={[styles.patientDetail, { color: theme.colors.textSecondary }]}>
                                Patient ID: PAT-2024-001
                            </Text>
                            <Text style={[styles.patientDetail, { color: theme.colors.textSecondary }]}>
                                Blood Type: O+
                            </Text>
                        </View>
                    </View>
                </Card>

                {/* Medical History Summary */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: theme.colors.textMain }]}>Health Summary</Text>
                    <View style={styles.summaryRow}>
                        <View style={styles.summaryItem}>
                            <Activity size={20} color={theme.colors.primary} />
                            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Allergies</Text>
                            <Text style={[styles.summaryValue, { color: theme.colors.textMain }]}>Penicillin</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Calendar size={20} color={theme.colors.primary} />
                            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Last Visit</Text>
                            <Text style={[styles.summaryValue, { color: theme.colors.textMain }]}>Jan 15, 2026</Text>
                        </View>
                    </View>
                </Card>

                {/* Records List */}
                <Text style={[styles.sectionTitle, { color: theme.colors.textMain }]}>Documents</Text>
                {MEDICAL_RECORDS.map(record => (
                    <Card key={record.id}>
                        <View style={styles.recordHeader}>
                            <View style={[styles.iconCircle, { backgroundColor: theme.colors.primary + '15' }]}>
                                <FileText size={20} color={theme.colors.primary} />
                            </View>
                            <View style={styles.recordInfo}>
                                <Text style={[styles.recordTitle, { color: theme.colors.textMain }]}>
                                    {record.title}
                                </Text>
                                <Text style={[styles.recordType, { color: theme.colors.textSecondary }]}>
                                    {record.type}
                                </Text>
                                <View style={styles.recordMeta}>
                                    <Text style={[styles.recordDate, { color: theme.colors.textSecondary }]}>
                                        {record.date}
                                    </Text>
                                    <Text style={[styles.recordDoctor, { color: theme.colors.textSecondary }]}>
                                        • {record.doctor}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.downloadButton}>
                                <Download size={20} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </Card>
                ))}
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
    patientHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    patientInfo: {
        flex: 1,
    },
    patientName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    patientDetail: {
        fontSize: 14,
        marginBottom: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 8,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    summaryItem: {
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: 12,
        marginTop: 8,
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },
    recordHeader: {
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
    recordInfo: {
        flex: 1,
    },
    recordTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    recordType: {
        fontSize: 12,
        marginBottom: 4,
    },
    recordMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recordDate: {
        fontSize: 12,
    },
    recordDoctor: {
        fontSize: 12,
        marginLeft: 4,
    },
    downloadButton: {
        padding: 8,
    },
});
