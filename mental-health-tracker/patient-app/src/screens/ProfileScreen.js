import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { User, Bell, Shield, LogOut, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
    const [notifications, setNotifications] = React.useState(true);

    const ListItem = ({ icon: Icon, title, showSwitch, showChevron = true, isDestructive }) => (
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemIcon}>
                <Icon size={20} color={isDestructive ? '#FF7675' : '#636E72'} />
            </View>
            <Text style={[styles.listItemText, isDestructive && { color: '#FF7675' }]}>{title}</Text>
            <View style={{ flex: 1 }} />
            {showSwitch && (
                <Switch
                    value={notifications}
                    onValueChange={setNotifications}
                    trackColor={{ false: "#767577", true: "#6B9BD1" }}
                />
            )}
            {showChevron && !showSwitch && <ChevronRight size={20} color="#B2BEC3" />}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarLarge}>
                    <Text style={styles.avatarTextLarge}>JD</Text>
                </View>
                <Text style={styles.nameLarge}>John Doe</Text>
                <Text style={styles.email}>john.doe@example.com</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Settings</Text>
                <View style={styles.listContainer}>
                    <ListItem icon={User} title="Personal Information" />
                    <View style={styles.separator} />
                    <ListItem icon={Bell} title="Notifications" showSwitch />
                    <View style={styles.separator} />
                    <ListItem icon={Shield} title="Privacy & Security" />
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.listContainer}>
                    <ListItem icon={LogOut} title="Log Out" isDestructive showChevron={false} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        padding: 20,
        paddingTop: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatarLarge: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#6B9BD1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    avatarTextLarge: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
    },
    nameLarge: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3436',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#636E72',
    },
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: '#B2BEC3',
        marginBottom: 10,
        marginLeft: 10,
        textTransform: 'uppercase',
    },
    listContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    listItemIcon: {
        marginRight: 16,
    },
    listItemText: {
        fontSize: 16,
        color: '#2D3436',
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: '#F5F7FA',
        marginLeft: 52,
    },
});
