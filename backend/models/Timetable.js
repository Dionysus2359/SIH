// backend/models/Timetable.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimetableSchema = new Schema({
    day: { type: String, required: true },
    time: { type: String, required: true },
    subject: { type: String, required: true },
    room: { type: String },
    program: { type: String },
    // Link each entry to a specific user
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Timetable', TimetableSchema);