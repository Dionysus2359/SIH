const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatLogSchema = new Schema({
    query: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('ChatLog', ChatLogSchema);