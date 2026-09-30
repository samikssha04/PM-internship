import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchStudents, companyProfile } from '../utils/api';

const getMatchClass = pct => pct >= 70 ? 'high' : pct >= 40 ? 'medium' : 'low';
const getFillClass = pct => pct >= 70 ? 'fill-high' : pct >= 40 ? 'fill-medium' : 'fill-low';

const avatarColors = [
    'linear-gradient(135deg, #7c3aed, #6d28d9)',
    'linear-gradient(135deg, #0369a1, #0ea5e9)',
    'linear-gradient(135deg, #059669, #10b981)',
    'linear-gradient(135deg, #b45309, #f59e0b)',
    'linear-gradient(135deg, #be185d, #f43f5e)',
    'linear-gradient(135deg, #0f766e, #14b8a6)',
    'linear-gradient(135deg, #7e22ce, #a855f7)',
];

export default function CompanyDashboard() {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const loadData = useCallback(async () => {
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        if (!stored?.id) { navigate('/company/login'); return; }
        try {
            const [profileRes, matchRes] = await Promise.all([
                companyProfile(stored.id),
                matchStudents(stored.id)
            ]);
            setCompany(profileRes.data);
            setMatches(matchRes.data);
        } catch {
            navigate('/company/login');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => { loadData(); }, [loadData]);
    const handleLogout = () => { localStorage.clear(); navigate('/'); };

    const displayed = filter === 'recommended' ? matches.filter(s => s.recommended) : matches;

    if (loading) return (
        <div className="dashboard-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div className="spinner" />
                <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '14px' }}>Loading dashboard...</p>
            </div>
        </div>
    );

    const companyInitials = company?.companyName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
    const recommendedCount = matches.filter(s => s.recommended).length;

    return (
        <div className="dashboard-page">
            <nav className="navbar">
                <div className="brand">
                    <span>🏢</span> InternConnect
                </div>
                <div className="nav-right">
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                        padding: '6px 14px 6px 8px', borderRadius: '40px'
                    }}>
                        <div style={{
                            width: '30px', height: '30px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--violet), #6d28d9)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '13px', fontWeight: 800, color: '#fff'
                        }}>
                            {companyInitials}
                        </div>
                        <span className="nav-user">{company?.companyName}</span>
                    </div>
                    <button
                        className="btn btn-outline"
                        style={{ fontSize: '13px', padding: '8px 18px' }}
                        onClick={handleLogout}
                    >
                        Sign Out
                    </button>
                </div>
            </nav>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '36px 24px' }}>

                {/* Company Profile Hero */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.07) 0%, rgba(255,255,255,0.02) 60%)',
                    border: '1px solid rgba(124,58,237,0.2)',
                    borderRadius: '20px',
                    padding: '32px',
                    marginBottom: '28px',
                    animation: 'fadeUp 0.5s ease both',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute', top: '-60px', right: '-60px',
                        width: '200px', height: '200px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            {/* Logo */}
                            <div style={{
                                width: '72px', height: '72px', borderRadius: '18px',
                                background: 'linear-gradient(135deg, var(--violet), #6d28d9)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '26px', fontWeight: 900, color: '#fff',
                                flexShrink: 0, border: '3px solid rgba(124,58,237,0.3)',
                                boxShadow: '0 8px 24px rgba(124,58,237,0.25)'
                            }}>
                                {companyInitials}
                            </div>

                            <div>
                                <div style={{ fontSize: '11px', color: 'var(--violet-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                                    Company Profile
                                </div>
                                <h1 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '6px', letterSpacing: '-0.5px' }}>
                                    {company?.companyName}
                                </h1>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '14px' }}>
                                    💼 {company?.internshipRole}&nbsp;&nbsp;·&nbsp;&nbsp;✉️ {company?.email}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Required Skills:</span>
                                    <div className="skills-wrap" style={{ margin: 0 }}>
                                        {(company?.requiredSkills || []).map(s => (
                                            <span key={s} className="badge badge-skill">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div className="stat-card">
                                <div className="stat-num" style={{ color: 'var(--violet-light)' }}>{matches.length}</div>
                                <div className="stat-label">Total Matches</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-num" style={{ color: 'var(--emerald)' }}>{recommendedCount}</div>
                                <div className="stat-label">Recommended</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-num" style={{ color: 'var(--saffron)', fontSize: '22px' }}>
                                    {matches.length > 0 ? Math.round(matches.reduce((a, m) => a + m.matchScore, 0) / matches.length) : 0}%
                                </div>
                                <div className="stat-label">Avg Match</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter & Section Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <div className="section-title" style={{ marginBottom: 0 }}>
                        <span>🎯</span>
                        <span>Top <span className="accent">Matched Candidates</span></span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '10px', padding: '4px' }}>
                        <button
                            onClick={() => setFilter('all')}
                            style={{
                                padding: '7px 16px', borderRadius: '7px', border: 'none', cursor: 'pointer',
                                fontSize: '13px', fontWeight: 700, fontFamily: 'inherit',
                                background: filter === 'all' ? 'var(--violet)' : 'transparent',
                                color: filter === 'all' ? '#fff' : 'var(--text-muted)',
                                transition: 'all 0.2s'
                            }}
                        >
                            All ({matches.length})
                        </button>
                        <button
                            onClick={() => setFilter('recommended')}
                            style={{
                                padding: '7px 16px', borderRadius: '7px', border: 'none', cursor: 'pointer',
                                fontSize: '13px', fontWeight: 700, fontFamily: 'inherit',
                                background: filter === 'recommended' ? 'var(--emerald)' : 'transparent',
                                color: filter === 'recommended' ? '#fff' : 'var(--text-muted)',
                                transition: 'all 0.2s'
                            }}
                        >
                            ⭐ Recommended ({recommendedCount})
                        </button>
                    </div>
                </div>

                {/* Student Cards */}
                {displayed.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                            {filter === 'recommended' ? '⭐' : '👥'}
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                            {filter === 'recommended' ? 'No recommended students yet' : 'No students registered yet'}
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            {filter === 'recommended' ? 'Students need to score ≥60% on the test to be recommended.' : 'Students will appear here once they register.'}
                        </div>
                    </div>
                ) : (
                    <div className="grid-1">
                        {displayed.map((s, i) => {
                            const mc = getMatchClass(s.matchScore);
                            const fc = getFillClass(s.matchScore);
                            const bg = avatarColors[i % avatarColors.length];
                            const initials = s.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

                            return (
                                <div key={s.id} className="card-sm animate-fade-up" style={{
                                    display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
                                    border: s.recommended ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--border)',
                                    background: s.recommended ? 'rgba(16,185,129,0.04)' : undefined,
                                    borderLeft: mc === 'high' ? '3px solid var(--emerald)' : mc === 'medium' ? '3px solid var(--saffron)' : '3px solid var(--rose)',
                                    animationDelay: `${i * 0.08}s`, animationFillMode: 'both'
                                }}>
                                    {/* Avatar */}
                                    <div style={{
                                        width: '52px', height: '52px', borderRadius: '50%',
                                        background: bg,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '18px', fontWeight: 800, color: '#fff',
                                        flexShrink: 0, border: '2px solid rgba(255,255,255,0.1)'
                                    }}>
                                        {initials}
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: '160px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px', flexWrap: 'wrap' }}>
                                            <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '-0.2px' }}>{s.name}</span>
                                            {s.recommended && (
                                                <span className="badge badge-recommended">⭐ Recommended</span>
                                            )}
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '10px', fontWeight: 500 }}>
                                            🏛️ {s.college}&nbsp;&nbsp;·&nbsp;&nbsp;✉️ {s.email}
                                        </p>
                                        <div className="skills-wrap">
                                            {s.skills.map(sk => <span key={sk} className="badge badge-skill">{sk}</span>)}
                                        </div>
                                    </div>

                                    {/* Match Score */}
                                    <div style={{ textAlign: 'center', minWidth: '90px' }}>
                                        <div className={`match-pct ${mc}`}>{s.matchScore}%</div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Match</div>
                                        <div className="progress-bar-wrap" style={{ width: '80px', marginTop: '8px' }}>
                                            <div className={`progress-bar-fill ${fc}`} style={{ width: `${s.matchScore}%` }} />
                                        </div>
                                    </div>

                                    {/* Test Score */}
                                    <div style={{ textAlign: 'center', minWidth: '80px' }}>
                                        <div style={{
                                            fontSize: '20px', fontWeight: 900,
                                            color: s.testScore >= 60 ? 'var(--emerald)' : 'var(--rose)',
                                            letterSpacing: '-0.5px'
                                        }}>
                                            {s.testScore}%
                                        </div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginTop: '3px' }}>
                                            Test Score
                                        </div>
                                        <div style={{
                                            fontSize: '10px', marginTop: '4px', fontWeight: 700,
                                            color: s.testScore >= 60 ? 'var(--emerald)' : 'var(--text-muted)'
                                        }}>
                                            {s.testScore >= 60 ? '✓ Pass' : 'Not taken'}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
