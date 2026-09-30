const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    internshipRole: { type: String, required: true },
    requiredSkills: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
