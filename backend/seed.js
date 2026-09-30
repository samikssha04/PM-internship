const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const Student = require('./src/models/Student');
const Company = require('./src/models/Company');
const Question = require('./src/models/Question');

const questions = [
    // Python
    { skill: 'python', question: 'What is the output of print(type([]))?', options: ["<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "<class 'set'>"], correctAnswer: "<class 'list'>" },
    { skill: 'python', question: 'Which keyword is used to define a function in Python?', options: ['func', 'def', 'function', 'define'], correctAnswer: 'def' },
    { skill: 'python', question: 'What does "PEP" stand for in Python?', options: ['Python Enhancement Proposal', 'Python Execution Protocol', 'Python Error Prevention', 'Python Extension Package'], correctAnswer: 'Python Enhancement Proposal' },
    { skill: 'python', question: 'Which of these is an immutable data type in Python?', options: ['List', 'Dictionary', 'Tuple', 'Set'], correctAnswer: 'Tuple' },

    // JavaScript
    { skill: 'javascript', question: 'Which method adds an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correctAnswer: 'push()' },
    { skill: 'javascript', question: 'What does "=== " mean in JavaScript?', options: ['Assignment', 'Loose equality', 'Strict equality', 'Not equal'], correctAnswer: 'Strict equality' },
    { skill: 'javascript', question: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'global', 'static'], correctAnswer: 'let' },
    { skill: 'javascript', question: 'What is the output of typeof null?', options: ['null', 'undefined', 'object', 'string'], correctAnswer: 'object' },

    // React
    { skill: 'react', question: 'What hook is used to manage state in a functional component?', options: ['useEffect', 'useState', 'useContext', 'useReducer'], correctAnswer: 'useState' },
    { skill: 'react', question: 'What does JSX stand for?', options: ['JavaScript XML', 'JavaScript Extension', 'Java Syntax Extra', 'JavaScript X-tra'], correctAnswer: 'JavaScript XML' },
    { skill: 'react', question: 'Which lifecycle hook runs after every render in React?', options: ['componentDidMount', 'useEffect', 'componentWillUnmount', 'useState'], correctAnswer: 'useEffect' },

    // MongoDB
    { skill: 'mongodb', question: 'MongoDB stores data in which format?', options: ['Tables', 'BSON documents', 'XML', 'CSV'], correctAnswer: 'BSON documents' },
    { skill: 'mongodb', question: 'Which command finds all documents in a collection?', options: ['db.col.find()', 'db.col.select()', 'db.col.get()', 'db.col.fetch()'], correctAnswer: 'db.col.find()' },
    { skill: 'mongodb', question: 'What is the primary key field called in MongoDB?', options: ['id', '_id', 'pk', 'uid'], correctAnswer: '_id' },

    // Java
    { skill: 'java', question: 'Which concept allows a class to inherit from another class?', options: ['Polymorphism', 'Encapsulation', 'Inheritance', 'Abstraction'], correctAnswer: 'Inheritance' },
    { skill: 'java', question: 'What is the entry point of a Java program?', options: ['start()', 'main()', 'run()', 'init()'], correctAnswer: 'main()' },
    { skill: 'java', question: 'What does JVM stand for?', options: ['Java Virtual Machine', 'Java Variable Method', 'Java Verified Mode', 'Just Variable Memory'], correctAnswer: 'Java Virtual Machine' },

    // Machine Learning
    { skill: 'machine learning', question: 'Which algorithm is used for classification problems?', options: ['K-Means', 'Linear Regression', 'Decision Tree', 'PCA'], correctAnswer: 'Decision Tree' },
    { skill: 'machine learning', question: 'What is overfitting in ML?', options: ['Model performs well on training but poorly on new data', 'Model performs poorly everywhere', 'Model is too simple', 'Model uses too little data'], correctAnswer: 'Model performs well on training but poorly on new data' },

    // Cloud
    { skill: 'cloud', question: 'Which AWS service provides serverless computing?', options: ['EC2', 'S3', 'Lambda', 'RDS'], correctAnswer: 'Lambda' },
    { skill: 'cloud', question: 'What does SaaS stand for?', options: ['Software as a Service', 'System as a Service', 'Storage as a Service', 'Server as a Service'], correctAnswer: 'Software as a Service' },

    // DevOps
    { skill: 'devops', question: 'What is Docker primarily used for?', options: ['Version control', 'Containerization', 'Cloud storage', 'API testing'], correctAnswer: 'Containerization' },
    { skill: 'devops', question: 'What does CI/CD stand for?', options: ['Continuous Integration / Continuous Delivery', 'Code Integration / Code Delivery', 'Continuous Inspection / Code Distribution', 'Complete Integration / Complete Deployment'], correctAnswer: 'Continuous Integration / Continuous Delivery' },

    // Node.js
    { skill: 'node.js', question: 'Which module is used to create an HTTP server in Node.js?', options: ['http', 'server', 'express', 'net'], correctAnswer: 'http' },
    { skill: 'node.js', question: 'What does npm stand for?', options: ['Node Package Manager', 'New Project Module', 'Node Program Module', 'Normal Package Manager'], correctAnswer: 'Node Package Manager' }
];

const students = [
    { name: 'Rahul Kumar', email: 'rahul@example.com', password: 'pass123', college: 'IIT Delhi', skills: ['python', 'react', 'mongodb', 'node.js'], resumeText: 'Full stack developer with 2 years of project experience.', testScore: 0, recommended: false },
    { name: 'Priya Sharma', email: 'priya@example.com', password: 'pass123', college: 'NIT Trichy', skills: ['java', 'machine learning', 'python'], resumeText: 'Data science enthusiast with strong Java background.', testScore: 0, recommended: false },
    { name: 'Amit Patel', email: 'amit@example.com', password: 'pass123', college: 'BITS Pilani', skills: ['cloud', 'devops', 'python'], resumeText: 'Cloud-native developer with AWS certification.', testScore: 0, recommended: false },
    { name: 'Sneha Reddy', email: 'sneha@example.com', password: 'pass123', college: 'VIT Vellore', skills: ['javascript', 'react', 'node.js'], resumeText: 'Frontend specialist with React and animation libraries.', testScore: 0, recommended: false },
    { name: 'Vikram Singh', email: 'vikram@example.com', password: 'pass123', college: 'Jadavpur University', skills: ['python', 'machine learning', 'javascript'], resumeText: 'ML researcher with strong Python and statistical skills.', testScore: 0, recommended: false }
];

const companies = [
    { companyName: 'Tech Innovators Pvt Ltd', email: 'tech@company.com', password: 'comp123', internshipRole: 'Full Stack Developer Intern', requiredSkills: ['python', 'react', 'mongodb', 'node.js'] },
    { companyName: 'DataAI Solutions', email: 'dataai@company.com', password: 'comp123', internshipRole: 'Machine Learning Intern', requiredSkills: ['python', 'machine learning', 'java'] },
    { companyName: 'WebCraft Studios', email: 'webcraft@company.com', password: 'comp123', internshipRole: 'Frontend Developer Intern', requiredSkills: ['javascript', 'react', 'node.js'] },
    { companyName: 'Enterprise Systems Inc', email: 'enterprise@company.com', password: 'comp123', internshipRole: 'Backend Developer Intern', requiredSkills: ['java', 'mongodb', 'node.js'] },
    { companyName: 'CloudOps Technologies', email: 'cloudops@company.com', password: 'comp123', internshipRole: 'DevOps Intern', requiredSkills: ['cloud', 'devops', 'python'] }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Student.deleteMany({});
        await Company.deleteMany({});
        await Question.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Seed questions
        await Question.insertMany(questions);
        console.log(`✅ Seeded ${questions.length} questions`);

        // Seed students with hashed passwords
        for (const s of students) {
            s.password = await bcrypt.hash(s.password, 10);
        }
        await Student.insertMany(students);
        console.log(`✅ Seeded ${students.length} students`);

        // Seed companies with hashed passwords
        for (const c of companies) {
            c.password = await bcrypt.hash(c.password, 10);
        }
        await Company.insertMany(companies);
        console.log(`✅ Seeded ${companies.length} companies`);

        console.log('\n🎉 Database seeded successfully!\n');
        console.log('Sample Student Credentials:');
        console.log('  Email: rahul@example.com | Password: pass123');
        console.log('  Email: priya@example.com | Password: pass123');
        console.log('\nSample Company Credentials:');
        console.log('  Email: tech@company.com | Password: comp123');
        console.log('  Email: dataai@company.com | Password: comp123');

        process.exit(0);
    } catch (err) {
        console.error('❌ Seed error:', err);
        process.exit(1);
    }
}

seed();
