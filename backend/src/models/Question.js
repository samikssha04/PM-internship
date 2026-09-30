const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    skill: { type: String, required: true, lowercase: true },
    question: { type: String, required: true },
    options: { type: [String], required: true, validate: v => v.length === 4 },
    correctAnswer: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
