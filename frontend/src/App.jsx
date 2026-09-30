import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import CompanyLogin from './pages/CompanyLogin';
import CompanyRegister from './pages/CompanyRegister';
import StudentDashboard from './pages/StudentDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import OnlineTest from './pages/OnlineTest';
import Results from './pages/Results';
import AdminPanel from './pages/AdminPanel';

const ProtectedStudent = ({ children }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'student') return <Navigate to="/student/login" />;
    return children;
};

const ProtectedCompany = ({ children }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'company') return <Navigate to="/company/login" />;
    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/" element={<HomePage />} />
                <Route path="/student/login" element={<StudentLogin />} />
                <Route path="/student/register" element={<StudentRegister />} />
                <Route path="/company/login" element={<CompanyLogin />} />
                <Route path="/company/register" element={<CompanyRegister />} />
                <Route path="/admin" element={<AdminPanel />} />

                {/* Protected Student */}
                <Route path="/student/dashboard" element={<ProtectedStudent><StudentDashboard /></ProtectedStudent>} />
                <Route path="/test" element={<ProtectedStudent><OnlineTest /></ProtectedStudent>} />
                <Route path="/results" element={<ProtectedStudent><Results /></ProtectedStudent>} />

                {/* Protected Company */}
                <Route path="/company/dashboard" element={<ProtectedCompany><CompanyDashboard /></ProtectedCompany>} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
