const express = require('express');
const Student = require('../models/Student');
const Company = require('../models/Company');
const router = express.Router();

// Skill matching algorithm
function calcMatchScore(studentSkills, requiredSkills) {
    if (!requiredSkills || requiredSkills.length === 0) return 0;
    const sNorm = studentSkills.map(s => s.toLowerCase().trim());
    const rNorm = requiredSkills.map(s => s.toLowerCase().trim());
    const common = sNorm.filter(s => rNorm.includes(s));
    return Math.round((common.length / rNorm.length) * 100);
}

// GET /api/match/companies/:studentId
// Returns top 5 companies sorted by match % for a given student
router.get('/companies/:studentId', async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const companies = await Company.find().select('-password');
        const results = companies.map(c => ({
            id: c._id,
            companyName: c.companyName,
            internshipRole: c.internshipRole,
            requiredSkills: c.requiredSkills,
            matchScore: calcMatchScore(student.skills, c.requiredSkills)
        }));

        results.sort((a, b) => b.matchScore - a.matchScore);
        res.json(results.slice(0, 5));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /api/match/students/:companyId
// Returns top 5 students sorted by match % for a given company
router.get('/students/:companyId', async (req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);
        if (!company) return res.status(404).json({ message: 'Company not found' });

        const students = await Student.find().select('-password');
        const results = students.map(s => ({
            id: s._id,
            name: s.name,
            email: s.email,
            college: s.college,
            skills: s.skills,
            testScore: s.testScore,
            recommended: s.recommended,
            matchScore: calcMatchScore(s.skills, company.requiredSkills)
        }));

        results.sort((a, b) => b.matchScore - a.matchScore);
        res.json(results.slice(0, 5));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
