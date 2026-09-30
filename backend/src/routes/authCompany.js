const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');
const router = express.Router();

const generateToken = (id, role) =>
    jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/company/register
router.post('/register', async (req, res) => {
    try {
        const { companyName, email, password, internshipRole, requiredSkills } = req.body;
        if (!companyName || !email || !password || !internshipRole) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        const existing = await Company.findOne({ email: email.toLowerCase() });
        if (existing) return res.status(400).json({ message: 'Email already registered' });

        const hashed = await bcrypt.hash(password, 10);
        const normalizedSkills = (requiredSkills || []).map(s =>
            typeof s === 'string' ? s.toLowerCase().trim() : ''
        ).filter(Boolean);

        const company = await Company.create({
            companyName,
            email: email.toLowerCase(),
            password: hashed,
            internshipRole,
            requiredSkills: normalizedSkills
        });

        res.status(201).json({
            token: generateToken(company._id, 'company'),
            user: {
                id: company._id,
                companyName: company.companyName,
                email: company.email,
                internshipRole: company.internshipRole,
                requiredSkills: company.requiredSkills
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /api/company/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });

        const company = await Company.findOne({ email: email.toLowerCase() });
        if (!company) return res.status(400).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, company.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({
            token: generateToken(company._id, 'company'),
            user: {
                id: company._id,
                companyName: company.companyName,
                email: company.email,
                internshipRole: company.internshipRole,
                requiredSkills: company.requiredSkills
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /api/company/profile/:id
router.get('/profile/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).select('-password');
        if (!company) return res.status(404).json({ message: 'Company not found' });
        res.json(company);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
