// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Route paths
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    ADMIN: '/admin',
    ADMIN_LOGIN: '/adminlogin'
};

// User roles
export const USER_ROLES = {
    STUDENT: 'student',
    FACULTY: 'faculty'
};

// Form validation patterns
export const VALIDATION_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 6
};

// Local storage keys
export const STORAGE_KEYS = {
    USER: 'user',
    THEME: 'theme'
};

// Default values
export const DEFAULTS = {
    SESSION_TIMEOUT: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// Error messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    SERVER_ERROR: 'Server error. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.'
};
