
import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useBlog();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/editor');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="app-main-wrapper">
            <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <div style={{ flex: 1, display: 'grid', placeItems: 'center', padding: '20px' }}>
                    <div style={{ width: '100%', maxWidth: '400px', border: '1px solid #333', padding: '40px', background: 'rgba(5,5,5,0.95)' }}>
                        <div className="mono text-accent" style={{ marginBottom: '20px', textAlign: 'center' }}>SYSTEM_AUTH_PROTOCOL</div>

                        {error && <div style={{ color: 'red', marginBottom: '20px', fontFamily: 'monospace' }}>Error: {error}</div>}

                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label className="mono text-secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '10px' }}>IDENTIFIER (EMAIL)</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ width: '100%', background: '#111', border: '1px solid #333', color: 'white', padding: '10px', fontFamily: 'var(--font-mono)' }}
                                    required
                                />
                            </div>
                            <div>
                                <label className="mono text-secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '10px' }}>ACCESS_KEY (PASSWORD)</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ width: '100%', background: '#111', border: '1px solid #333', color: 'white', padding: '10px', fontFamily: 'var(--font-mono)' }}
                                    required
                                />
                            </div>
                            <button type="submit" style={{ background: 'var(--accent-color)', color: 'black', padding: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
                                AUTHENTICATE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
