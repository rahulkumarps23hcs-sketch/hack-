import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Send, Bot, ChevronLeft } from 'lucide-react-native';

const QUICK_REPLIES = [
    'I feel stressed',
    'Book an appointment',
    'Medication reminder',
];

export default function ChatbotScreen() {
    const { theme } = useTheme();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello! I\'m your AI health assistant. How can I help you today?', sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    const flatListRef = useRef(null);

    const handleSend = (text = message) => {
        if (text.trim()) {
            const userMessage = {
                id: Date.now().toString(),
                text: text,
                sender: 'user',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, userMessage]);
            setMessage('');

            // Simulate bot response
            setTimeout(() => {
                let botResponse = 'I understand. Let me help you with that.';

                if (text.toLowerCase().includes('stress')) {
                    botResponse = 'I hear you. Try taking deep breaths and consider a short walk. Would you like me to schedule a mental health consultation?';
                } else if (text.toLowerCase().includes('appointment')) {
                    botResponse = 'I can help you book an appointment. Which doctor would you like to see?';
                } else if (text.toLowerCase().includes('medication')) {
                    botResponse = 'Your next medication is due at 8:00 PM. Would you like me to set a reminder?';
                }

                const botMessage = {
                    id: (Date.now() + 1).toString(),
                    text: botResponse,
                    sender: 'bot',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages(prev => [...prev, botMessage]);
            }, 1000);
        }
    };

    const renderMessage = ({ item }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.botMessage]}>
                {!isUser && (
                    <View style={[styles.botAvatar, { backgroundColor: theme.colors.primary }]}>
                        <Bot size={20} color="#FFFFFF" />
                    </View>
                )}
                <View style={[
                    styles.messageBubble,
                    { backgroundColor: isUser ? theme.colors.primary : theme.colors.surface }
                ]}>
                    <Text style={[styles.messageText, { color: isUser ? '#FFFFFF' : theme.colors.textMain }]}>
                        {item.text}
                    </Text>
                    <Text style={[styles.timeText, { color: isUser ? 'rgba(255,255,255,0.7)' : theme.colors.textSecondary }]}>
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
                title: 'AI Health Assistant',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
                        <ChevronLeft size={24} color={theme.colors.textMain} />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
            }} />

            {/* Disclaimer */}
            <View style={[styles.disclaimer, { backgroundColor: theme.colors.warning + '15', borderColor: theme.colors.warning }]}>
                <Text style={[styles.disclaimerText, { color: theme.colors.textMain }]}>
                    ⚠️ I am an AI assistant, not a doctor. For medical emergencies, please call 911.
                </Text>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.listContent}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            />

            {/* Quick Replies */}
            <View style={styles.quickReplies}>
                {QUICK_REPLIES.map((reply, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.quickReplyChip, { borderColor: theme.colors.primary }]}
                        onPress={() => handleSend(reply)}
                    >
                        <Text style={[styles.quickReplyText, { color: theme.colors.primary }]}>{reply}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
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
                    onPress={() => handleSend()}
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
    disclaimer: {
        padding: 12,
        borderBottomWidth: 1,
    },
    disclaimerText: {
        fontSize: 12,
        textAlign: 'center',
    },
    listContent: {
        padding: 16,
    },
    messageContainer: {
        marginBottom: 12,
        flexDirection: 'row',
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    botMessage: {
        justifyContent: 'flex-start',
    },
    botAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
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
    quickReplies: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 12,
        gap: 8,
    },
    quickReplyChip: {
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    quickReplyText: {
        fontSize: 14,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderTopWidth: 1,
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
