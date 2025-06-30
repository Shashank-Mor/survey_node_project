const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: Map, of: String, required: true },
    options: [{
        id: { type: Number, required: true },
        text: { type: Map, of: String, required: true },
        isCorrect: { type: Boolean, required: true }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);