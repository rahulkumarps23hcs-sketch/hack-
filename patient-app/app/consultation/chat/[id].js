import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';
import { Send, Paperclip, Video, ChevronLeft } from 'lucide-react-native';

export default function ChatScreen() {
    const { id } = useLocalSearchParams();
    const { theme } = useTheme();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello! How can I help you today?', sender: 'doctor', time: '10:00 AM' },
        { id: '2', text: 'Hi Dr. Smith, I wanted to discuss my recent test results.', sender: 'patient', time: '10:02 AM' },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const flatListRef = useRef(null);

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: message,
                sender: 'patient',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, newMessage]);
            setMessage('');

            // Simulate doctor typing
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                const doctorReply = {
                    id: (Date.now() + 1).toString(),
                    text: 'I understand. Let me review your results and get back to you shortly.',
                    sender: 'doctor',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages(prev => [...prev, doctorReply]);
            }, 2000);
        }
    };

    const renderMessage = ({ item }) => {
        const isPatient = item.sender === 'patient';
        return (
            <View style={[styles.messageContainer, isPatient ? styles.patientMessage : styles.doctorMessage]}>
                <View style={[
                    styles.messageBubble,
                    { backgroundColor: isPatient ? theme.colors.primary : theme.colors.surface }
                ]}>
                    <Text style={[styles.messageText, { color: isPatient ? '#FFFFFF' : theme.colors.textMain }]}>
                        {item.text}
                    </Text>
                    <Text style={[styles.timeText, { color: isPatient ? 'rgba(255,255,255,0.7)' : theme.colors.textSecondary }]}>
                        {item.time}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <Stack.Screen options={{
                title: 'Dr. Sarah Smith',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
                        <ChevronLeft size={24} color={theme.colors.textMain} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => router.push(`/consultation/video/${id}`)}>
                        <Video size={24} color={theme.colors.primary} />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
            }} />

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.listContent}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                ListFooterComponent={
                    isTyping ? (
                        <View style={styles.typingContainer}>
                            <Text style={[styles.typingText, { color: theme.colors.textSecondary }]}>
                                Dr. Smith is typing...
                            </Text>
                        </View>
                    ) : null
                }
            />

            <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
                <TouchableOpacity style={styles.attachButton}>
                    <Paperclip size={24} color={theme.colors.textSecondary} />
                </TouchableOpacity>
                <TextInput
                    style={[styles.input, { color: theme.colors.textMain }]}
                    placeholder="Type a message..."
                    placeholderTextColor={theme.colors.textSecondary}
                    value={message}
                    onChangeText={setMessage}
                    multiline
                />
                <TouchableOpacity
                    style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
                    onPress={handleSend}
                >
                    <Send size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: 16,
    },
    messageContainer: {
        marginBottom: 12,
    },
    patientMessage: {
        alignItems: 'flex-end',
    },
    doctorMessage: {
        alignItems: 'flex-start',
    },
    messageBubble: {
        maxWidth: '75%',
        padding: 12,
        borderRadius: 16,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
    },
    timeText: {
        fontSize: 11,
        marginTop: 4,
    },
    typingContainer: {
        paddingVertical: 8,
    },
    typingText: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderTopWidth: 1,
    },
    attachButton: {
        padding: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        maxHeight: 100,
        paddingHorizontal: 12,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
});
