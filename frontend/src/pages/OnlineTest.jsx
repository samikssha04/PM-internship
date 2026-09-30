import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchQuestions, submitTest } from '../utils/api';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function OnlineTest() {
    const navigate = useNavigate();
    const location = useLocation();
    const company = location.state?.company;

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(600);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [current, setCurrent] = useState(0);
    const [error, setError] = useState('');

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleSubmit = useCallback(async (auto = false) => {
        if (submitting) return;
        setSubmitting(true);
        try {
            const payload = {
                studentId: user.id || user._id,
                answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({ questionId, selectedAnswer }))
            };
            const res = await submitTest(payload);
            const updated = { ...user, testScore: res.data.score, recommended: res.data.recommended };
            localStorage.setItem('user', JSON.stringify(updated));
            navigate('/results', { state: { result: res.data, auto } });
        } catch {
            setError('Submission failed. Please try again.');
            setSubmitting(false);
        }
    }, [submitting, answers, user, navigate]);

    useEffect(() => {
        const load = async () => {
            try {
                const id = user.id || user._id;
                const res = await fetchQuestions(id);
                setQuestions(res.data);
            } catch {
                setError('Failed to load questions. Please go back and try again.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    useEffect(() => {
        if (loading) return;
        const interval = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) { clearInterval(interval); handleSubmit(true); return 0; }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [loading, handleSubmit]);

    const formatTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    const danger = timeLeft < 60;
    const selectAnswer = (qId, option) => setAnswers(prev => ({ ...prev, [qId]: option }));

    if (loading) return (
        <div className="dashboard-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div className="spinner" />
                <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '14px' }}>Loading questions...</p>
            </div>
        </div>
    );

    const q = questions[current];
    const answered = Object.keys(answers).length;
    const progress = questions.length ? ((current + 1) / questions.length) * 100 : 0;

    return (
        <div className="dashboard-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="brand">
                    <span>📝</span> Screening Test
                </div>
                <div className="nav-right">
                    {company && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                            padding: '6px 14px', borderRadius: '40px', fontSize: '13px', color: 'var(--text-secondary)',
                            fontWeight: 600
                        }}>
                            🏢 {company.companyName}
                        </div>
                    )}
                    <div className={`timer-ring ${danger ? 'danger' : ''}`}>{formatTime(timeLeft)}</div>
                </div>
            </nav>

            <div style={{ maxWidth: '780px', margin: '0 auto', padding: '32px 24px' }}>

                {/* Progress Section */}
                <div style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                    borderRadius: '16px', padding: '20px 24px', marginBottom: '24px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div>
                            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                                Question <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>{current + 1}</strong> of {questions.length}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
                            <span style={{ color: 'var(--emerald)', fontWeight: 700 }}>✓ {answered} answered</span>
                            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{questions.length - answered} remaining</span>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="progress-bar-wrap" style={{ height: '8px', marginTop: 0 }}>
                        <div className="progress-bar-fill fill-high" style={{ width: `${progress}%` }} />
                    </div>

                    {/* Question dot navigation */}
                    <div style={{ display: 'flex', gap: '7px', marginTop: '16px', flexWrap: 'wrap' }}>
                        {questions.map((q2, idx) => {
                            const isAnswered = !!answers[q2.id];
                            const isCurrent = idx === current;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrent(idx)}
                                    style={{
                                        width: '34px', height: '34px', borderRadius: '8px', cursor: 'pointer',
                                        border: isCurrent ? '2px solid var(--saffron)' : '1px solid var(--border)',
                                        fontSize: '12px', fontWeight: 800, fontFamily: 'inherit',
                                        background: isAnswered
                                            ? 'linear-gradient(135deg, #059669, #10b981)'
                                            : isCurrent
                                                ? 'rgba(245,158,11,0.15)'
                                                : 'rgba(255,255,255,0.04)',
                                        color: isAnswered ? '#fff' : isCurrent ? 'var(--saffron)' : 'var(--text-muted)',
                                        transition: 'all 0.15s'
                                    }}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {error && <div className="alert alert-error"><span>⚠️</span> {error}</div>}

                {/* Question Card */}
                {q && (
                    <div className="card animate-fade-up" style={{ padding: '32px' }}>
                        {/* Skill Tag */}
                        <div style={{ marginBottom: '16px' }}>
                            <span className="badge badge-skill" style={{ fontSize: '12px', padding: '5px 14px' }}>
                                🏷️ {q.skill}
                            </span>
                        </div>

                        {/* Question */}
                        <h2 style={{
                            fontSize: '18px', fontWeight: 700, marginBottom: '28px',
                            lineHeight: 1.6, color: 'var(--text-primary)'
                        }}>
                            <span style={{ color: 'var(--saffron)', fontWeight: 800, marginRight: '8px' }}>
                                Q{current + 1}.
                            </span>
                            {q.question}
                        </h2>

                        {/* Options */}
                        <div>
                            {q.options.map((opt, oi) => {
                                const isSelected = answers[q.id] === opt;
                                return (
                                    <button
                                        key={oi}
                                        className={`option-btn ${isSelected ? 'selected' : ''}`}
                                        onClick={() => selectAnswer(q.id, opt)}
                                    >
                                        <span style={{
                                            width: '28px', height: '28px', borderRadius: '7px', flexShrink: 0,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: isSelected ? 'var(--violet)' : 'rgba(255,255,255,0.07)',
                                            color: isSelected ? '#fff' : 'var(--text-muted)',
                                            fontSize: '12px', fontWeight: 800, transition: 'all 0.15s'
                                        }}>
                                            {LETTERS[oi]}
                                        </span>
                                        <span>{opt}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Navigation */}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '28px', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button
                                className="btn btn-outline"
                                onClick={() => setCurrent(c => Math.max(0, c - 1))}
                                disabled={current === 0}
                            >
                                ← Previous
                            </button>

                            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
                                {answered}/{questions.length} answered
                            </span>

                            {current < questions.length - 1 ? (
                                <button className="btn btn-secondary" onClick={() => setCurrent(c => c + 1)}>
                                    Next →
                                </button>
                            ) : (
                                <button
                                    className="btn btn-green"
                                    onClick={() => handleSubmit(false)}
                                    disabled={submitting}
                                    style={{ minWidth: '180px' }}
                                >
                                    {submitting ? (
                                        <>
                                            <span style={{
                                                width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)',
                                                borderTopColor: '#fff', borderRadius: '50%',
                                                animation: 'spin 0.75s linear infinite', display: 'inline-block'
                                            }} />
                                            Submitting...
                                        </>
                                    ) : `✅ Submit Test`}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
