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
const ExpressError = require('./utils/ExpressError');

const User = require('./models/user');

// Import middleware
const {
    errorHandler,
    notFound,
    requestLogger,
    securityHeaders,
    corsOptions
} = require('./middleware');

const userRoutes = require('./routes/users');

// Import configurations
const connectDB = require('./config/database');
const sessionConfig = require('./config/session');

connectDB();

// Security middleware
app.use(securityHeaders);

// CORS configuration
app.use(cors(corsOptions));

// Request logging
app.use(requestLogger);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration

const MongoStore = require('connect-mongo');

const mongoUri = process.env.MONGODB_URI ||
    `mongodb+srv://Dionysus2359:${process.env.MONGODB_ATLAS_PASS}@cluster0.oi6s3l6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const secret = process.env.SESSION_SECRET || 'your-super-secure-session-secret-change-this-in-production';

const store = MongoStore.create({
    mongoUrl: mongoUri,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: secret
    }
})
store.on("error", (e) => {
    console.log("Session store Error!", e);
});

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/users', userRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});