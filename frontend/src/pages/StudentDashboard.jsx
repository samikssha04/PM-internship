import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchCompanies, studentProfile } from '../utils/api';

const getMatchClass = pct => pct >= 70 ? 'high' : pct >= 40 ? 'medium' : 'low';
const getFillClass = pct => pct >= 70 ? 'fill-high' : pct >= 40 ? 'fill-medium' : 'fill-low';

const avatarColors = [
    'linear-gradient(135deg, #7c3aed, #6d28d9)',
    'linear-gradient(135deg, #0369a1, #0ea5e9)',
    'linear-gradient(135deg, #059669, #10b981)',
    'linear-gradient(135deg, #b45309, #f59e0b)',
    'linear-gradient(135deg, #be185d, #f43f5e)',
];

export default function StudentDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(async () => {
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        if (!stored?.id) { navigate('/student/login'); return; }

        try {
            const [profileRes, matchRes] = await Promise.all([
                studentProfile(stored.id),
                matchCompanies(stored.id)
            ]);
            setUser(profileRes.data);
            setMatches(matchRes.data);
            localStorage.setItem('user', JSON.stringify({ ...stored, ...profileRes.data, id: profileRes.data._id || stored.id }));
        } catch {
            navigate('/student/login');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => { loadData(); }, [loadData]);

    const handleLogout = () => { localStorage.clear(); navigate('/'); };
    const handleApply = (company) => navigate('/test', { state: { company } });

    if (loading) return (
        <div className="dashboard-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div className="spinner" />
                <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '14px' }}>Loading your dashboard...</p>
            </div>
        </div>
    );

    const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

    return (
        <div className="dashboard-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="brand">
                    <span>🎓</span> InternConnect
                </div>
                <div className="nav-right">
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                        padding: '6px 14px 6px 8px', borderRadius: '40px'
                    }}>
                        <div style={{
                            width: '30px', height: '30px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--saffron), #d97706)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '13px', fontWeight: 800, color: '#111'
                        }}>
                            {initials}
                        </div>
                        <span className="nav-user">{user?.name}</span>
                    </div>
                    {user?.recommended && (
                        <span className="badge badge-recommended">⭐ Recommended</span>
                    )}
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

                {/* Profile Hero Card */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.07) 0%, rgba(255,255,255,0.02) 60%)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    borderRadius: '20px',
                    padding: '32px',
                    marginBottom: '28px',
                    animation: 'fadeUp 0.5s ease both',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Background decoration */}
                    <div style={{
                        position: 'absolute', top: '-60px', right: '-60px',
                        width: '200px', height: '200px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            {/* Avatar */}
                            <div style={{
                                width: '72px', height: '72px', borderRadius: '18px',
                                background: 'linear-gradient(135deg, var(--saffron), #d97706)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '26px', fontWeight: 900, color: '#111',
                                flexShrink: 0, border: '3px solid rgba(245,158,11,0.3)',
                                boxShadow: '0 8px 24px rgba(245,158,11,0.2)'
                            }}>
                                {initials}
                            </div>

                            <div>
                                <div style={{ fontSize: '11px', color: 'var(--saffron)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                                    Student Profile
                                </div>
                                <h1 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '6px', letterSpacing: '-0.5px' }}>
                                    {user?.name}
                                </h1>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '14px' }}>
                                    🏛️ {user?.college}&nbsp;&nbsp;·&nbsp;&nbsp;✉️ {user?.email}
                                </p>
                                <div className="skills-wrap">
                                    {(user?.skills || []).map(s => (
                                        <span key={s} className="badge badge-skill">{s}</span>
                                    ))}
                                </div>
                                {user?.resumeText && (
                                    <p style={{ marginTop: '14px', color: 'var(--text-secondary)', fontSize: '13px', maxWidth: '480px', lineHeight: 1.65 }}>
                                        {user.resumeText}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <div className="stat-card">
                                <div className="stat-num">{user?.testScore || 0}%</div>
                                <div className="stat-label">Test Score</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-num" style={{ fontSize: '22px', color: user?.recommended ? 'var(--emerald)' : 'var(--text-muted)' }}>
                                    {user?.recommended ? '✅' : '⏳'}
                                </div>
                                <div className="stat-label">{user?.recommended ? 'Recommended' : 'Pending'}</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-num" style={{ color: 'var(--violet-light)' }}>{matches.length}</div>
                                <div className="stat-label">Matches</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Banners */}
                {user?.recommended && (
                    <div className="alert alert-success animate-fade-up" style={{ marginBottom: '24px', fontSize: '14px', padding: '16px 20px' }}>
                        🎉 <strong>Congratulations!</strong> You scored {user.testScore}% and are marked as <strong>Recommended</strong>. Companies can now see your profile as a priority candidate!
                    </div>
                )}
                {user?.testScore > 0 && !user?.recommended && (
                    <div className="alert alert-error animate-fade-up" style={{ marginBottom: '24px', fontSize: '14px' }}>
                        📝 You scored {user.testScore}% (need ≥60% to be Recommended). Apply to another company to retake the test.
                    </div>
                )}

                {/* Section Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <div className="section-title" style={{ marginBottom: 0 }}>
                        <span>🏆</span>
                        <span>Top <span className="accent">Matching Companies</span></span>
                    </div>
                    {matches.length > 0 && (
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
                            {matches.length} company match{matches.length !== 1 ? 'es' : ''} found
                        </span>
                    )}
                </div>

                {/* Companies */}
                {matches.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>No companies yet</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Check back soon — companies are joining the platform!</div>
                    </div>
                ) : (
                    <div className="grid-1">
                        {matches.map((c, i) => {
                            const mc = getMatchClass(c.matchScore);
                            const fc = getFillClass(c.matchScore);
                            const bg = avatarColors[i % avatarColors.length];
                            return (
                                <div key={c.id} className="card-sm animate-fade-up" style={{
                                    display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
                                    animationDelay: `${i * 0.08}s`, animationFillMode: 'both',
                                    borderLeft: mc === 'high' ? '3px solid var(--emerald)' : mc === 'medium' ? '3px solid var(--saffron)' : '3px solid var(--rose)',
                                }}>
                                    {/* Company Avatar */}
                                    <div style={{
                                        width: '52px', height: '52px', borderRadius: '14px',
                                        background: bg,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '22px', flexShrink: 0
                                    }}>
                                        🏢
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: '180px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px', flexWrap: 'wrap' }}>
                                            <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '-0.2px' }}>{c.companyName}</span>
                                            <span style={{
                                                background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)',
                                                borderRadius: '4px', fontSize: '11px', color: 'var(--text-muted)',
                                                padding: '2px 8px', fontWeight: 700
                                            }}>#{i + 1}</span>
                                        </div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '10px', fontWeight: 500 }}>
                                            💼 {c.internshipRole}
                                        </div>
                                        <div className="skills-wrap">
                                            {c.requiredSkills.map(s => <span key={s} className="badge badge-skill">{s}</span>)}
                                        </div>
                                    </div>

                                    {/* Match Score */}
                                    <div style={{ textAlign: 'center', minWidth: '90px' }}>
                                        <div className={`match-pct ${mc}`}>{c.matchScore}%</div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Match</div>
                                        <div className="progress-bar-wrap" style={{ width: '80px', marginTop: '8px' }}>
                                            <div className={`progress-bar-fill ${fc}`} style={{ width: `${c.matchScore}%` }} />
                                        </div>
                                    </div>

                                    {/* Apply Button */}
                                    <button className="btn btn-green" style={{ minWidth: '150px' }} onClick={() => handleApply(c)}>
                                        📝 Apply & Take Test
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
