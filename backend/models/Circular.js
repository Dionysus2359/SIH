// backend/models/Circular.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CircularSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Circular', CircularSchema);    