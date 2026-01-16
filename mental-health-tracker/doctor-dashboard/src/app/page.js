"use client";
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Activity, Heart, Users, ArrowRight, Brain, Clock } from 'lucide-react';

export default function LandingPage() {
    return (
        <div style={{ backgroundColor: 'white' }}>
            {/* Navigation */}
            <nav style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '20px 40px', maxWidth: '1200px', margin: '0 auto',
                borderBottom: '1px solid var(--bg-app)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px' }}></div>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)' }}>MediTrack</span>
                </div>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <Link href="/login" style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '15px' }}>Provider Login</Link>
                    <Link href="/login" className="btn btn-primary">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header style={{
                textAlign: 'center', padding: '100px 20px',
                maxWidth: '900px', margin: '0 auto',
                background: 'radial-gradient(circle at center, var(--bg-app) 0%, transparent 70%)'
            }}>
                <div style={{
                    display: 'inline-block', padding: '8px 16px', borderRadius: '50px',
                    background: 'var(--bg-app)', color: 'var(--primary)',
                    fontSize: '14px', fontWeight: '600', marginBottom: '24px'
                }}>
                    Simpler. Smarter. Healthcare.
                </div>
                <h1 style={{
                    fontSize: '56px', fontWeight: '800', lineHeight: '1.2',
                    marginBottom: '24px', color: 'var(--text-main)', letterSpacing: '-0.02em'
                }}>
                    Unified Physical & <span style={{ color: 'var(--primary)' }}>Mental Healthcare</span>
                </h1>
                <p style={{
                    fontSize: '20px', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px',
                    lineHeight: '1.6'
                }}>
                    A comprehensive platform bridging the gap between clinical data and patient well-being.
                    Real-time insights for doctors, seamless recovery for patients.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <Link href="/login" className="btn btn-primary" style={{ height: '52px', padding: '0 32px', fontSize: '16px' }}>
                        Start Now <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </Link>
                    <button className="btn btn-secondary" style={{ height: '52px', padding: '0 32px', fontSize: '16px', background: 'white', border: '1px solid var(--border)' }}>
                        View Demo
                    </button>
                </div>
            </header>

            {/* The Problem */}
            <section style={{ padding: '80px 20px', background: 'var(--bg-app)' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '24px' }}>The Healthcare Disconnect</h2>
                            <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '32px' }}>
                                Traditional systems isolate physical treatments from mental well-being.
                                Doctors lack visibility into a patient's daily state between visits, leading to reactive rather than proactive care.
                            </p>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: '500' }}>
                                    <div style={{ background: '#FFE4E4', padding: '8px', borderRadius: '50%', color: 'var(--danger)' }}><Clock size={16} /></div>
                                    Delayed intervention for mental health crises
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: '500' }}>
                                    <div style={{ background: '#FFE4E4', padding: '8px', borderRadius: '50%', color: 'var(--danger)' }}><Users size={16} /></div>
                                    Fragmented patient data sources
                                </li>
                            </ul>
                        </div>
                        <div style={{
                            background: 'white', padding: '40px', borderRadius: '24px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid var(--border)'
                        }}>
                            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                <Brain size={64} color="var(--primary)" style={{ opacity: 0.2 }} />
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>
                                70% of medical conditions have untreated mental health comorbidities.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section style={{ padding: '100px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>Complete Health Visibility</h2>
                    <p style={{ fontSize: '18px', color: 'var(--text-muted)' }}>Tools designed for the modern healthcare ecosystem.</p>
                </div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                    <FeatureCard
                        icon={Activity}
                        title="Vitals & Trends"
                        desc="Track heart rate, blood pressure, and sleep patterns visually over time."
                    />
                    <FeatureCard
                        icon={Brain}
                        title="Mental Health AI"
                        desc="Sentiment analysis on patient journals to detect early signs of anxiety or depression."
                    />
                    <FeatureCard
                        icon={ShieldCheck}
                        title="Secure Data"
                        desc="Enterprise-grade security ensuring patient confidentiality and HIPAA compliance."
                    />
                </div>
            </section>

            {/* Benefits Split */}
            <section style={{ padding: '100px 20px', background: 'var(--primary)', color: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
                    <div>
                        <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px' }}>For Doctors</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '4px' }}><ArrowRight size={16} /></div>
                                Prioritize high-risk patients automatically
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '4px' }}><ArrowRight size={16} /></div>
                                Data-driven treatment adjustments
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '4px' }}><ArrowRight size={16} /></div>
                                Reduced administrative overhead
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px' }}>For Patients</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '4px' }}><Heart size={16} /></div>
                                Seamless communication with providers
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '4px' }}><Heart size={16} /></div>
                                Intuitive daily health tracking
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '4px' }}><Heart size={16} /></div>
                                Proactive care, not reactive
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '120px 20px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '24px', color: 'var(--text-main)' }}>
                    Ready to transform care?
                </h2>
                <p style={{ fontSize: '20px', color: 'var(--text-muted)', marginBottom: '40px' }}>
                    Join thousands of specialized practitioners on MediTrack.
                </p>
                <Link href="/login" className="btn btn-primary" style={{ padding: '16px 48px', fontSize: '18px', borderRadius: '12px' }}>
                    Access Provider Portal
                </Link>
            </section>

            {/* Simple Footer */}
            <footer style={{ borderTop: '1px solid var(--border)', padding: '60px 40px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center', color: 'var(--text-light)' }}>
                <p>© 2024 MediTrack Platform. All rights reserved.</p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '24px', justifyContent: 'center' }}>
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Contact Support</span>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc }) {
    return (
        <div style={{
            padding: '40px', borderRadius: '16px', background: 'var(--bg-app)',
            textAlign: 'left', transition: 'all 0.3s'
        }}>
            <div style={{
                width: '56px', height: '56px', background: 'white', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
                <Icon size={28} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{desc}</p>
        </div>
    )
}
