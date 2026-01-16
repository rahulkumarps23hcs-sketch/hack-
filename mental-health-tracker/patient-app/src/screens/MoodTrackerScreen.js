import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Smile, Frown, Meh } from 'lucide-react-native';

export default function MoodTrackerScreen() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [notes, setNotes] = useState('');

    const handleSave = () => {
        if (!selectedMood) {
            Alert.alert('Please select a mood');
            return;
        }
        Alert.alert('Saved!', 'Your mood has been logged successfully.');
        setSelectedMood(null);
        setNotes('');
    };

    const MoodOption = ({ value, label, icon: Icon, color }) => (
        <TouchableOpacity
            style={[
                styles.moodButton,
                selectedMood === value && styles.moodButtonSelected,
                selectedMood === value && { borderColor: color, backgroundColor: color + '10' }
            ]}
            onPress={() => setSelectedMood(value)}
        >
            <Icon color={selectedMood === value ? color : '#B2BEC3'} size={40} />
            <Text style={[styles.moodLabel, selectedMood === value && { color: color, fontWeight: 'bold' }]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerTitle}>How are you feeling?</Text>
            <Text style={styles.subtitle}>Select the option that best describes your current mood.</Text>

            <View style={styles.moodGrid}>
                <MoodOption value="great" label="Great" icon={Smile} color="#55BC8A" />
                <MoodOption value="okay" label="Okay" icon={Meh} color="#FDCB6E" />
                <MoodOption value="bad" label="Not Good" icon={Frown} color="#FF7675" />
            </View>

            <Text style={styles.inputLabel}>Journal (Optional)</Text>
            <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                placeholder="Write down your thoughts..."
                placeholderTextColor="#B2BEC3"
                value={notes}
                onChangeText={setNotes}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Entry</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        padding: 20,
        paddingTop: 60,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D3436',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#636E72',
        marginBottom: 40,
    },
    moodGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    moodButton: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        backgroundColor: 'white',
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    moodButtonSelected: {
        transform: [{ scale: 1.05 }],
    },
    moodLabel: {
        marginTop: 10,
        color: '#B2BEC3',
        fontSize: 14,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3436',
        marginBottom: 10,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        height: 120,
        textAlignVertical: 'top',
        fontSize: 16,
        color: '#2D3436',
        borderWidth: 1,
        borderColor: '#DFE6E9',
        marginBottom: 30,
    },
    saveButton: {
        backgroundColor: '#6B9BD1',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#6B9BD1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
