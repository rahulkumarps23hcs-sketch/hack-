import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const AddEntryScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [mood, setMood] = useState('5');
  const [anxietyLevel, setAnxietyLevel] = useState('5');
  const [sleepQuality, setSleepQuality] = useState('5');
  const [energyLevel, setEnergyLevel] = useState('5');
  const [stressLevel, setStressLevel] = useState('5');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post('/mental-health', {
        mood: parseInt(mood),
        anxietyLevel: parseInt(anxietyLevel),
        sleepQuality: parseInt(sleepQuality),
        energyLevel: parseInt(energyLevel),
        stressLevel: parseInt(stressLevel),
        notes,
        date: new Date().toISOString().split('T')[0],
      });

      Alert.alert('Success', 'Entry added successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mood (1-10)</Text>
          <TextInput
            style={styles.input}
            value={mood}
            onChangeText={setMood}
            keyboardType="numeric"
            placeholder="5"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Anxiety Level (1-10)</Text>
          <TextInput
            style={styles.input}
            value={anxietyLevel}
            onChangeText={setAnxietyLevel}
            keyboardType="numeric"
            placeholder="5"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sleep Quality (1-10)</Text>
          <TextInput
            style={styles.input}
            value={sleepQuality}
            onChangeText={setSleepQuality}
            keyboardType="numeric"
            placeholder="5"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Energy Level (1-10)</Text>
          <TextInput
            style={styles.input}
            value={energyLevel}
            onChangeText={setEnergyLevel}
            keyboardType="numeric"
            placeholder="5"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Stress Level (1-10)</Text>
          <TextInput
            style={styles.input}
            value={stressLevel}
            onChangeText={setStressLevel}
            keyboardType="numeric"
            placeholder="5"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            placeholder="How are you feeling today?"
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Saving...' : 'Save Entry'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D9E0',
    color: '#2C3E50',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#6B9BD1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddEntryScreen;
