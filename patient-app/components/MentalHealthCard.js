import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Card from './Card';

export default function MentalHealthCard({ mood, score }) {
    const { theme } = useTheme();

    return (
        <Card>
            <Text style={[styles.title, { color: theme.colors.textMain }]}>Mental Health</Text>
            <View style={styles.content}>
                <Text style={[styles.mood, { color: theme.colors.textSecondary }]}>Mood: {mood}</Text>
                <Text style={[styles.score, { color: theme.colors.primary }]}>Score: {score}/10</Text>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mood: {
        fontSize: 14,
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
