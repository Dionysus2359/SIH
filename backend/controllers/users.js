const User = require('../models/user');
const mongoose = require('mongoose');
const { userRegistrationSchema, userLoginSchema, userProfileUpdateSchema, validateRequest } = require('../schemas');

// Register a new user
const registerUser = async (req, res, next) => {
    try {
        // Validate input using Joi schema
        console.log("Incoming body:", req.body);
        const validation = validateRequest(userRegistrationSchema, req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.error,
                data: {}
            });
        }

        const { firstName, lastName, email, password } = validation.value;

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists",
                data: {}
            });
        }

        // Create new user with passport-local-mongoose
        const newUser = new User({
            username: email, // <--- FIX: Use email as the username
            firstName,
            lastName,
            email,
        });

        // Register user with passport-local-mongoose (handles password hashing automatically)
        await User.register(newUser, password);

        // Return user data (excluding sensitive information)
        const userData = {
            id: newUser._id,
            name: newUser.firstName + ' ' + newUser.lastName,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt
        };

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userData
        });

    } catch (error) {
        console.error('Registration error:', error);

        // Handle specific passport-local-mongoose errors
        if (error.name === 'UserExistsError') {
            return res.status(409).json({
                success: false,
                message: "User already exists",
                data: {}
            });
        }

        // Forward error to centralized error handler
        next(error);
    }
};

// Login user
const loginUser = async (req, res, next) => {
    try {
        // Validate input using Joi schema
        const validation = validateRequest(userLoginSchema, req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.error,
                data: {}
            });
        }

        const { email, password } = validation.value;

        // Find user by email
        let user = null;
        if (email) {
            user = await User.findOne({ email });
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
                data: {}
            });
        }

        // Verify password using passport-local-mongoose authenticate method
        const authenticateResult = await new Promise((resolve, reject) => {
            user.authenticate(password, (err, user, error) => {
                if (err) reject(err);
                else if (error) resolve({ user: null, error });
                else resolve({ user, error: null });
            });
        });

        if (authenticateResult.error || !authenticateResult.user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
                data: {}
            });
        }

        // Create session
        req.session.userId = user._id;
        // req.session.userUsername = user.username;
        req.session.userEmail = user.email;
        req.session.role = user.role; // Store role in session

        // Save session explicitly to ensure it's persisted
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({
                    success: false,
                    message: "Error saving session",
                    data: {}
                });
            }

            console.log('Session created successfully for user:', user.email);

            // Return user data (excluding sensitive information)
            const userData = {
                id: user._id,
                name: user.firstName + ' ' + user.lastName,
                // username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            };

            res.status(200).json({
                success: true,
                message: "Login successful",
                data: userData
            });
        });

    } catch (error) {
        console.error('Login error:', error);
        next(error);
    }
};

// Logout user
const logoutUser = async (req, res, next) => {
    try {
        // Destroy session
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destruction error:', err);
                return res.status(500).json({
                    success: false,
                    message: "Error during logout",
                    data: {}
                });
            }

            // Clear session cookie
            res.clearCookie('sih_lang_agnosti_chatbot.sid'); // Custom session cookie name

            res.status(200).json({
                success: true,
                message: "Logout successful",
                data: {}
            });
        });

    } catch (error) {
        console.error('Logout error:', error);
        next(error);
    }
};

// Get user profile
const getUserProfile = async (req, res, next) => {
    try {
        // Check if user is logged in
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
                data: {}
            });
        }

        // Find user by session ID
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: {}
            });
        }

        // Return user profile data
        const userData = {
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            // username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        };

        res.status(200).json({
            success: true,
            message: "User profile retrieved successfully",
            data: userData
        });

    } catch (error) {
        console.error('Get profile error:', error);
        next(error);
    }
};

// Update user profile
const updateUserProfile = async (req, res, next) => {
    try {
        // Check if user is logged in
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
                data: {}
            });
        }

        // Validate input using Joi schema
        const validation = validateRequest(userProfileUpdateSchema, req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.error,
                data: {}
            });
        }

        const { firstName, lastName } = validation.value;
        const updateData = {};

        // Only update fields that are provided
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            req.session.userId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: {}
            });
        }

        // Return updated user data
        const userData = {
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            // username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        };

        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data: userData
        });

    } catch (error) {
        console.error('Update profile error:', error);
        next(error);
    }
};

// Get all users (faculty only)
const getAllUsers = async (req, res, next) => {
    try {
        // Check if user is logged in and is faculty
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
                data: {}
            });
        }

        // Find the current user and check if they're faculty
        const currentUser = await User.findById(req.session.userId);
        if (!currentUser || currentUser.role !== 'faculty') {
            return res.status(403).json({
                success: false,
                message: "Access denied. faculty privileges required.",
                data: {}
            });
        }

        // Get all users (exclude faculty users from the results for student view)
        const users = await User.find({ role: 'student' }).select('-salt -hash');

        // Return user data (excluding sensitive information)
        const usersData = users.map(user => ({
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            // username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        }));

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: {
                users: usersData,
                total: usersData.length
            }
        });

    } catch (error) {
        console.error('Get all users error:', error);
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
};