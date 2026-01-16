import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function Card({ children, noPadding, style }) {
    const { theme } = useTheme();

    return (
        <View style={[
            styles.card,
            { backgroundColor: theme.colors.surface },
            theme.shadows.card,
            noPadding && styles.noPadding,
            style
        ]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    noPadding: {
        padding: 0,
    },
});
