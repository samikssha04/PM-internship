const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    college: { type: String, required: true },
    skills: { type: [String], default: [] },
    resumeText: { type: String, default: '' },
    testScore: { type: Number, default: 0 },
    recommended: { type: Boolean, default: false },
    appliedCompanies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }]
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
