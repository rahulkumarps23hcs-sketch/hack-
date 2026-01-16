"use client";
import React, { useState } from 'react';
import { Bell, Calendar, MessageSquare, DollarSign, Check, X } from 'lucide-react';

// Backend API Comment:
// GET /api/notifications - Fetch all notifications
// POST /api/notifications/:id/mark-read - Mark notification as read
// POST /api/notifications/mark-all-read - Mark all as read

const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        type: 'appointment',
        title: 'New Appointment Booked',
        message: 'Sarah Connor booked a Follow-up consultation for Jan 25, 2024 at 2:00 PM',
        timestamp: '5 minutes ago',
        read: false,
        icon: Calendar,
        color: 'var(--primary)'
    },
    {
        id: 2,
        type: 'message',
        title: 'New Patient Message',
        message: 'John Doe sent you a message regarding his recent anxiety episodes',
        timestamp: '1 hour ago',
        read: false,
        icon: MessageSquare,
        color: 'var(--success)'
    },
    {
        id: 3,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment of $150 received from Emily Chen for Medication Review',
        timestamp: '2 hours ago',
        read: false,
        icon: DollarSign,
        color: 'var(--warning)'
    },
    {
        id: 4,
        type: 'appointment',
        title: 'Appointment Confirmed',
        message: 'Michael Smith confirmed his Initial Consultation for Jan 21, 2024',
        timestamp: '3 hours ago',
        read: true,
        icon: Calendar,
        color: 'var(--primary)'
    },
    {
        id: 5,
        type: 'message',
        title: 'New Patient Message',
        message: 'Lisa Anderson replied to your consultation notes',
        timestamp: '5 hours ago',
        read: true,
        icon: MessageSquare,
        color: 'var(--success)'
    },
    {
        id: 6,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment of $200 received from David Wilson for Therapy Session',
        timestamp: 'Yesterday',
        read: true,
        icon: DollarSign,
        color: 'var(--warning)'
    },
];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const [filter, setFilter] = useState('All');

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'Unread') return !n.read;
        if (filter === 'Read') return n.read;
        return true;
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>Notifications</h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                    </p>
                </div>

                {unreadCount > 0 && (
                    <button
                        onClick={handleMarkAllAsRead}
                        className="btn btn-secondary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Check size={16} />
                        Mark All as Read
                    </button>
                )}
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                {['All', 'Unread', 'Read'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            background: filter === tab ? 'var(--primary)' : 'white',
                            color: filter === tab ? 'white' : 'var(--text-main)',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '14px',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredNotifications.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                        <Bell size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                        <p>No notifications to show</p>
                    </div>
                ) : (
                    filteredNotifications.map(notification => (
                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={handleMarkAsRead}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

function NotificationCard({ notification, onMarkAsRead }) {
    const Icon = notification.icon;

    return (
        <div
            className="card"
            style={{
                padding: '20px',
                background: notification.read ? 'white' : 'var(--bg-app)',
                border: notification.read ? '1px solid var(--border)' : '2px solid var(--primary)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                position: 'relative'
            }}
        >
            {/* Icon */}
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `color-mix(in srgb, ${notification.color} 15%, transparent)`,
                color: notification.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                <Icon size={24} />
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-main)' }}>
                        {notification.title}
                    </h3>
                    {!notification.read && (
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'var(--primary)',
                            marginTop: '6px'
                        }}></div>
                    )}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: '1.5' }}>
                    {notification.message}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                        {notification.timestamp}
                    </span>
                    {!notification.read && (
                        <button
                            onClick={() => onMarkAsRead(notification.id)}
                            style={{
                                padding: '4px 12px',
                                fontSize: '12px',
                                borderRadius: '6px',
                                border: '1px solid var(--border)',
                                background: 'white',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            Mark as read
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
