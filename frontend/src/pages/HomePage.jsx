import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="page-center" style={{ flexDirection: 'column', minHeight: '100vh', padding: '40px 24px' }}>

            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '60px', animation: 'slideUp 0.6s cubic-bezier(0.4,0,0.2,1)' }}>

                {/* Top Badge */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(16,185,129,0.08))',
                    border: '1px solid rgba(245,158,11,0.25)',
                    padding: '8px 20px', borderRadius: '40px',
                    fontSize: '11px', color: '#fcd34d', fontWeight: 700,
                    marginBottom: '28px', letterSpacing: '0.1em', textTransform: 'uppercase'
                }}>
                    <span style={{ fontSize: '14px' }}>🇮🇳</span>
                    Prime Minister Internship Scheme 2024
                </div>

                {/* Main Heading */}
                <h1 style={{
                    fontSize: 'clamp(42px, 7vw, 76px)',
                    fontWeight: 900,
                    lineHeight: 1.05,
                    letterSpacing: '-2px',
                    marginBottom: '20px'
                }}>
                    <span className="gradient-text-s">Intern</span>
                    <span style={{ color: '#f0f4ff' }}>Connect</span>
                    <br />
                    <span style={{
                        fontSize: '0.42em',
                        fontWeight: 600,
                        letterSpacing: '-0.5px',
                        color: 'var(--text-secondary)',
                        display: 'block',
                        marginTop: '12px'
                    }}>
                        Smart Internship Matching Platform
                    </span>
                </h1>

                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '17px',
                    maxWidth: '520px',
                    margin: '0 auto 36px',
                    lineHeight: 1.7,
                    fontWeight: 400
                }}>
                    Connecting India's brightest college talent with leading companies through <strong style={{ color: 'var(--saffron-light)', fontWeight: 700 }}>AI-powered skill matching</strong> & intelligent screening.
                </p>

                {/* Feature Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    {[
                        { icon: '⚡', label: 'Skill-Based Matching' },
                        { icon: '📝', label: 'MCQ Screening' },
                        { icon: '⭐', label: 'Recommendation Engine' },
                        { icon: '🔒', label: 'Secure Platform' },
                    ].map(f => (
                        <span key={f.label} className="feature-pill">
                            <span>{f.icon}</span> {f.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                width: '100%',
                maxWidth: '760px',
                animation: 'fadeUp 0.6s ease 0.15s both'
            }}>
                {/* Student Card */}
                <RoleCard
                    icon="🎓"
                    iconBg="linear-gradient(135deg, #92400e, #d97706)"
                    title="I'm a Student"
                    titleColor="var(--saffron)"
                    borderColor="rgba(245,158,11,0.3)"
                    glowColor="rgba(245,158,11,0.12)"
                    description="Find internships that match your skills. Take our AI-powered screening test & get recommended to top companies across India."
                    actions={[
                        { label: '→ Student Login', className: 'btn btn-primary', onClick: () => navigate('/student/login') },
                        { label: 'New? Register Here', className: 'btn btn-outline', onClick: () => navigate('/student/register') },
                    ]}
                    stats={[
                        { value: 'AI', label: 'Matching' },
                        { value: '10', label: 'Min Test' },
                        { value: '60%', label: 'Pass Mark' },
                    ]}
                />

                {/* Company Card */}
                <RoleCard
                    icon="🏢"
                    iconBg="linear-gradient(135deg, #4c1d95, #7c3aed)"
                    title="I'm a Company"
                    titleColor="var(--violet-light)"
                    borderColor="rgba(124,58,237,0.3)"
                    glowColor="rgba(124,58,237,0.1)"
                    description="Discover pre-screened, skill-matched interns instantly. View match scores, test results & recommended candidates."
                    actions={[
                        { label: '→ Company Login', className: 'btn btn-secondary', onClick: () => navigate('/company/login') },
                        { label: 'New? Register Here', className: 'btn btn-outline', onClick: () => navigate('/company/register') },
                    ]}
                    stats={[
                        { value: '∞', label: 'Candidates' },
                        { value: 'Live', label: 'Results' },
                        { value: 'Top', label: 'Talent' },
                    ]}
                />
            </div>

            {/* Admin + Footer */}
            <div style={{ marginTop: '48px', textAlign: 'center', animation: 'fadeUp 0.6s ease 0.3s both' }}>
                <button className="btn btn-outline" style={{ fontSize: '13px', opacity: 0.7 }} onClick={() => navigate('/admin')}>
                    ⚙️ Admin Panel
                </button>
                <p style={{ color: 'var(--text-dim)', fontSize: '12px', marginTop: '24px' }}>
                    © 2024 InternConnect · PM Internship Scheme · Built for India
                </p>
            </div>
        </div>
    );
}

function RoleCard({ icon, iconBg, title, titleColor, borderColor, glowColor, description, actions, stats }) {
    const [hovered, setHovered] = React.useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered
                    ? `linear-gradient(145deg, ${glowColor}, rgba(255,255,255,0.03))`
                    : 'rgba(255,255,255,0.03)',
                border: `1px solid ${hovered ? borderColor : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '20px',
                padding: '32px',
                cursor: 'default',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                transform: hovered ? 'translateY(-6px)' : 'none',
                boxShadow: hovered ? `0 20px 60px ${glowColor}, 0 0 0 1px ${borderColor}` : '0 4px 20px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(12px)',
            }}
        >
            {/* Icon */}
            <div style={{
                width: '64px', height: '64px',
                background: iconBg,
                borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', marginBottom: '20px',
                boxShadow: `0 8px 24px rgba(0,0,0,0.3)`,
                transition: 'all 0.3s ease',
                transform: hovered ? 'scale(1.08) rotate(-3deg)' : 'none',
            }}>
                {icon}
            </div>

            {/* Title */}
            <h2 style={{
                fontSize: '22px',
                fontWeight: 800,
                color: titleColor,
                marginBottom: '10px',
                letterSpacing: '-0.3px'
            }}>
                {title}
            </h2>

            {/* Description */}
            <p style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: 1.7,
                marginBottom: '24px'
            }}>
                {description}
            </p>

            {/* Mini Stats */}
            <div style={{
                display: 'flex', gap: '0',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '24px'
            }}>
                {stats.map((s, i) => (
                    <div key={s.label} style={{
                        flex: 1, textAlign: 'center', padding: '12px 8px',
                        borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                    }}>
                        <div style={{ fontSize: '16px', fontWeight: 900, color: titleColor, letterSpacing: '-0.5px' }}>{s.value}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px', fontWeight: 700 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {actions.map(a => (
                    <button key={a.label} className={a.className} onClick={a.onClick}>{a.label}</button>
                ))}
            </div>
        </div>
    );
}
