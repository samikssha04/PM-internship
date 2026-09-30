const express = require('express');
const Question = require('../models/Question');
const Student = require('../models/Student');
const router = express.Router();

// GET /api/test/questions/:studentId
// Fetches 5 random MCQs based on student's skills
router.get('/questions/:studentId', async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const skills = student.skills.map(s => s.toLowerCase().trim());

        // Try to get questions for student's skills, fallback to all questions
        let questions = await Question.find({ skill: { $in: skills } });
        if (questions.length < 5) {
            const allQ = await Question.find();
            questions = allQ;
        }

        // Shuffle and pick 5
        const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, 5);

        // Strip correct answer before sending to client
        const sanitized = shuffled.map(q => ({
            id: q._id,
            skill: q.skill,
            question: q.question,
            options: q.options
        }));

        res.json(sanitized);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /api/test/submit
// Body: { studentId, answers: [{ questionId, selectedAnswer }] }
router.post('/submit', async (req, res) => {
    try {
        const { studentId, answers } = req.body;
        if (!studentId || !answers || answers.length === 0) {
            return res.status(400).json({ message: 'Invalid submission data' });
        }

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        let correct = 0;
        for (const ans of answers) {
            const q = await Question.findById(ans.questionId);
            if (q && q.correctAnswer === ans.selectedAnswer) {
                correct++;
            }
        }

        const score = Math.round((correct / answers.length) * 100);
        const recommended = score >= 60;

        student.testScore = score;
        student.recommended = recommended;
        await student.save();

        res.json({
            score,
            correct,
            total: answers.length,
            recommended,
            message: recommended
                ? '🎉 Congratulations! You are Recommended!'
                : '😔 Score below 60%. Keep practicing and try again!'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
