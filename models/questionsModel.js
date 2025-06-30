const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { 
        type: Map, 
        of: String, 
        required: true 
    },
    options: {
        type: [{
            id: { type: Number, required: true },
            text: { type: Map, of: String, required: true },
            isCorrect: { type: Boolean, required: true }
        }],
        required: true,
        validate: {
            validator: (options) => options.length === 4,
            message: 'Exactly 4 options are required'
        }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Add index for text search
questionSchema.index({ 'text.en': 'text' });

module.exports = mongoose.model('Question', questionSchema);