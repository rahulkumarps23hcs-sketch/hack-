"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Backend API Comment:
// This component expects data in the format: { date: 'YYYY-MM-DD', value: number, ... }
// API Endpoint: GET /api/patients/:id/trends?type={type}&range={range}

export default function TrendChart({ data, color, dataKey, title }) {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" vertical={false} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-light)', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-light)', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
                    />
                    {/* Highlight abnormal values line (Example: Threshold > 8) */}
                    <ReferenceLine y={8} stroke="var(--danger)" strokeDasharray="3 3" label={{ value: 'High Risk', fill: 'var(--danger)', fontSize: 10, position: 'right' }} />

                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
