# InternConnect – Smart Internship Matching Platform
### Prime Minister Internship Scheme Enhancement

A full-stack internship matching platform with skill-based AI matching, automated MCQ screening, and merit-based recommendation system.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
Intern_connect/
├── backend/
│   ├── src/
│   │   ├── config/db.js          # MongoDB connection
│   │   ├── models/
│   │   │   ├── Student.js
│   │   │   ├── Company.js
│   │   │   └── Question.js
│   │   ├── routes/
│   │   │   ├── auth.js           # Student auth
│   │   │   ├── authCompany.js    # Company auth
│   │   │   ├── match.js          # Skill matching
│   │   │   ├── test.js           # MCQ test engine
│   │   │   └── admin.js          # Admin panel
│   │   └── middleware/auth.js    # JWT middleware
│   ├── server.js
│   ├── seed.js                   # Sample data seeder
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── StudentLogin.jsx
    │   │   ├── StudentRegister.jsx
    │   │   ├── CompanyLogin.jsx
    │   │   ├── CompanyRegister.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   ├── CompanyDashboard.jsx
    │   │   ├── OnlineTest.jsx
    │   │   ├── Results.jsx
    │   │   └── AdminPanel.jsx
    │   ├── utils/api.js           # Axios + API functions
    │   ├── App.jsx                # Routes + protected routes
    │   ├── main.jsx
    │   └── index.css              # Global premium styles
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** 18+ ([nodejs.org](https://nodejs.org))
- **MongoDB** running on `localhost:27017` ([mongodb.com/try/download/community](https://www.mongodb.com/try/download/community))

---

### Step 1 – Backend Setup

```powershell
# Install dependencies
cd backend
npm install

# Seed sample data (students, companies, questions)
node seed.js

# Start the API server
node server.js
# ✅ Server runs on http://localhost:5000
```

---

### Step 2 – Frontend Setup

Open a **new terminal**:

```powershell
cd frontend
npm install
npm run dev
# ✅ App runs on http://localhost:5173
```

---

## 🔑 Sample Login Credentials

### Students
| Email | Password | Skills |
|-------|----------|--------|
| rahul@example.com | pass123 | python, react, mongodb, node.js |
| priya@example.com | pass123 | java, machine learning, python |
| amit@example.com  | pass123 | cloud, devops, python |
| sneha@example.com | pass123 | javascript, react, node.js |
| vikram@example.com| pass123 | python, machine learning, javascript |

### Companies
| Email | Password | Role |
|-------|----------|------|
| tech@company.com | comp123 | Full Stack Developer |
| dataai@company.com | comp123 | Machine Learning Intern |
| webcraft@company.com | comp123 | Frontend Developer |
| enterprise@company.com | comp123 | Backend Developer |
| cloudops@company.com | comp123 | DevOps Intern |

---

## 🧠 Matching Algorithm

```
normalize: skill.toLowerCase().trim()
score = (matchingSkills / requiredSkills.length) × 100
sort descending → top 5 shown
```

**Example:**
- Student skills: `[python, react, mongodb]`
- Company needs: `[python, react, node.js]`
- Common: 2 → Score = **66.7%**

---

## 📝 Screening Test Rules

- 5 random MCQs from question bank (matched to student skills)
- 10-minute countdown timer
- Auto-submits when time expires
- **Score ≥ 60%** → Student marked as ⭐ **Recommended**
- Companies see Recommended students as priority candidates

---

## 🌐 Pages

| URL | Page |
|-----|------|
| `/` | Home Page |
| `/student/register` | Student Registration |
| `/student/login` | Student Login |
| `/student/dashboard` | Student Dashboard + Matches |
| `/company/register` | Company Registration |
| `/company/login` | Company Login |
| `/company/dashboard` | Company Dashboard |
| `/test` | Online Screening Test |
| `/results` | Test Results |
| `/admin` | Admin Panel |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/student/register` | Register student |
| POST | `/api/student/login` | Login student |
| POST | `/api/company/register` | Register company |
| POST | `/api/company/login` | Login company |
| GET  | `/api/match/companies/:studentId` | Top 5 company matches |
| GET  | `/api/match/students/:companyId` | Top 5 student matches |
| GET  | `/api/test/questions/:studentId` | Fetch 5 MCQs |
| POST | `/api/test/submit` | Submit test answers |
| POST | `/api/admin/question` | Add question |
| GET  | `/api/admin/students` | All students |
| GET  | `/api/admin/companies` | All companies |
| GET  | `/api/admin/questions` | All questions |
