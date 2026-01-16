"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, MicOff, Video, VideoOff, PhoneOff, User } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VideoCallPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const appointmentId = searchParams.get('appointmentId') || '1';
    const patientName = searchParams.get('patient') || 'John Doe';
    const patientAge = searchParams.get('age') || '45';
    const appointmentType = searchParams.get('type') || 'Therapy Session';

    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [callDuration, setCallDuration] = useState(0);

    // Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setCallDuration(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleEndCall = () => {
        if (confirm('Are you sure you want to end this call?')) {
            router.push('/appointments');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#1a1a1a',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Top Bar */}
            <div style={{
                padding: '20px 32px',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'white'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <Link href="/appointments" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>{patientName}, {patientAge} yrs</h1>
                        <p style={{ fontSize: '13px', opacity: 0.7 }}>{appointmentType} • Appointment #{appointmentId}</p>
                    </div>
                </div>

                <div style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    fontFamily: 'monospace',
                    background: 'rgba(255,255,255,0.1)',
                    padding: '8px 20px',
                    borderRadius: '8px'
                }}>
                    {formatDuration(callDuration)}
                </div>
            </div>

            {/* Video Grid */}
            <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                padding: '32px',
                maxWidth: '1400px',
                margin: '0 auto',
                width: '100%'
            }}>
                {/* Patient Video */}
                <VideoPlaceholder
                    label={patientName}
                    role="Patient"
                    isActive={true}
                />

                {/* Doctor Video */}
                <VideoPlaceholder
                    label="Dr. Sarah Smith"
                    role="You (Doctor)"
                    isActive={isCameraOn}
                    isSelf={true}
                />
            </div>

            {/* Bottom Controls */}
            <div style={{
                padding: '32px',
                background: 'rgba(0,0,0,0.7)',
                display: 'flex',
                justifyContent: 'center',
                gap: '16px'
            }}>
                <ControlButton
                    icon={isMuted ? MicOff : Mic}
                    label={isMuted ? 'Unmute' : 'Mute'}
                    active={!isMuted}
                    onClick={() => setIsMuted(!isMuted)}
                />

                <ControlButton
                    icon={isCameraOn ? Video : VideoOff}
                    label={isCameraOn ? 'Camera On' : 'Camera Off'}
                    active={isCameraOn}
                    onClick={() => setIsCameraOn(!isCameraOn)}
                />

                <ControlButton
                    icon={PhoneOff}
                    label="End Call"
                    danger
                    onClick={handleEndCall}
                />
            </div>
        </div>
    );
}

function VideoPlaceholder({ label, role, isActive, isSelf }) {
    return (
        <div style={{
            background: isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#2a2a2a',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            minHeight: '400px',
            border: '2px solid rgba(255,255,255,0.1)',
            overflow: 'hidden'
        }}>
            {/* Video Placeholder Icon */}
            <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
            }}>
                <User size={60} color="white" />
            </div>

            {/* Name Label */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'rgba(0,0,0,0.6)',
                padding: '12px 20px',
                borderRadius: '8px',
                color: 'white'
            }}>
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '2px' }}>{label}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{role}</div>
            </div>

            {/* Camera Off Indicator */}
            {!isActive && (
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(255,0,0,0.8)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <VideoOff size={14} />
                    Camera Off
                </div>
            )}

            {/* Self Indicator */}
            {isSelf && (
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'rgba(107, 155, 209, 0.9)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'white'
                }}>
                    YOUR VIDEO
                </div>
            )}
        </div>
    );
}

function ControlButton({ icon: Icon, label, active, danger, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: danger ? '#FF4444' : (active ? 'white' : '#555'),
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                transition: 'all 0.2s',
                color: danger ? 'white' : (active ? '#1a1a1a' : 'white')
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            <Icon size={24} />
            <span style={{ fontSize: '10px', fontWeight: '600' }}>{label}</span>
        </button>
    );
}
