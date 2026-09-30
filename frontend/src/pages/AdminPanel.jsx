import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addQuestion, getAllStudents, getAllCompanies, getAllQuestions, deleteQuestion } from '../utils/api';

const TABS = [
    { id: 'Add Question', icon: '➕', label: 'Add Question' },
    { id: 'Questions',    icon: '📚', label: 'Questions' },
    { id: 'Students',     icon: '🎓', label: 'Students' },
    { id: 'Companies',    icon: '🏢', label: 'Companies' },
];

export default function AdminPanel() {
    const [tab, setTab] = useState('Add Question');
    const [form, setForm] = useState({ skill: '', question: '', opt0: '', opt1: '', opt2: '', opt3: '', correctAnswer: '' });
    const [students, setStudents] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [addLoading, setAddLoading] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const [sRes, cRes, qRes] = await Promise.all([getAllStudents(), getAllCompanies(), getAllQuestions()]);
            setStudents(sRes.data);
            setCompanies(cRes.data);
            setQuestions(qRes.data);
        } catch { /* silent */ }
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const handleFormChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAddQuestion = async e => {
        e.preventDefault();
        setMsg(''); setError('');
        const options = [form.opt0, form.opt1, form.opt2, form.opt3];
        if (!options.includes(form.correctAnswer)) {
            setError('Correct answer must match one of the 4 options exactly.'); return;
        }
        setAddLoading(true);
        try {
            await addQuestion({ skill: form.skill, question: form.question, options, correctAnswer: form.correctAnswer });
            setMsg('Question added successfully!');
            setForm({ skill: '', question: '', opt0: '', opt1: '', opt2: '', opt3: '', correctAnswer: '' });
            loadData();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add question.');
        } finally {
            setAddLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this question?')) return;
        await deleteQuestion(id);
        loadData();
    };

    const recommendedCount = students.filter(s => s.recommended).length;

    return (
        <div className="dashboard-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="brand">
                    <span>⚙️</span> Admin <span className="accent">Panel</span>
                </div>
                <div className="nav-right">
                    <Link to="/" className="btn btn-outline" style={{ fontSize: '13px', padding: '8px 18px' }}>
                        ← Back to Home
                    </Link>
                </div>
            </nav>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '36px 24px' }}>

                {/* Stats Overview */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px',
                    marginBottom: '32px', animation: 'fadeUp 0.4s ease both'
                }}>
                    <div className="stat-card" style={{ borderTop: '3px solid var(--amber)' }}>
                        <div className="stat-num">{students.length}</div>
                        <div className="stat-label">Total Students</div>
                    </div>
                    <div className="stat-card" style={{ borderTop: '3px solid var(--sage)' }}>
                        <div className="stat-num" style={{ color: 'var(--sage)' }}>{recommendedCount}</div>
                        <div className="stat-label">Recommended</div>
                    </div>
                    <div className="stat-card" style={{ borderTop: '3px solid var(--terracotta)' }}>
                        <div className="stat-num" style={{ color: 'var(--terracotta)' }}>{companies.length}</div>
                        <div className="stat-label">Companies</div>
                    </div>
                    <div className="stat-card" style={{ borderTop: '3px solid var(--amber-dark)' }}>
                        <div className="stat-num" style={{ color: 'var(--amber-dark)' }}>{questions.length}</div>
                        <div className="stat-label">Questions</div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div style={{
                    display: 'flex', gap: '6px', marginBottom: '24px', flexWrap: 'wrap',
                    background: 'var(--bg-warm)', border: '1px solid var(--border)',
                    borderRadius: '14px', padding: '6px'
                }}>
                    {TABS.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            style={{
                                flex: 1, padding: '10px 16px', borderRadius: '10px',
                                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                                fontSize: '13px', fontWeight: 700,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                                transition: 'all 0.2s',
                                background: tab === t.id ? 'var(--amber)' : 'transparent',
                                color: tab === t.id ? '#fff' : 'var(--text-secondary)',
                                boxShadow: tab === t.id ? '0 4px 14px var(--amber-glow)' : 'none'
                            }}
                        >
                            <span>{t.icon}</span> {t.label}
                        </button>
                    ))}
                </div>

                {/* ── Add Question Tab ── */}
                {tab === 'Add Question' && (
                    <div className="card animate-fade-up" style={{ maxWidth: '660px' }}>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '22px', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.3px',
                            color: 'var(--text-primary)'
                        }}>
                            Add New Question
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                            Questions will be used in skill-based screening tests
                        </p>

                        {msg && (
                            <div className="alert alert-success">
                                <span>✅</span> {msg}
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-error">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleAddQuestion}>
                            <div className="form-group">
                                <label>Skill Tag</label>
                                <div className="input-icon-wrap">
                                    <span className="icon">🏷️</span>
                                    <input name="skill" placeholder="e.g. python, react, mongodb"
                                        value={form.skill} onChange={handleFormChange} required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Question</label>
                                <textarea name="question" placeholder="What is the output of print(type([]))?..."
                                    value={form.question} onChange={handleFormChange} required rows={2} />
                            </div>

                            <div className="grid-2" style={{ gap: '14px' }}>
                                {['opt0', 'opt1', 'opt2', 'opt3'].map((k, i) => (
                                    <div className="form-group" key={k} style={{ marginBottom: 0 }}>
                                        <label>Option {['A', 'B', 'C', 'D'][i]}</label>
                                        <input name={k} placeholder={`Option ${['A', 'B', 'C', 'D'][i]}`}
                                            value={form[k]} onChange={handleFormChange} required />
                                    </div>
                                ))}
                            </div>

                            <div className="form-group" style={{ marginTop: '18px' }}>
                                <label>Correct Answer</label>
                                <div className="input-icon-wrap">
                                    <span className="icon">✅</span>
                                    <input name="correctAnswer" placeholder="Must exactly match one of the options above"
                                        value={form.correctAnswer} onChange={handleFormChange} required />
                                </div>
                            </div>

                            <button className="btn btn-primary" type="submit" disabled={addLoading} style={{ marginTop: '6px' }}>
                                {addLoading ? (
                                    <>
                                        <span style={{
                                            width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)',
                                            borderTopColor: '#fff', borderRadius: '50%',
                                            animation: 'spin 0.75s linear infinite', display: 'inline-block'
                                        }} />
                                        Adding...
                                    </>
                                ) : '➕ Add Question'}
                            </button>
                        </form>
                    </div>
                )}

                {/* ── Questions Tab ── */}
                {tab === 'Questions' && (
                    <div className="card animate-fade-up">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '22px', fontWeight: 700, letterSpacing: '-0.3px',
                                color: 'var(--text-primary)'
                            }}>
                                Question Bank
                            </h2>
                            <span className="badge badge-skill" style={{ fontSize: '13px', padding: '5px 14px' }}>
                                {questions.length} questions
                            </span>
                        </div>
                        {loading ? <div className="spinner" /> : (
                            <div className="grid-1" style={{ maxHeight: '560px', overflowY: 'auto', paddingRight: '4px' }}>
                                {questions.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                        No questions added yet. Use the "Add Question" tab.
                                    </div>
                                ) : questions.map(q => (
                                    <div key={q._id} className="card-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>
                                            <span className="badge badge-skill" style={{ marginBottom: '10px', display: 'inline-flex' }}>{q.skill}</span>
                                            <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '10px', lineHeight: 1.55, color: 'var(--text-primary)' }}>{q.question}</p>
                                            <div className="skills-wrap">
                                                {q.options.map(o => (
                                                    <span key={o} className="badge" style={{
                                                        background: o === q.correctAnswer ? 'var(--sage-soft)' : 'var(--bg-warm)',
                                                        color: o === q.correctAnswer ? 'var(--sage)' : 'var(--text-secondary)',
                                                        border: `1px solid ${o === q.correctAnswer ? 'var(--border-sage)' : 'var(--border)'}`,
                                                        fontSize: '11px', padding: '3px 10px'
                                                    }}>{o}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="btn btn-danger" onClick={() => handleDelete(q._id)} style={{ flexShrink: 0 }}>
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── Students Tab ── */}
                {tab === 'Students' && (
                    <div className="card animate-fade-up">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '22px', fontWeight: 700, letterSpacing: '-0.3px',
                                color: 'var(--text-primary)'
                            }}>All Students</h2>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <span className="badge badge-skill" style={{ fontSize: '12px', padding: '4px 12px' }}>{students.length} total</span>
                                <span className="badge badge-recommended" style={{ fontSize: '12px', padding: '4px 12px' }}>{recommendedCount} recommended</span>
                            </div>
                        </div>
                        {loading ? <div className="spinner" /> : (
                            <div style={{ overflowX: 'auto' }}>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>College</th>
                                            <th>Skills</th>
                                            <th>Test Score</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map(s => (
                                            <tr key={s._id}>
                                                <td style={{ fontWeight: 700 }}>{s.name}</td>
                                                <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{s.email}</td>
                                                <td style={{ fontSize: '13px' }}>{s.college}</td>
                                                <td>
                                                    <div className="skills-wrap" style={{ marginTop: 0 }}>
                                                        {s.skills.map(sk => <span key={sk} className="badge badge-skill">{sk}</span>)}
                                                    </div>
                                                </td>
                                                <td style={{
                                                    fontWeight: 800, fontSize: '15px',
                                                    color: s.testScore >= 60 ? 'var(--sage)' : 'var(--terracotta)'
                                                }}>
                                                    {s.testScore}%
                                                </td>
                                                <td>
                                                    {s.recommended
                                                        ? <span className="badge badge-recommended">⭐ Recommended</span>
                                                        : <span className="badge badge-pending">⏳ Pending</span>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {students.length === 0 && (
                                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '32px' }}>No students registered yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* ── Companies Tab ── */}
                {tab === 'Companies' && (
                    <div className="card animate-fade-up">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '22px', fontWeight: 700, letterSpacing: '-0.3px',
                                color: 'var(--text-primary)'
                            }}>All Companies</h2>
                            <span className="badge badge-skill" style={{ fontSize: '12px', padding: '4px 12px' }}>{companies.length} total</span>
                        </div>
                        {loading ? <div className="spinner" /> : (
                            <div style={{ overflowX: 'auto' }}>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Company</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Required Skills</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companies.map(c => (
                                            <tr key={c._id}>
                                                <td style={{ fontWeight: 700 }}>{c.companyName}</td>
                                                <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{c.email}</td>
                                                <td style={{ fontSize: '13px', fontWeight: 500 }}>{c.internshipRole}</td>
                                                <td>
                                                    <div className="skills-wrap" style={{ marginTop: 0 }}>
                                                        {c.requiredSkills.map(s => <span key={s} className="badge badge-skill">{s}</span>)}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {companies.length === 0 && (
                                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '32px' }}>No companies registered yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
