// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authCheckInProgress, setAuthCheckInProgress] = useState(false);
    const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

    const visibilityCheckTimeoutRef = useRef(null);
    const isRefreshingProfile = useRef(false);

    const refreshProfile = useCallback(async (source = 'unknown') => {
        if (isRefreshingProfile.current) return;
        isRefreshingProfile.current = true;
        try {
            const response = await authAPI.getProfile();
            if (response.data.success) {
                const userData = response.data.data;
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('user_timestamp', Date.now().toString());
            } else {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('user');
                localStorage.removeItem('user_timestamp');
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('user');
                localStorage.removeItem('user_timestamp');
            } else {
                console.error(`Profile refresh error (source: ${source}):`, error);
            }
        } finally {
            isRefreshingProfile.current = false;
        }
    }, []);

    useEffect(() => {
        const checkAuthStatus = async () => {
            if (authCheckCompleted || authCheckInProgress) return;
            setAuthCheckInProgress(true);
            try {
                const response = await authAPI.getProfile();
                if (response.data.success) {
                    const userData = response.data.data;
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.log('No valid authentication found');
            } finally {
                setLoading(false);
                setAuthCheckInProgress(false);
                setAuthCheckCompleted(true);
            }
        };
        checkAuthStatus();
    }, [authCheckCompleted, authCheckInProgress]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && isAuthenticated) {
                if (visibilityCheckTimeoutRef.current) {
                    clearTimeout(visibilityCheckTimeoutRef.current);
                }
                visibilityCheckTimeoutRef.current = setTimeout(() => {
                    refreshProfile('visibility-change');
                }, 1000);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (visibilityCheckTimeoutRef.current) {
                clearTimeout(visibilityCheckTimeoutRef.current);
            }
        };
    }, [isAuthenticated, refreshProfile]);

    const register = async (userData) => {
        setLoading(true);
        try {
            const { confirmPassword, agreeToTerms, ...apiData } = userData;
            const response = await authAPI.register(apiData);
            if (response.data.success) {
                const newUserData = response.data.data;
                setUser(newUserData);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(newUserData));
                localStorage.setItem('user_timestamp', Date.now().toString());
                setAuthCheckCompleted(true);
                return { success: true, user: newUserData };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed. Please try again.'
            };
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        try {
            const response = await authAPI.login(credentials);
            if (response.data.success) {
                const userData = response.data.data;
                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('user_timestamp', Date.now().toString());
                setAuthCheckCompleted(true);
                return { success: true, user: userData };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed. Please try again.'
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('user');
            localStorage.removeItem('user_timestamp');
            setAuthCheckCompleted(true);
            setLoading(false);
        }
    };

    const isAdmin = () => user?.role === 'faculty';
    const isTourist = () => user?.role === 'student';

    const value = {
        user,
        loading,
        isAuthenticated,
        authCheckCompleted,
        register,
        login,
        logout,
        isAdmin,
        isTourist
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};