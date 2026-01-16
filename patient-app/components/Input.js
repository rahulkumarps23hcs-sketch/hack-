import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function Input({ placeholder, value, onChangeText, secureTextEntry, style }) {
    const { theme } = useTheme();

    return (
        <TextInput
            style={[
                styles.input,
                {
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.textMain,
                    borderColor: theme.colors.border,
                },
                style
            ]}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textSecondary}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 16,
        marginVertical: 8,
        fontSize: 16,
    },
});
