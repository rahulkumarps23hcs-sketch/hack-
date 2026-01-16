import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

const HomeScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get('/mental-health/analytics/summary');
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.name}>{user?.name || 'Patient'}</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('AddEntry')}
        >
          <Text style={styles.actionIcon}>➕</Text>
          <Text style={styles.actionText}>Add Entry</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Appointments')}
        >
          <Text style={styles.actionIcon}>📅</Text>
          <Text style={styles.actionText}>Appointments</Text>
        </TouchableOpacity>
      </View>

      {summary && (
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Your Health Summary</Text>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Average Mood</Text>
            <Text style={styles.metricValue}>
              {summary.averageMood.toFixed(1)}/10
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Average Anxiety Level</Text>
            <Text style={styles.metricValue}>
              {summary.averageAnxiety.toFixed(1)}/10
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Average Sleep Quality</Text>
            <Text style={styles.metricValue}>
              {summary.averageSleep.toFixed(1)}/10
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total Entries</Text>
            <Text style={styles.metricValue}>{summary.totalEntries}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.viewAllButton}
        onPress={() => navigation.navigate('MentalHealth')}
      >
        <Text style={styles.viewAllText}>View All Mental Health Entries →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D9E0',
  },
  greeting: {
    fontSize: 16,
    color: '#5A6C7D',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C3E50',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D9E0',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
  },
  summarySection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D1D9E0',
  },
  metricLabel: {
    fontSize: 14,
    color: '#5A6C7D',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#6B9BD1',
  },
  viewAllButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#6B9BD1',
    borderRadius: 8,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
