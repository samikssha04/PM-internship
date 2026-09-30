import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Results() {
    const navigate = useNavigate();
    const location = useLocation();
    const result = location.state?.result;
    const auto = location.state?.auto;

    if (!result) { navigate('/student/dashboard'); return null; }

    const pass = result.score >= 60;
    const wrongCount = result.total - result.correct;
    const percentage = result.score;

    return (
        <div className="page-center" style={{ flexDirection: 'column', padding: '40px 24px' }}>
            {/* Ambient */}
            <div style={{
                position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '600px', height: '600px', borderRadius: '50%', pointerEvents: 'none',
                background: `radial-gradient(circle, ${pass ? 'rgba(16,185,129,0.06)' : 'rgba(244,63,94,0.06)'} 0%, transparent 70%)`
            }} />

            <div className="auth-card animate-fade-up" style={{ maxWidth: '500px', textAlign: 'center', position: 'relative' }}>

                {/* Auto-submit notice */}
                {auto && (
                    <div className="alert alert-error" style={{ marginBottom: '24px' }}>
                        <span>⏰</span> Time's up! Your test was auto-submitted.
                    </div>
                )}

                {/* Result label */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: pass ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)',
                    border: `1px solid ${pass ? 'rgba(16,185,129,0.25)' : 'rgba(244,63,94,0.25)'}`,
                    padding: '6px 18px', borderRadius: '40px',
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: pass ? 'var(--emerald-light)' : 'var(--rose-light)',
                    marginBottom: '24px'
                }}>
                    {pass ? '✅ Test Passed' : '❌ Test Failed'}
                </div>

                {/* Score Circle */}
                <div className={`score-circle ${pass ? 'pass' : 'fail'}`} style={{ marginBottom: '28px' }}>
                    <div className="score-num">{result.score}%</div>
                    <div className="score-label">Your Score</div>
                </div>

                {/* Message */}
                <div style={{
                    padding: '20px 24px',
                    borderRadius: '14px', marginBottom: '24px',
                    background: pass ? 'rgba(16,185,129,0.07)' : 'rgba(244,63,94,0.07)',
                    border: `1px solid ${pass ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'}`
                }}>
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>{pass ? '🎉' : '💪'}</div>
                    <h2 style={{
                        fontSize: '22px', fontWeight: 800, marginBottom: '10px', letterSpacing: '-0.3px',
                        color: pass ? 'var(--emerald-light)' : 'var(--rose-light)'
                    }}>
                        {pass ? 'Congratulations!' : 'Keep Going!'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.65 }}>
                        {pass
                            ? "You've been marked as a Recommended candidate! Companies can now find you as a priority pick."
                            : `You scored ${result.score}%. A score ≥ 60% is needed to be Recommended. Apply again to retake the test!`
                        }
                    </p>
                </div>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                    <div className="stat-card">
                        <div className="stat-num" style={{ color: 'var(--emerald)', fontSize: '26px' }}>{result.correct}</div>
                        <div className="stat-label">Correct</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-num" style={{ color: 'var(--rose)', fontSize: '26px' }}>{wrongCount}</div>
                        <div className="stat-label">Wrong</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-num" style={{ fontSize: '26px' }}>{result.total}</div>
                        <div className="stat-label">Total</div>
                    </div>
                </div>

                {/* Status Badge */}
                <div style={{ marginBottom: '28px' }}>
                    {result.recommended ? (
                        <div className="badge badge-recommended" style={{ fontSize: '13px', padding: '9px 24px', width: '100%', justifyContent: 'center', borderRadius: '10px' }}>
                            ⭐ RECOMMENDED CANDIDATE
                        </div>
                    ) : (
                        <div className="badge badge-pending" style={{ fontSize: '13px', padding: '9px 24px', width: '100%', justifyContent: 'center', borderRadius: '10px' }}>
                            ⏳ NOT RECOMMENDED YET
                        </div>
                    )}
                </div>

                <button className="btn btn-primary" onClick={() => navigate('/student/dashboard')}>
                    🏠 Back to Dashboard
                </button>
            </div>
        </div>
    );
}
