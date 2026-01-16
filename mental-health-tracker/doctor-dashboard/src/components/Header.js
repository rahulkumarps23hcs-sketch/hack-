"use client";
import React, { useState } from 'react';
import { Bell, Search, Calendar, MessageSquare, DollarSign } from 'lucide-react';
import Link from 'next/link';

const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        type: 'appointment',
        title: 'New Appointment Booked',
        message: 'Sarah Connor booked a Follow-up consultation',
        timestamp: '5 min ago',
        read: false,
        icon: Calendar,
        color: 'var(--primary)'
    },
    {
        id: 2,
        type: 'message',
        title: 'New Patient Message',
        message: 'John Doe sent you a message',
        timestamp: '1 hour ago',
        read: false,
        icon: MessageSquare,
        color: 'var(--success)'
    },
    {
        id: 3,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment of $150 from Emily Chen',
        timestamp: '2 hours ago',
        read: false,
        icon: DollarSign,
        color: 'var(--warning)'
    },
];

export default function Header() {
    const [showNotifications, setShowNotifications] = useState(false);
    const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

    return (
        <header style={{
            height: '80px',
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <div style={{ position: 'relative', width: '300px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                    type="text"
                    placeholder="Search patients..."
                    style={{
                        width: '100%',
                        padding: '10px 10px 10px 40px',
                        borderRadius: '50px',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-app)',
                        outline: 'none',
                        fontSize: '14px'
                    }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Notification Bell */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}
                    >
                        <Bell size={20} color="var(--text-muted)" />
                        {unreadCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-4px',
                                right: '-4px',
                                minWidth: '18px',
                                height: '18px',
                                background: 'var(--danger)',
                                borderRadius: '50%',
                                color: 'white',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0 4px'
                            }}>
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <>
                            {/* Backdrop */}
                            <div
                                onClick={() => setShowNotifications(false)}
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    zIndex: 999
                                }}
                            />

                            {/* Dropdown Panel */}
                            <div style={{
                                position: 'absolute',
                                top: '40px',
                                right: 0,
                                width: '380px',
                                maxHeight: '500px',
                                background: 'white',
                                borderRadius: '12px',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                border: '1px solid var(--border)',
                                zIndex: 1000,
                                overflow: 'hidden'
                            }}>
                                {/* Header */}
                                <div style={{
                                    padding: '16px 20px',
                                    borderBottom: '1px solid var(--border)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Notifications</h3>
                                    <Link
                                        href="/notifications"
                                        onClick={() => setShowNotifications(false)}
                                        style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '500' }}
                                    >
                                        View All
                                    </Link>
                                </div>

                                {/* Notification List */}
                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    {MOCK_NOTIFICATIONS.slice(0, 3).map(notification => (
                                        <NotificationItem key={notification.id} notification={notification} />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>Dr. Sarah Smith</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cardiology</div>
                    </div>
                    <div style={{ width: '40px', height: '40px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>
                        SS
                    </div>
                </div>
            </div>
        </header>
    );
}

function NotificationItem({ notification }) {
    const Icon = notification.icon;

    return (
        <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            background: notification.read ? 'white' : 'var(--bg-app)',
            cursor: 'pointer',
            transition: 'background 0.2s'
        }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: `color-mix(in srgb, ${notification.color} 15%, transparent)`,
                    color: notification.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                    <Icon size={18} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                        {notification.title}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                        {notification.message}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                        {notification.timestamp}
                    </div>
                </div>
                {!notification.read && (
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        marginTop: '6px',
                        flexShrink: 0
                    }}></div>
                )}
            </div>
        </div>
    );
}
