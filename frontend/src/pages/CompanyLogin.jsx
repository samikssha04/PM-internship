import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { companyLogin } from '../utils/api';

export default function CompanyLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await companyLogin(form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', 'company');
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/company/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-center">
            <div className="auth-card">
                <Link to="/" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600,
                    marginBottom: '28px', transition: 'color 0.2s'
                }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--terracotta)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                    ← Back to Home
                </Link>

                <div className="auth-logo">
                    <div className="logo-badge" style={{
                        color: 'var(--terracotta)',
                        borderColor: 'rgba(192,81,58,0.3)',
                        background: 'var(--terracotta-soft)'
                    }}>
                        🏢 Company Portal
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Sign in to discover matched candidates</p>
                </div>

                {error && (
                    <div className="alert alert-error">
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Company Email</label>
                        <div className="input-icon-wrap">
                            <span className="icon">✉️</span>
                            <input
                                name="email" type="email"
                                placeholder="hr@company.com"
                                value={form.email} onChange={handleChange} required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-icon-wrap">
                            <span className="icon">🔒</span>
                            <input
                                name="password" type="password"
                                placeholder="Enter your password"
                                value={form.password} onChange={handleChange} required
                            />
                        </div>
                    </div>

                    <button
                        className="btn btn-secondary"
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', padding: '14px', fontSize: '15px', fontWeight: 800, marginTop: '8px' }}
                    >
                        {loading ? (
                            <>
                                <span style={{
                                    width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                                    borderTopColor: '#fff', borderRadius: '50%',
                                    animation: 'spin 0.75s linear infinite', display: 'inline-block'
                                }} />
                                Signing in...
                            </>
                        ) : (
                            <>🚀 Sign In</>
                        )}
                    </button>
                </form>

                <div className="divider">or</div>

                <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    New company?{' '}
                    <Link to="/company/register" style={{ color: 'var(--terracotta)', fontWeight: 700 }}>
                        Register here →
                    </Link>
                </div>

                <div className="alert alert-info" style={{ marginTop: '20px', fontSize: '12px' }}>
                    <span>💡</span>
                    <span>Demo: <strong>tech@company.com</strong> / comp123</span>
                </div>
            </div>
        </div>
    );
}
