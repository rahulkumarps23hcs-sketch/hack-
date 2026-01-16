import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Card from './Card';

export default function VitalsCard({ title, value, unit, icon: Icon }) {
    const { theme } = useTheme();

    return (
        <Card style={styles.container}>
            <View style={styles.iconContainer}>
                {Icon && <Icon size={24} color={theme.colors.primary} />}
            </View>
            <Text style={[styles.title, { color: theme.colors.textSecondary }]}>{title}</Text>
            <View style={styles.valueRow}>
                <Text style={[styles.value, { color: theme.colors.textMain }]}>{value}</Text>
                <Text style={[styles.unit, { color: theme.colors.textSecondary }]}>{unit}</Text>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 16,
    },
    iconContainer: {
        marginBottom: 8,
    },
    title: {
        fontSize: 12,
        marginBottom: 4,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    unit: {
        fontSize: 14,
        marginLeft: 4,
    },
});
