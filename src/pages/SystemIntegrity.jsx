import React, { useState, useEffect } from 'react';
import Header from '../Header';
import '../index.css';

const INTEGRITY_CHECKS = [
    { id: 'AUTH_01', module: 'AUTHENTICATION_GATEWAY', status: 'SECURE', load: 12 },
    { id: 'ENC_04', module: 'ENCRYPTION_PROTOCOL_AES', status: 'ACTIVE', load: 84 },
    { id: 'DAT_09', module: 'DATABASE_INTEGRITY', status: 'VERIFIED', load: 45 },
    { id: 'FIR_02', module: 'FIREWALL_MESH', status: 'CLOAKED', load: 91 },
    { id: 'SYN_01', module: 'SYNAPSE_LINK', status: 'STABLE', load: 33 },
    { id: 'MEM_0X', module: 'MEMORY_HEAP_ALLOC', status: 'OPTIMAL', load: 60 }
];

const SystemIntegrity = () => {
    const [checks, setChecks] = useState(INTEGRITY_CHECKS);
    const [scanning, setScanning] = useState(true);
    const [scanProgress, setScanProgress] = useState(0);

    // Simulate Scanning Process
    useEffect(() => {
        if (!scanning) return;

        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    setScanning(false);
                    return 100;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [scanning]);

    // Randomize load occasionally
    useEffect(() => {
        const interval = setInterval(() => {
            setChecks(prev => prev.map(check => ({
                ...check,
                load: Math.min(100, Math.max(0, check.load + (Math.random() * 10 - 5)))
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="app-main-wrapper" style={{ alignItems: 'flex-start', paddingTop: 0, overflow: 'hidden' }}>
            <div className="app-layout" style={{ minHeight: '100vh', border: 'none', position: 'relative', display: 'flex', flexDirection: 'column' }}>

                <Header />

                {/* Main Content */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(300px, 1fr) 2fr',
                    gap: '40px',
                    padding: '60px',
                    flex: 1
                }}>

                    {/* Left Panel: Overview */}
                    <div>
                        <div style={{ marginBottom: '40px' }}>
                            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', marginBottom: '10px', letterSpacing: '2px' }}>SYSTEM<br />INTEGRITY</h1>
                            <div className="mono" style={{ fontSize: '0.8rem', color: '#666' }}>DIAGNOSTIC_TOOL // V.4.0.2</div>
                        </div>

                        <div style={{ marginBottom: '40px' }}>
                            <div className="mono" style={{ fontSize: '0.7rem', color: '#888', marginBottom: '10px' }}>GLOBAL_STATUS</div>
                            <div style={{
                                fontSize: '1.5rem',
                                color: scanning ? '#ffcc00' : '#00ff00',
                                fontWeight: 'bold',
                                fontFamily: 'monospace'
                            }}>
                                {scanning ? 'SCANNING_IN_PROGRESS...' : 'ALL_SYSTEMS_NOMINAL'}
                            </div>
                        </div>

                        {scanning && (
                            <div style={{ marginBottom: '40px' }}>
                                <div className="mono" style={{ fontSize: '0.7rem', color: '#888', marginBottom: '10px' }}>SCAN_PROGRESS</div>
                                <div style={{ height: '4px', background: '#333', width: '100%' }}>
                                    <div style={{ width: `${scanProgress}%`, height: '100%', background: '#00f0ff', transition: 'width 0.1s linear' }}></div>
                                </div>
                                <div className="mono" style={{ textAlign: 'right', fontSize: '0.8rem', marginTop: '5px', color: '#00f0ff' }}>{scanProgress}%</div>
                            </div>
                        )}

                        <div style={{
                            border: '1px solid rgba(255,255,255,0.1)',
                            padding: '20px',
                            background: 'rgba(255,255,255,0.02)'
                        }}>
                            <div className="mono" style={{ fontSize: '0.7rem', color: '#666', marginBottom: '15px' }}>THREAT_LEVEL</div>
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}>
                                <div style={{ width: '20px', height: '40px', background: '#00ff00', opacity: 0.2 }}></div>
                                <div style={{ width: '20px', height: '60px', background: '#00ff00', opacity: 0.2 }}></div>
                                <div style={{ width: '20px', height: '30px', background: '#00ff00', opacity: 1 }}></div>
                                <div style={{ width: '20px', height: '80px', background: '#ffcc00', opacity: 0.2 }}></div>
                                <div style={{ width: '20px', height: '50px', background: '#ff3333', opacity: 0.2 }}></div>
                            </div>
                            <div className="mono" style={{ marginTop: '10px', fontSize: '0.7rem', color: '#00ff00' }}>LOW_RISK_DETECTED</div>
                        </div>
                    </div>

                    {/* Right Panel: Module Status */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                    }}>
                        <div className="mono" style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 2fr 1fr 1fr',
                            padding: '10px 20px',
                            fontSize: '0.7rem',
                            color: '#666',
                            borderBottom: '1px solid #333'
                        }}>
                            <span>ID</span>
                            <span>MODULE_NAME</span>
                            <span>STATUS</span>
                            <span>LOAD</span>
                        </div>

                        {checks.map((check) => (
                            <div key={check.id} className="integrity-row" style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 2fr 1fr 1fr',
                                padding: '20px',
                                background: 'rgba(0,0,0,0.4)',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                alignItems: 'center',
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                color: 'white'
                            }}>
                                <span style={{ color: '#666' }}>{check.id}</span>
                                <span>{check.module}</span>
                                <span style={{
                                    color: check.status === 'SECURE' || check.status === 'OPTIMAL' || check.status === 'VERIFIED' ? '#00ff00' :
                                        check.status === 'CLOAKED' ? '#00f0ff' : '#ffcc00'
                                }}>{check.status}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '60px', height: '4px', background: '#333' }}>
                                        <div style={{ width: `${check.load}%`, height: '100%', background: check.load > 90 ? '#ff3333' : 'white' }}></div>
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: '#888' }}>{Math.round(check.load)}%</span>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

                {/* Footer Bar */}
                {/* Footer Bar */}
                <div className="mono border-t border-white/10 px-6 py-6 md:px-[60px] flex flex-col md:flex-row justify-between text-[0.6rem] text-[#444] bg-black z-10 gap-4">
                    <div>© 2052 SYSTEM_CORE_INTEGRITY</div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-10">
                        <span>LAST_CHECK: 0.004s AGO</span>
                        <span>HASH: SHA-512</span>
                        <span>ROOT: LOCKED</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SystemIntegrity;
