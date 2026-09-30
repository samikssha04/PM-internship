import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000',
});

// Attach JWT to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ── Student Auth ─────────────────────────────────────────────
export const studentRegister = (data) => API.post('/api/student/register', data);
export const studentLogin = (data) => API.post('/api/student/login', data);
export const studentProfile = (id) => API.get(`/api/student/profile/${id}`);

// ── Company Auth ─────────────────────────────────────────────
export const companyRegister = (data) => API.post('/api/company/register', data);
export const companyLogin = (data) => API.post('/api/company/login', data);
export const companyProfile = (id) => API.get(`/api/company/profile/${id}`);

// ── Matching ──────────────────────────────────────────────────
export const matchCompanies = (studentId) => API.get(`/api/match/companies/${studentId}`);
export const matchStudents = (companyId) => API.get(`/api/match/students/${companyId}`);

// ── Test ──────────────────────────────────────────────────────
export const fetchQuestions = (studentId) => API.get(`/api/test/questions/${studentId}`);
export const submitTest = (data) => API.post('/api/test/submit', data);

// ── Admin ─────────────────────────────────────────────────────
export const addQuestion = (data) => API.post('/api/admin/question', data);
export const getAllStudents = () => API.get('/api/admin/students');
export const getAllCompanies = () => API.get('/api/admin/companies');
export const getAllQuestions = () => API.get('/api/admin/questions');
export const deleteQuestion = (id) => API.delete(`/api/admin/question/${id}`);

export default API;
