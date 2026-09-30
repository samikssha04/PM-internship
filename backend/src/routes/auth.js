const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const router = express.Router();

// Helper: generate token
const generateToken = (id, role) =>
    jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/student/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, college, skills, resumeText } = req.body;

        if (!name || !email || !password || !college) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        const existing = await Student.findOne({ email: email.toLowerCase() });
        if (existing) return res.status(400).json({ message: 'Email already registered' });

        const hashed = await bcrypt.hash(password, 10);

        const normalizedSkills = (skills || []).map(s =>
            typeof s === 'string' ? s.toLowerCase().trim() : ''
        ).filter(Boolean);

        const student = await Student.create({
            name,
            email: email.toLowerCase(),
            password: hashed,
            college,
            skills: normalizedSkills,
            resumeText: resumeText || ''
        });

        res.status(201).json({
            token: generateToken(student._id, 'student'),
            user: {
                id: student._id,
                name: student.name,
                email: student.email,
                college: student.college,
                skills: student.skills,
                testScore: student.testScore,
                recommended: student.recommended
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /api/student/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });

        const student = await Student.findOne({ email: email.toLowerCase() });
        if (!student) return res.status(400).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, student.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({
            token: generateToken(student._id, 'student'),
            user: {
                id: student._id,
                name: student.name,
                email: student.email,
                college: student.college,
                skills: student.skills,
                resumeText: student.resumeText,
                testScore: student.testScore,
                recommended: student.recommended
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /api/student/profile/:id
router.get('/profile/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select('-password');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
