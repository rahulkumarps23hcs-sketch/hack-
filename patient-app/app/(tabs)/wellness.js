import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/Card';
import { Moon, Activity, Brain } from 'lucide-react-native';

export default function WellnessScreen() {
    const { theme } = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.content}>
                {/* Sleep Tracking */}
                <Card>
                    <View style={styles.cardHeader}>
                        <Moon size={24} color={theme.colors.primary} />
                        <Text style={[styles.cardTitle, { color: theme.colors.textMain }]}>Sleep</Text>
                    </View>
                    <Text style={[styles.value, { color: theme.colors.textMain }]}>7h 32m</Text>
                    <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Last Night</Text>
                </Card>

                {/* Activity */}
                <Card>
                    <View style={styles.cardHeader}>
                        <Activity size={24} color={theme.colors.primary} />
                        <Text style={[styles.cardTitle, { color: theme.colors.textMain }]}>Activity</Text>
                    </View>
                    <Text style={[styles.value, { color: theme.colors.textMain }]}>7,234 steps</Text>
                    <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Today</Text>
                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => router.push('/wellness/setup')}
                    >
                        <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                            Connect Wearable Device
                        </Text>
                    </TouchableOpacity>
                </Card>

                {/* Mental Wellness */}
                <Card>
                    <View style={styles.cardHeader}>
                        <Brain size={24} color={theme.colors.primary} />
                        <Text style={[styles.cardTitle, { color: theme.colors.textMain }]}>
                            Mental Wellness
                        </Text>
                    </View>
                    <Text style={[styles.value, { color: theme.colors.textMain }]}>Good</Text>
                    <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Current Mood</Text>
                </Card>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12,
    },
    value: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    label: {
        fontSize: 14,
    },
    linkButton: {
        marginTop: 12,
    },
    linkText: {
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});
