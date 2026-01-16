import { Users, AlertCircle, TrendingUp, Calendar } from 'lucide-react';

export default function Dashboard() {
    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>Dashboard Overview</h1>
                <p style={{ color: 'var(--text-muted)' }}>Welcome back, Dr. Smith. You have 3 pending appointments.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
                <StatCard icon={Users} label="Total Patients" value="1,234" trend="+12%" color="var(--primary)" />
                <StatCard icon={AlertCircle} label="High Risk" value="45" trend="+2" color="var(--danger)" />
                <StatCard icon={TrendingUp} label="Avg. Recovery" value="85%" trend="+5%" color="var(--success)" />
                <StatCard icon={Calendar} label="Appointments" value="12" trend="Today" color="var(--warning)" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Main Chart Area */}
                <div className="card">
                    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Patient Statistics</h2>
                    <div style={{ height: '300px', background: 'var(--bg-app)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        [Analytics Chart Placeholder]
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card">
                    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Recent Activity</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <ActivityItem name="John Doe" action="New risk alert" time="2m ago" type="danger" />
                        <ActivityItem name="Emily Wong" action="Updated journal" time="1h ago" type="info" />
                        <ActivityItem name="Michael Scott" action="Appointment confirmed" time="3h ago" type="success" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, trend, color }) {
    return (
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `color-mix(in srgb, ${color} 15%, transparent)`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon size={24} />
            </div>
            <div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{label}</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>{value}</div>
                <div style={{ fontSize: '12px', color: color }}>{trend}</div>
            </div>
        </div>
    );
}

function ActivityItem({ name, action, time, type }) {
    const colors = {
        danger: 'var(--danger)',
        info: 'var(--primary)',
        success: 'var(--success)'
    };

    return (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors[type], marginTop: '6px' }}></div>
            <div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{name}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{action}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '2px' }}>{time}</div>
            </div>
        </div>
    );
}
