/**
 * Session Configuration
 * Centralized session management with security best practices
 */
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

const sessionConfig = {
    store,
    resave: false,
    secret: secret,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true, // Prevents XSS attacks
        // sameSite: 'lax' // CSRF protection
    },
    name: 'sih_lang_agnosti_chatbot.sid' // Change default session name for security
};

module.exports = sessionConfig;
