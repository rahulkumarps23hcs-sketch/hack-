import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function Button({ title, onPress, loading, variant = 'primary', style }) {
    const { theme } = useTheme();

    const backgroundColor = variant === 'primary' ? theme.colors.primary : theme.colors.surface;
    const textColor = variant === 'primary' ? '#FFFFFF' : theme.colors.textMain;

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }, style]}
            onPress={onPress}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
