import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>

            {/* ── Navbar ────────────────────────────────────────── */}
            <nav style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 48px', height: '68px',
                background: 'rgba(253,248,243,0.95)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--border)',
                position: 'sticky', top: 0, zIndex: 100,
                boxShadow: '0 1px 0 var(--border), 0 2px 8px rgba(45,31,14,0.04)',
            }}>
                <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '22px', fontWeight: 700,
                    color: 'var(--text-primary)',
                    display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                    <span style={{ fontSize: '24px' }}>🎓</span>
                    Intern<span style={{ color: 'var(--amber)' }}>Connect</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button className="btn btn-outline" style={{ fontSize: '13px', padding: '8px 16px' }}
                        onClick={() => navigate('/admin')}>
                        ⚙️ Admin
                    </button>
                    <button className="btn btn-primary" style={{ width: 'auto', padding: '8px 20px', fontSize: '13px' }}
                        onClick={() => navigate('/student/login')}>
                        Get Started
                    </button>
                </div>
            </nav>

            {/* ── Hero ──────────────────────────────────────────── */}
            <section style={{
                textAlign: 'center',
                padding: '80px 24px 72px',
                maxWidth: '860px',
                margin: '0 auto',
                animation: 'slideUp 0.6s cubic-bezier(0.4,0,0.2,1)',
            }}>
                {/* Top Badge */}
                <div className="hero-badge">
                    <span style={{ fontSize: '16px' }}>🇮🇳</span>
                    Prime Minister Internship Scheme 2024
                </div>

                {/* Heading */}
                <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(40px, 7vw, 72px)',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: '-1.5px',
                    marginBottom: '22px',
                    color: 'var(--text-primary)',
                }}>
                    India's Smartest{' '}
                    <span className="gradient-text-s">Internship</span>
                    <br />
                    Matching Platform
                </h1>

                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '18px',
                    maxWidth: '560px',
                    margin: '0 auto 40px',
                    lineHeight: 1.75,
                    fontWeight: 400,
                }}>
                    Connecting college talent with leading companies through{' '}
                    <strong style={{ color: 'var(--amber-dark)', fontWeight: 700 }}>AI-powered skill matching</strong>
                    {' '}&amp; intelligent screening — built for Bharat.
                </p>

                {/* Feature Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '48px' }}>
                    {[
                        { icon: '⚡', label: 'Skill-Based Matching' },
                        { icon: '📝', label: 'MCQ Screening Test' },
                        { icon: '⭐', label: 'Merit Recommendation' },
                        { icon: '🔒', label: 'Secure & Verified' },
                    ].map(f => (
                        <span key={f.label} className="feature-pill">
                            <span>{f.icon}</span> {f.label}
                        </span>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        className="btn btn-primary"
                        style={{ width: 'auto', padding: '14px 32px', fontSize: '15px' }}
                        onClick={() => navigate('/student/login')}
                    >
                        🎓 I'm a Student →
                    </button>
                    <button
                        className="btn btn-secondary"
                        style={{ padding: '14px 32px', fontSize: '15px' }}
                        onClick={() => navigate('/company/login')}
                    >
                        🏢 I'm a Company →
                    </button>
                </div>
            </section>

            {/* ── Warm Divider ──────────────────────────────────── */}
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
                <div className="warm-divider" />
            </div>

            {/* ── Role Cards ────────────────────────────────────── */}
            <section style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '8px 24px 72px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                gap: '24px',
                animation: 'fadeUp 0.6s ease 0.15s both',
            }}>
                {/* Student Card */}
                <RoleCard
                    emoji="🎓"
                    emojiGradient="linear-gradient(135deg, #c46b10, #e8821a)"
                    label="For Students"
                    title="Find Your Dream Internship"
                    titleColor="var(--amber-dark)"
                    borderAccent="rgba(232,130,26,0.35)"
                    bgHover="rgba(232,130,26,0.04)"
                    description="Get matched to top companies based on your skills. Take an AI-powered screening test and become a recommended candidate."
                    stats={[
                        { value: 'AI', label: 'Matching' },
                        { value: '10m', label: 'Test' },
                        { value: '60%', label: 'Pass Mark' },
                    ]}
                    primaryAction={{ label: '→ Student Login', onClick: () => navigate('/student/login'), className: 'btn btn-primary' }}
                    secondaryAction={{ label: 'New here? Register', onClick: () => navigate('/student/register'), className: 'btn btn-outline' }}
                />

                {/* Company Card */}
                <RoleCard
                    emoji="🏢"
                    emojiGradient="linear-gradient(135deg, #a04028, #c0513a)"
                    label="For Companies"
                    title="Hire Pre-Screened Talent"
                    titleColor="var(--terracotta)"
                    borderAccent="rgba(192,81,58,0.35)"
                    bgHover="rgba(192,81,58,0.04)"
                    description="Discover skill-matched, pre-screened interns instantly. View match scores, test results, and recommended priority candidates."
                    stats={[
                        { value: '∞', label: 'Candidates' },
                        { value: 'Live', label: 'Results' },
                        { value: 'Top', label: 'Talent' },
                    ]}
                    primaryAction={{ label: '→ Company Login', onClick: () => navigate('/company/login'), className: 'btn btn-secondary' }}
                    secondaryAction={{ label: 'New here? Register', onClick: () => navigate('/company/register'), className: 'btn btn-outline' }}
                />
            </section>

            {/* ── How It Works ──────────────────────────────────── */}
            <section style={{
                background: 'var(--bg-section)',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                padding: '64px 24px',
            }}>
                <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <div style={{
                            display: 'inline-block',
                            background: 'var(--amber-soft)',
                            border: '1px solid var(--border-amber)',
                            borderRadius: '6px',
                            padding: '4px 12px',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: 'var(--amber-dark)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            marginBottom: '14px',
                        }}>How It Works</div>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '32px', fontWeight: 700,
                            color: 'var(--text-primary)', letterSpacing: '-0.5px'
                        }}>
                            Three Steps to Your Internship
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                        {[
                            { step: '01', icon: '📋', title: 'Register & Add Skills', desc: 'Create your profile and list your technical skills — we do the rest.' },
                            { step: '02', icon: '🤖', title: 'AI Matches Companies', desc: 'Our algorithm ranks the best-fit companies based on your skill overlap.' },
                            { step: '03', icon: '🏆', title: 'Test & Get Recommended', desc: 'Score ≥60% on the MCQ test and become a Recommended candidate.' },
                        ].map(s => (
                            <div key={s.step} style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                padding: '28px 24px',
                                position: 'relative',
                                boxShadow: 'var(--shadow-xs)',
                                transition: 'var(--transition)',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; }}
                            >
                                <div style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: '36px', fontWeight: 800,
                                    color: 'var(--border)',
                                    lineHeight: 1, marginBottom: '12px',
                                }}>{s.step}</div>
                                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{s.icon}</div>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{s.title}</h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Footer ────────────────────────────────────────── */}
            <footer className="footer" style={{ marginTop: 0 }}>
                <p style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    🇮🇳 InternConnect · PM Internship Scheme Enhancement
                </p>
                <p>© 2024 · Built for India · Empowering the next generation of talent</p>
            </footer>
        </div>
    );
}

function RoleCard({ emoji, emojiGradient, label, title, titleColor, borderAccent, bgHover, description, stats, primaryAction, secondaryAction }) {
    const [hovered, setHovered] = React.useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? bgHover : 'var(--bg-card)',
                border: `1px solid ${hovered ? borderAccent : 'var(--border)'}`,
                borderRadius: '20px',
                padding: '32px',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                transform: hovered ? 'translateY(-6px)' : 'none',
                boxShadow: hovered ? `0 20px 56px ${bgHover}, var(--shadow)` : 'var(--shadow-card)',
            }}
        >
            {/* Label */}
            <div style={{
                display: 'inline-block',
                background: 'var(--bg-section)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '3px 10px',
                fontSize: '10px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '20px',
            }}>{label}</div>

            {/* Emoji Icon */}
            <div style={{
                width: '62px', height: '62px',
                background: emojiGradient,
                borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '26px', marginBottom: '18px',
                boxShadow: '0 6px 20px rgba(45,31,14,0.15)',
                transition: 'all 0.3s ease',
                transform: hovered ? 'scale(1.07) rotate(-3deg)' : 'none',
            }}>
                {emoji}
            </div>

            {/* Title */}
            <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '22px', fontWeight: 700,
                color: titleColor,
                marginBottom: '10px', letterSpacing: '-0.2px'
            }}>
                {title}
            </h2>

            {/* Description */}
            <p style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: 1.75,
                marginBottom: '24px'
            }}>
                {description}
            </p>

            {/* Mini Stats */}
            <div style={{
                display: 'flex', gap: '0',
                background: 'var(--bg-warm)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '22px'
            }}>
                {stats.map((s, i) => (
                    <div key={s.label} style={{
                        flex: 1, textAlign: 'center', padding: '12px 8px',
                        borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none'
                    }}>
                        <div style={{ fontSize: '15px', fontWeight: 900, color: titleColor, letterSpacing: '-0.3px', fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px', fontWeight: 700 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button className={primaryAction.className} onClick={primaryAction.onClick}>{primaryAction.label}</button>
                <button className={secondaryAction.className} onClick={secondaryAction.onClick}>{secondaryAction.label}</button>
            </div>
        </div>
    );
}
