"use client";
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

export default function ConditionalLayout({ children }) {
    const pathname = usePathname();
    const publicPaths = ['/', '/login'];
    const isPublicPath = publicPaths.includes(pathname);

    if (isPublicPath) {
        // No sidebar/header for public pages
        return <>{children}</>;
    }

    // Show sidebar and header for protected routes
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header />
                <main style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
