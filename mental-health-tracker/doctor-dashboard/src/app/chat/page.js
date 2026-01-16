"use client";
import React, { useState } from 'react';
import { ArrowLeft, Send, Paperclip, FileText, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Backend API Comment:
// GET /api/chats/:appointmentId - Fetch chat messages
// POST /api/chats/:appointmentId/messages - Send new message
// POST /api/chats/:appointmentId/attachments - Upload file

const MOCK_MESSAGES = [
    {
        id: 1,
        sender: 'patient',
        senderName: 'John Doe',
        content: 'Good morning, Doctor. I wanted to discuss my recent anxiety episodes.',
        timestamp: '2024-01-20 09:15 AM',
        attachments: []
    },
    {
        id: 2,
        sender: 'doctor',
        senderName: 'Dr. Sarah Smith',
        content: 'Good morning, John. I reviewed your recent journal entries. Can you tell me more about when these episodes occur?',
        timestamp: '2024-01-20 09:18 AM',
        attachments: []
    },
    {
        id: 3,
        sender: 'patient',
        senderName: 'John Doe',
        content: 'Usually in the evenings, especially after work. I\'ve attached my mood log from this week.',
        timestamp: '2024-01-20 09:22 AM',
        attachments: [
            { name: 'mood_log_jan_week3.pdf', type: 'pdf', size: '245 KB' }
        ]
    },
    {
        id: 4,
        sender: 'doctor',
        senderName: 'Dr. Sarah Smith',
        content: 'Thank you for sharing. I can see the pattern. Let\'s discuss some coping strategies during our next session. I\'m attaching a breathing exercise guide.',
        timestamp: '2024-01-20 09:30 AM',
        attachments: [
            { name: 'breathing_exercises.pdf', type: 'pdf', size: '1.2 MB' }
        ]
    },
    {
        id: 5,
        sender: 'patient',
        senderName: 'John Doe',
        content: 'Thank you, Doctor. I\'ll try these exercises tonight.',
        timestamp: '2024-01-20 09:35 AM',
        attachments: []
    }
];

export default function ChatPage() {
    const searchParams = useSearchParams();
    const appointmentId = searchParams.get('appointmentId') || '1';
    const patientName = searchParams.get('patient') || 'John Doe';

    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (!newMessage.trim()) return;

        const message = {
            id: messages.length + 1,
            sender: 'doctor',
            senderName: 'Dr. Sarah Smith',
            content: newMessage,
            timestamp: new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }),
            attachments: []
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div style={{ height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link href="/appointments" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
                        <ArrowLeft size={16} /> Back to Appointments
                    </Link>
                </div>
                <div>
                    <h1 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)' }}>Chat with {patientName}</h1>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Appointment ID: #{appointmentId}</p>
                </div>
                <div style={{ width: '150px' }}></div>
            </div>

            {/* Chat Container */}
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>

                {/* Messages Area */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}
                </div>

                {/* Input Area */}
                <div style={{
                    borderTop: '1px solid var(--border)',
                    padding: '20px 24px',
                    background: 'var(--bg-app)'
                }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                        <button
                            style={{
                                padding: '12px',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                background: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            title="Attach file"
                        >
                            <Paperclip size={20} color="var(--text-muted)" />
                        </button>

                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Type your message..."
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                resize: 'none',
                                minHeight: '48px',
                                maxHeight: '120px',
                                fontFamily: 'inherit',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                            rows={1}
                        />

                        <button
                            onClick={handleSend}
                            className="btn btn-primary"
                            style={{
                                padding: '12px 24px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Send size={18} />
                            Send
                        </button>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '8px' }}>
                        Press Enter to send, Shift+Enter for new line
                    </p>
                </div>
            </div>
        </div>
    );
}

function MessageBubble({ message }) {
    const isDoctor = message.sender === 'doctor';

    return (
        <div style={{
            display: 'flex',
            justifyContent: isDoctor ? 'flex-end' : 'flex-start',
            alignItems: 'flex-start'
        }}>
            <div style={{
                maxWidth: '70%',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
            }}>
                <div style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    paddingLeft: isDoctor ? 0 : '12px',
                    paddingRight: isDoctor ? '12px' : 0,
                    textAlign: isDoctor ? 'right' : 'left'
                }}>
                    {message.senderName}
                </div>

                <div style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: isDoctor ? 'var(--primary)' : 'white',
                    color: isDoctor ? 'white' : 'var(--text-main)',
                    border: isDoctor ? 'none' : '1px solid var(--border)',
                    fontSize: '14px',
                    lineHeight: '1.5'
                }}>
                    {message.content}

                    {/* Attachments */}
                    {message.attachments.length > 0 && (
                        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {message.attachments.map((file, idx) => (
                                <AttachmentCard key={idx} file={file} isDoctor={isDoctor} />
                            ))}
                        </div>
                    )}
                </div>

                <div style={{
                    fontSize: '11px',
                    color: 'var(--text-light)',
                    paddingLeft: isDoctor ? 0 : '12px',
                    paddingRight: isDoctor ? '12px' : 0,
                    textAlign: isDoctor ? 'right' : 'left'
                }}>
                    {message.timestamp}
                </div>
            </div>
        </div>
    );
}

function AttachmentCard({ file, isDoctor }) {
    const getIcon = (type) => {
        if (type === 'pdf') return <FileText size={16} />;
        if (type === 'image') return <ImageIcon size={16} />;
        return <Paperclip size={16} />;
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            borderRadius: '8px',
            background: isDoctor ? 'rgba(255,255,255,0.2)' : 'var(--bg-app)',
            border: isDoctor ? 'none' : '1px solid var(--border)',
            cursor: 'pointer'
        }}>
            <div style={{ color: isDoctor ? 'white' : 'var(--primary)' }}>
                {getIcon(file.type)}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '500' }}>{file.name}</div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>{file.size}</div>
            </div>
        </div>
    );
}
