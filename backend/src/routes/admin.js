const express = require('express');
const Question = require('../models/Question');
const Student = require('../models/Student');
const Company = require('../models/Company');
const router = express.Router();

// POST /api/admin/question — Add a question to the bank
router.post('/question', async (req, res) => {
    try {
        const { skill, question, options, correctAnswer } = req.body;
        if (!skill || !question || !options || options.length !== 4 || !correctAnswer) {
            return res.status(400).json({ message: 'All fields required. Options must have exactly 4 choices.' });
        }
        if (!options.includes(correctAnswer)) {
            return res.status(400).json({ message: 'correctAnswer must be one of the options' });
        }
        const q = await Question.create({ skill: skill.toLowerCase().trim(), question, options, correctAnswer });
        res.status(201).json({ message: 'Question added!', question: q });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /api/admin/students — List all students (no passwords)
router.get('/students', async (req, res) => {
    try {
        const students = await Student.find().select('-password').sort({ createdAt: -1 });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /api/admin/companies — List all companies (no passwords)
router.get('/companies', async (req, res) => {
    try {
        const companies = await Company.find().select('-password').sort({ createdAt: -1 });
        res.json(companies);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /api/admin/questions — List all questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find().sort({ skill: 1, createdAt: -1 });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// DELETE /api/admin/question/:id
router.delete('/question/:id', async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
