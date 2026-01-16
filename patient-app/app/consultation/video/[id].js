import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, StatusBar, Platform } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, FlipHorizontal, MessageSquare, Signal } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function VideoCallScreen() {
    const { id } = useLocalSearchParams();
    const { theme } = useTheme();

    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Main Video Area */}
            <View style={[styles.videoArea, { backgroundColor: '#1F2937' }]}>
                <View style={styles.topBar}>
                    <View style={styles.connectionStatus}>
                        <Signal size={16} color="#10B981" />
                        <Text style={styles.statusText}>Connected</Text>
                    </View>
                    <Text style={styles.timer}>{formatTime(duration)}</Text>
                </View>

                <View style={styles.centerInfo}>
                    <Text style={styles.doctorName}>Dr. Sarah Smith</Text>
                    <Text style={styles.appointmentInfo}>Cardiology Consultation</Text>
                </View>

                {/* Picture-in-Picture (User's Video) */}
                <View style={[styles.pip, { backgroundColor: '#374151' }]}>
                    <Text style={styles.pipText}>You</Text>
                </View>
            </View>

            {/* Controls */}
            <SafeAreaView style={[styles.controls, { backgroundColor: theme.colors.surface }]}>
                <View style={styles.controlsRow}>
                    <TouchableOpacity
                        style={[styles.controlButton, isMuted && styles.activeControl]}
                        onPress={() => setIsMuted(!isMuted)}
                    >
                        {isMuted ? <MicOff size={24} color="#FFFFFF" /> : <Mic size={24} color={theme.colors.textMain} />}
                        <Text style={[styles.controlLabel, { color: isMuted ? '#FFFFFF' : theme.colors.textMain }]}>
                            {isMuted ? 'Unmute' : 'Mute'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.controlButton, isVideoOff && styles.activeControl]}
                        onPress={() => setIsVideoOff(!isVideoOff)}
                    >
                        {isVideoOff ? <VideoOff size={24} color="#FFFFFF" /> : <VideoIcon size={24} color={theme.colors.textMain} />}
                        <Text style={[styles.controlLabel, { color: isVideoOff ? '#FFFFFF' : theme.colors.textMain }]}>
                            {isVideoOff ? 'Start Video' : 'Stop Video'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.controlButton, styles.endCallButton]}
                        onPress={() => router.back()}
                    >
                        <PhoneOff size={24} color="#FFFFFF" />
                        <Text style={[styles.controlLabel, { color: '#FFFFFF' }]}>End Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.controlButton}>
                        <FlipHorizontal size={24} color={theme.colors.textMain} />
                        <Text style={[styles.controlLabel, { color: theme.colors.textMain }]}>Flip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => router.push(`/consultation/chat/${id}`)}
                    >
                        <MessageSquare size={24} color={theme.colors.textMain} />
                        <Text style={[styles.controlLabel, { color: theme.colors.textMain }]}>Chat</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    videoArea: {
        flex: 1,
        justifyContent: 'space-between',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
    },
    connectionStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 12,
        marginLeft: 6,
    },
    timer: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    centerInfo: {
        alignItems: 'center',
        marginBottom: 40,
    },
    doctorName: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    appointmentInfo: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
    },
    pip: {
        position: 'absolute',
        top: 100,
        right: 20,
        width: 120,
        height: 160,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    pipText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    controls: {
        paddingVertical: 20,
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    controlButton: {
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
    },
    activeControl: {
        backgroundColor: '#6B7280',
    },
    endCallButton: {
        backgroundColor: '#EF4444',
    },
    controlLabel: {
        fontSize: 12,
        marginTop: 4,
    },
});
