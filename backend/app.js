if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
    process.env.NODE_ENV = 'development'; // Force development mode for local
}

// Core dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const ExpressError = require('./utils/ExpressError');

// const User = require('./models/user');

// Import middleware
const {
    errorHandler,
    notFound,
    requestLogger,
    securityHeaders,
    corsOptions
} = require('./middleware');

// Import configurations
const connectDB = require('./config/database');
const sessionConfig = require('./config/session');

connectDB();
app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
// app.use(session(sessionConfig));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.send('API is running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});