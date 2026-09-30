import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { studentRegister } from '../utils/api';

export default function StudentRegister() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '', email: '', password: '', college: '', skills: '', resumeText: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const skillsArray = form.skills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
            const payload = { ...form, skills: skillsArray };
            const res = await studentRegister(payload);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', 'student');
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/student/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-center" style={{ alignItems: 'flex-start', paddingTop: '40px', paddingBottom: '40px' }}>
            <div className="auth-card" style={{ maxWidth: '520px' }}>
                <Link to="/student/login" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600,
                    marginBottom: '28px', transition: 'color 0.2s'
                }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--amber-dark)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                    ← Already have an account?
                </Link>

                <div className="auth-logo">
                    <div className="logo-badge">🎓 Student Portal</div>
                    <h2>Create Account</h2>
                    <p>Start your internship journey today</p>
                </div>

                {error && (
                    <div className="alert alert-error">
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid-2" style={{ gap: '16px' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Full Name</label>
                            <input name="name" placeholder="Rahul Kumar"
                                value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>College / University</label>
                            <input name="college" placeholder="IIT Delhi"
                                value={form.college} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '18px' }}>
                        <label>Email Address</label>
                        <div className="input-icon-wrap">
                            <span className="icon">✉️</span>
                            <input name="email" type="email" placeholder="rahul@example.com"
                                value={form.email} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-icon-wrap">
                            <span className="icon">🔒</span>
                            <input name="password" type="password" placeholder="Min 6 characters"
                                value={form.password} onChange={handleChange} required minLength={6} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Your Skills</label>
                        <div className="input-icon-wrap">
                            <span className="icon">⚡</span>
                            <input name="skills" placeholder="python, react, mongodb, javascript"
                                value={form.skills} onChange={handleChange} required />
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                            Separate skills with commas for better matching
                        </p>
                    </div>

                    <div className="form-group">
                        <label>Resume Summary <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                        <textarea name="resumeText" placeholder="Brief about yourself, projects, experience..."
                            value={form.resumeText} onChange={handleChange} rows={3} />
                    </div>

                    <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop: '4px' }}>
                        {loading ? (
                            <>
                                <span style={{
                                    width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                                    borderTopColor: '#fff', borderRadius: '50%',
                                    animation: 'spin 0.75s linear infinite', display: 'inline-block'
                                }} />
                                Creating account...
                            </>
                        ) : '✅ Create Account & Continue'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Already registered?{' '}
                    <Link to="/student/login" style={{ color: 'var(--amber-dark)', fontWeight: 700 }}>
                        Sign in →
                    </Link>
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '13px' }}>← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
