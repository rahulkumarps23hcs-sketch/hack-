"use client";
import React from 'react';
import { LayoutDashboard, Users, Calendar, Activity, Settings, LogOut, MessageSquare, DollarSign, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: Users, label: 'Patients', path: '/patients' },
        { icon: Calendar, label: 'Appointments', path: '/appointments' },
        { icon: MessageSquare, label: 'Chat', path: '/chat' },
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: DollarSign, label: 'Payments', path: '/payments' },
        { icon: Activity, label: 'Analytics', path: '/analytics' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside style={{
            width: '280px',
            backgroundColor: 'white',
            borderRight: '1px solid var(--border)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 0,
            height: '100vh'
        }}>
            <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px' }}></div>
                <h1 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)' }}>MediTrack</h1>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                background: isActive ? 'var(--primary-light)' : 'transparent',
                                fontWeight: isActive ? 600 : 500,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <button
                    onClick={logout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--danger)',
                        cursor: 'pointer',
                        fontWeight: 500
                    }}
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
