"use client";
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import ConditionalLayout from '../components/ConditionalLayout';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <ConditionalLayout>
                        {children}
                    </ConditionalLayout>
                </AuthProvider>
            </body>
        </html>
    );
}
