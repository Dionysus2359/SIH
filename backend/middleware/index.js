const { validateRequest } = require('../schemas');

// /**
//  * Centralized Error Handler Middleware
//  * Handles all errors in the application with consistent response format
//  */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    const { statusCode = 500 } = err;
    const message = err.message || "Oh no, Something went wrong!";
    
    res.status(statusCode).json({
        success: false,
        message: message,
        error: {
            statusCode,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }
    });
};

// /**
//  * Authentication Middleware - Session-based
//  * Checks if user is authenticated using session
//  */
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
    });
};

// /**
//  * Authentication Middleware - Passport-based
//  * Checks if user is authenticated using Passport.js
//  */
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({
            success: false,
            message: "Authentication required. Please log in.",
            data: {}
        });
    }
};

// /**
//  * Admin Authorization Middleware
//  * Checks if authenticated user has admin role
//  */
const isAdmin = (req, res, next) => {
    // req.user is automatically provided by Passport if the user is logged in.
    // No need to fetch the user from the database again.
    if (req.user && req.user.role === 'faculty') {
        return next();
    }
    return res.status(403).json({
        success: false,
        message: "Access denied. Faculty privileges required.",
    });
};

/**
 * Generic Request Validator Middleware
 * Validates request body using Joi schema
 */
const validateRequestMiddleware = (schema) => {
    return (req, res, next) => {
        try {
            const validation = validateRequest(schema, req.body);
            if (!validation.isValid) {
                return res.status(400).json({
                    success: false,
                    message: validation.error,
                });
            }
            req.validatedData = validation.value;
            next();
        } catch (error) {
            console.error('Validation middleware error:', error);
            next(error);
        }
    };
};

/**
 * Async Error Handler Wrapper
 * Wraps async route handlers to catch errors and pass them to error handler
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

/**
 * Request Logger Middleware
 * Logs incoming requests for debugging
 */
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
};

// Import CORS configuration from config file
const corsOptions = require('../config/cors');

/**
 * Rate Limiting Middleware (Basic Implementation)
 * Prevents abuse by limiting requests per IP
 */
const rateLimiter = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
    const requests = new Map();
    
    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        
        if (!requests.has(ip)) {
            requests.set(ip, { count: 1, resetTime: now + windowMs });
            return next();
        }
        
        const userRequests = requests.get(ip);
        
        if (now > userRequests.resetTime) {
            requests.set(ip, { count: 1, resetTime: now + windowMs });
            return next();
        }
        
        if (userRequests.count >= maxRequests) {
            return res.status(429).json({
                success: false,
                message: "Too many requests. Please try again later.",
                data: {}
            });
        }
        
        userRequests.count++;
        next();
    };
};

/**
 * Security Headers Middleware
 * Adds security headers to responses
 */
const securityHeaders = (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
};

/**
 * Not Found Handler Middleware
 * Handles 404 errors for undefined routes
 */
const notFound = (req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

module.exports = {
    // Error handling
    errorHandler,
    notFound,
    
    // Authentication & Authorization
    isLoggedIn,
    isAuthenticated,
    isAdmin,
    
    // Validation
    validateRequestMiddleware,
    
    // Utility
    asyncHandler,
    requestLogger,
    corsOptions,
    rateLimiter,
    securityHeaders
};
