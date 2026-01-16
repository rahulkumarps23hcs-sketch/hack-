import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/Card';
import { User, FileText, CreditCard, Sun, Moon, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
    const { logout } = useAuth();
    const { theme, isDark, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        router.replace('/');
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
                <View style={styles.avatar}>
                    <User size={40} color="#FFFFFF" />
                </View>
                <Text style={styles.name}>Alex Johnson</Text>
                <Text style={styles.email}>alex.johnson@example.com</Text>
            </View>

            <View style={styles.content}>
                {/* Appearance */}
                <Text style={[styles.sectionTitle, { color: theme.colors.textMain }]}>Appearance</Text>
                <Card>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            {isDark ?
                                <Moon size={20} color={theme.colors.textMain} /> :
                                <Sun size={20} color={theme.colors.textMain} />
                            }
                            <Text style={[styles.menuText, { color: theme.colors.textMain }]}>Dark Mode</Text>
                        </View>
                        <Switch
                            value={isDark}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#767577', true: theme.colors.primary }}
                        />
                    </View>
                </Card>

                {/* Medical History */}
                <Text style={[styles.sectionTitle, { color: theme.colors.textMain }]}>Medical History</Text>
                <Card noPadding>
                    <TouchableOpacity style={styles.menuItem}>
                        <FileText size={20} color={theme.colors.textMain} />
                        <Text style={[styles.menuText, { color: theme.colors.textMain }]}>Medical Records</Text>
                    </TouchableOpacity>
                </Card>

                {/* Payment */}
                <Text style={[styles.sectionTitle, { color: theme.colors.textMain }]}>Payment</Text>
                <Card noPadding>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => router.push('/payment/history')}
                    >
                        <CreditCard size={20} color={theme.colors.textMain} />
                        <Text style={[styles.menuText, { color: theme.colors.textMain }]}>Payment History</Text>
                    </TouchableOpacity>
                </Card>

                {/* Settings */}
                <Text style={[styles.sectionTitle, { color: theme.colors.textMain }]}>Settings</Text>
                <Card noPadding>
                    <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                        <LogOut size={20} color={theme.colors.error} />
                        <Text style={[styles.menuText, { color: theme.colors.error }]}>Log Out</Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 40,
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    menuText: {
        fontSize: 16,
        marginLeft: 12,
    },
});
