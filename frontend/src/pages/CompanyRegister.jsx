import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { companyRegister } from '../utils/api';

export default function CompanyRegister() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        companyName: '', email: '', password: '', internshipRole: '', requiredSkills: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const skillsArray = form.requiredSkills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
            const payload = { ...form, requiredSkills: skillsArray };
            const res = await companyRegister(payload);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', 'company');
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/company/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-center" style={{ alignItems: 'flex-start', paddingTop: '40px', paddingBottom: '40px' }}>
            <div style={{
                position: 'fixed', top: 0, right: 0,
                width: '400px', height: '400px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
                pointerEvents: 'none', transform: 'translate(30%, -30%)'
            }} />

            <div className="auth-card" style={{ maxWidth: '520px' }}>
                <Link to="/company/login" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600,
                    marginBottom: '28px', transition: 'color 0.2s'
                }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--violet-light)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                    ← Already have an account?
                </Link>

                <div className="auth-logo">
                    <div className="logo-badge" style={{
                        color: 'var(--violet-light)',
                        borderColor: 'rgba(124,58,237,0.3)',
                        background: 'rgba(124,58,237,0.1)'
                    }}>
                        🏢 Company Portal
                    </div>
                    <h2 style={{
                        background: 'linear-gradient(135deg, #fff 20%, var(--violet-light) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Register Company
                    </h2>
                    <p>Post internships & discover top talent</p>
                </div>

                {error && (
                    <div className="alert alert-error">
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Company Name</label>
                        <div className="input-icon-wrap">
                            <span className="icon">🏢</span>
                            <input name="companyName" placeholder="Tech Innovators Pvt Ltd"
                                value={form.companyName} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Contact Email</label>
                        <div className="input-icon-wrap">
                            <span className="icon">✉️</span>
                            <input name="email" type="email" placeholder="hr@company.com"
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
                        <label>Internship Role</label>
                        <div className="input-icon-wrap">
                            <span className="icon">💼</span>
                            <input name="internshipRole" placeholder="Full Stack Developer Intern"
                                value={form.internshipRole} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Required Skills</label>
                        <div className="input-icon-wrap">
                            <span className="icon">⚡</span>
                            <input name="requiredSkills" placeholder="python, react, mongodb, node.js"
                                value={form.requiredSkills} onChange={handleChange} required />
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                            Separate skills with commas — used for AI matching
                        </p>
                    </div>

                    <button
                        className="btn btn-secondary"
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', padding: '15px', fontSize: '15px', fontWeight: 800, marginTop: '4px' }}
                    >
                        {loading ? (
                            <>
                                <span style={{
                                    width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                                    borderTopColor: '#fff', borderRadius: '50%',
                                    animation: 'spin 0.75s linear infinite', display: 'inline-block'
                                }} />
                                Creating account...
                            </>
                        ) : '✅ Register Company'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Already registered?{' '}
                    <Link to="/company/login" style={{ color: 'var(--violet-light)', fontWeight: 700 }}>
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
