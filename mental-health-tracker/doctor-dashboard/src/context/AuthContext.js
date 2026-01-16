"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check if user is logged in (from localStorage)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        // Redirect logic
        const publicPaths = ['/', '/login'];
        const isPublicPath = publicPaths.includes(pathname);

        if (!loading) {
            if (!user && !isPublicPath) {
                // Not logged in and trying to access protected route
                router.push('/login');
            } else if (user && pathname === '/login') {
                // Already logged in but on login page
                router.push('/dashboard');
            }
        }
    }, [user, loading, pathname, router]);

    const login = (email, password) => {
        // Mock login - in real app, call API
        const mockUser = {
            id: '1',
            name: 'Dr. Sarah Smith',
            email: email,
            role: 'doctor',
            specialization: 'Cardiology'
        };

        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        router.push('/dashboard');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
