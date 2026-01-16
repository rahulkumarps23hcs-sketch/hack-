import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const MentalHealthScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await api.get('/mental-health');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Mental Health Tracker</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddEntry')}
          >
            <Text style={styles.addButtonText}>+ Add Entry</Text>
          </TouchableOpacity>
        </View>

        {entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No entries yet</Text>
            <Text style={styles.emptySubtext}>
              Start tracking your mental health by adding your first entry
            </Text>
          </View>
        ) : (
          entries.map((entry) => (
            <View key={entry.id} style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryDate}>{entry.date}</Text>
              </View>

              <View style={styles.metricsGrid}>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Mood</Text>
                  <Text style={styles.metricValue}>{entry.mood}/10</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Anxiety</Text>
                  <Text style={styles.metricValue}>{entry.anxietyLevel}/10</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Sleep</Text>
                  <Text style={styles.metricValue}>{entry.sleepQuality}/10</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Energy</Text>
                  <Text style={styles.metricValue}>{entry.energyLevel}/10</Text>
                </View>
              </View>

              {entry.notes && (
                <View style={styles.notesContainer}>
                  <Text style={styles.notes}>{entry.notes}</Text>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D9E0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
  },
  addButton: {
    backgroundColor: '#6B9BD1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    padding: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#5A6C7D',
    textAlign: 'center',
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginBottom: 0,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D9E0',
  },
  entryHeader: {
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  metric: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#E8EDF2',
    padding: 12,
    borderRadius: 6,
  },
  metricLabel: {
    fontSize: 12,
    color: '#5A6C7D',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B9BD1',
  },
  notesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#D1D9E0',
  },
  notes: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },
});

export default MentalHealthScreen;
