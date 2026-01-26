import React, { useState } from 'react';
import Header from '../Header';
import '../index.css';
import { useBlog } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';

const EnforcementBypass = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useBlog();
    const navigate = useNavigate();

    const [logs, setLogs] = useState([
        { text: "[SYSTEM] INITIALIZING BYPASS SEQUENCE... SUCCESS", color: "#00ff00" },
        { text: "[SYSTEM] LOCATING PACKET FRAGMENTS IN SECTOR 7G...", color: "#888" },
        { text: "[CRITICAL] ENFORCEMENT DETECTION LEVEL AT 84%. IMMINENT TRACE INITIATED. REQUIRE BYPASS_PROTOCOL_KEYS TO CONTINUE.", color: "#ff3333" },
        { text: "[SYSTEM] AWAITING INPUT", color: "#888", cursor: true }
    ]);

    const stats = [
        { label: "PACKET_LOSS", value: "0.002%" },
        { label: "LATENCY", value: "14ms" },
        { label: "NODE_COUNT", value: "1,204" },
        { label: "UPTIME", value: "99.9%" }
    ];

    const handleLogin = async () => {
        try {
            setLogs(prev => [...prev.slice(0, -1), { text: `[SYSTEM] ACCESS_TOKEN_HASH RECEIVED... VERIFYING...`, color: "#00f0ff" }]);

            await login(email, password);

            setLogs(prev => [...prev, { text: `[SYSTEM] ACCESS GRANTED. REDIRECTING TO EDITOR_NODE...`, color: "#00ff00" }]);
            setTimeout(() => {
                navigate('/editor');
            }, 1000);

        } catch (err) {
            setError(err.message);
            setLogs(prev => [...prev, { text: `[ERROR] AUTHENTICATION FAILED: ${err.message.toUpperCase()}`, color: "red" }, { text: "[SYSTEM] AWAITING INPUT", color: "#888", cursor: true }]);
        }
    };

    return (
        <div className="app-main-wrapper" style={{ alignItems: 'flex-start', paddingTop: 0, overflow: 'hidden' }}>
            <div className="app-layout" style={{ minHeight: '100vh', border: 'none', position: 'relative', display: 'flex', flexDirection: 'column' }}>

                <Header />

                {/* Main Content Grid */}
                <div className="enforcement-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
                    flex: 1,
                    height: 'calc(100vh - 60px)',
                    position: 'relative'
                }}>

                    {/* Background Grid Lines (Absolute) */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0,
                        backgroundSize: '40px 40px',
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
                    }}></div>

                    {/* Left Panel */}
                    <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ marginBottom: '40px' }}>
                            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', marginBottom: '10px', letterSpacing: '2px' }}>RESTRICTED_ACCESS</h1>
                            <div className="mono" style={{ fontSize: '0.8rem', color: '#666' }}>AUTHORIZED_PERSONNEL_ONLY // ENFORCEMENT_PROTOCOL_ACTIVE</div>
                        </div>

                        {/* Terminal Box */}
                        <div className="terminal-box" style={{
                            background: 'rgba(10, 15, 25, 0.6)',
                            border: '1px solid rgba(100, 149, 237, 0.2)',
                            padding: '30px',
                            flex: 1,
                            marginBottom: '40px',
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                            lineHeight: '1.8',
                            overflow: 'hidden'
                        }}>
                            {logs.map((log, i) => (
                                <div key={i} style={{ color: log.color, marginBottom: '10px', wordBreak: 'break-word' }}>
                                    {log.text} {log.cursor && <span className="blinking-cursor">_</span>}
                                </div>
                            ))}
                        </div>

                        {/* Stats Row */}
                        <div className="stats-row" style={{ display: 'flex', gap: '20px' }}>
                            {stats.map((stat, i) => (
                                <div key={i} style={{
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '15px 20px',
                                    flex: 1,
                                    background: 'black',
                                    minWidth: '120px'
                                }}>
                                    <div className="mono" style={{ fontSize: '0.6rem', color: '#666', marginBottom: '5px' }}>{stat.label}</div>
                                    <div className="mono" style={{ fontSize: '1.2rem', color: 'white' }}>{stat.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Info */}
                        <div className="mono" style={{ position: 'absolute', bottom: '20px', left: '60px', fontSize: '0.6rem', color: '#444' }}>
                            © 2052 PIXY_NETWORKS   SYSTEM_STATUS: NOMINAL
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>

                        <div style={{
                            border: '1px solid rgba(255,255,255,0.1)',
                            padding: '40px',
                            background: '#050505'
                        }}>
                            <div className="mono" style={{ fontSize: '1rem', color: '#888', letterSpacing: '2px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '40px' }}>
                                BYPASS_PROTOCOL
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label className="mono" style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '10px' }}>ACCESS_TOKEN_HASH (EMAIL)</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="user@pixy.sys"
                                    style={{
                                        width: '100%', background: 'black', border: '1px solid #333', padding: '15px', color: 'white', fontFamily: 'monospace', outline: 'none'
                                    }} />
                            </div>

                            <div style={{ marginBottom: '40px' }}>
                                <label className="mono" style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '10px' }}>SYNAPSE_KEY_SIGNATURE (PASSWORD)</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="............"
                                    style={{
                                        width: '100%', background: 'black', border: '1px solid #333', padding: '15px', color: 'white', fontFamily: 'monospace', outline: 'none'
                                    }} />
                            </div>

                            <button onClick={handleLogin} style={{
                                width: '100%', background: '#5a6b7c', color: 'white', border: 'none', padding: '20px',
                                fontFamily: 'monospace', letterSpacing: '2px', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 'bold'
                            }}>
                                EXECUTE_BYPASS_001
                            </button>

                            <div style={{ marginTop: '40px', borderLeft: '2px solid #ff3333', paddingLeft: '15px' }}>
                                <div style={{ color: '#ff3333', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '5px' }}>⚠ ENFORCEMENT_WARNING_LVL_03</div>
                                <p style={{ color: '#cc4444', fontSize: '0.65rem', lineHeight: '1.5' }} className="mono">
                                    Detection of illegal packet redirection will lead to immediate node termination and hardware blacklisting. All attempts are logged via encrypted neural-link.
                                </p>
                            </div>

                        </div>

                        {/* Bottom Info Right */}
                        <div className="mono" style={{ position: 'absolute', bottom: '20px', right: '40px', fontSize: '0.6rem', color: '#444', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div>CURRENT_SECTOR <span style={{ marginLeft: '20px', color: '#666' }}>TERRA_01_WEST</span></div>
                            <div>ENCRYPTION_LAYER <span style={{ marginLeft: '20px', color: '#666' }}>AES-4096-QUANTUM</span></div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default EnforcementBypass;
