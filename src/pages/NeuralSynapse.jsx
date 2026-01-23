import React, { useState, useEffect } from 'react';
import Header from '../Header';

const NeuralSynapse = () => {
    const [streamLines, setStreamLines] = useState([
        "> AUTH_REQ: SECTOR_A1",
        "> HANDSHAKE_SUCCESS [2ms]",
        "> STREAM_INIT: HEX_0099"
    ]);

    // Live Stream Effect
    useEffect(() => {
        const msgs = [
            "> PKT_RECV: 2E48b",
            "> DATA_INTEGRITY: 100%",
            "> BUFFER_FLUSH...",
            "> NODE_SYNC: ACTIVE",
            "> LATENCY_CHECK: 0.04ms",
            "> ENCRYPTION_ROTATION..."
        ];

        const interval = setInterval(() => {
            setStreamLines(prev => {
                const nextMsg = msgs[Math.floor(Math.random() * msgs.length)];
                const newLines = [...prev, nextMsg];
                if (newLines.length > 8) return newLines.slice(1);
                return newLines;
            });
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="app-main-wrapper" style={{ alignItems: 'flex-start', paddingTop: 0, overflow: 'hidden' }}>
            <div className="app-layout" style={{ minHeight: '100vh', border: 'none', position: 'relative' }}>

                {/* Header Navigation */}
                <Header />

                {/* Main Visualization Area */}
                <div className="neural-grid-container" style={{ position: 'relative', height: 'calc(100vh - 60px)', width: '100%', overflow: 'hidden' }}>

                    {/* SVG Layer for connecting lines */}
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                        {/* Center to Top-Right */}
                        <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="rgba(255,255,255,0.1)" strokeDasharray="4" className="mobile-hide-svg" />
                        {/* Center to Left Panel */}
                        <line x1="50%" y1="50%" x2="25%" y2="30%" stroke="rgba(255,255,255,0.1)" strokeDasharray="4" className="mobile-hide-svg" />
                        {/* Center to Bottom Right */}
                        <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="rgba(255,255,255,0.1)" strokeDasharray="4" className="mobile-hide-svg" />
                    </svg>

                    {/* Central Mesh */}
                    <div className="center-mesh mobile-stack-item" style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '400px', height: '400px', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '50%',
                        display: 'grid', placeItems: 'center'
                    }}>
                        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', position: 'absolute' }}></div>
                        <div style={{ height: '100%', width: '1px', background: 'rgba(255,255,255,0.1)', position: 'absolute' }}></div>
                        <div style={{ width: '20px', height: '20px', background: '#fff', borderRadius: '50%', opacity: 0.1 }}></div>
                        <div className="mono" style={{ position: 'absolute', bottom: '-40px', fontSize: '0.7rem', color: '#ccc' }}>VIRTUAL_MESH</div>
                    </div>

                    {/* Node Alpha (Top Center) */}
                    <div className="mobile-stack-item mobile-order-1" style={{ position: 'absolute', top: '15%', left: '40%', border: '1px solid #333', padding: '15px 30px', background: 'rgba(0,0,0,0.8)' }}>
                        <div className="mono" style={{ fontSize: '0.7rem', color: '#fff' }}>NODE_ALPHA</div>
                    </div>

                    {/* Left Panel: Neural Interface */}
                    <div className="mobile-stack-item mobile-order-2" style={{ position: 'absolute', top: '25%', left: '5%', width: '250px', zIndex: 2 }}>
                        <div style={{ borderBottom: '1px solid white', paddingBottom: '10px', marginBottom: '20px' }}>
                            <div className="mono" style={{ fontSize: '0.9rem', color: 'white', letterSpacing: '1px' }}>NEURAL_INTERFACE_V4</div>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <div className="mono" style={{ fontSize: '0.6rem', color: '#666' }}>STATUS</div>
                            <div className="mono" style={{ color: '#00ff00' }}>ACTIVE_SYNAPSE</div>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <div className="mono" style={{ fontSize: '0.6rem', color: '#666' }}>THROUGHPUT</div>
                            <div className="mono" style={{ color: 'white', fontSize: '1.2rem' }}>12.4 TB / CYC</div>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <div className="mono" style={{ fontSize: '0.6rem', color: '#666' }}>ENCRYPTION</div>
                            <div className="mono" style={{ color: 'white' }}>AES_256_POLY</div>
                        </div>

                        <div className="mono mobile-hide-text" style={{ marginTop: '100px', fontSize: '0.6rem', color: '#444', lineHeight: '1.6' }}>
                            [SYSTEM_INFO]: CORE STABILIZED. ALL NODES REPORTING HEALTHY SYNAPTIC PATHS. UNAUTHORIZED BYPASS ATTEMPTS DETECTED AND MITIGATED IN SECTOR 7G.
                        </div>
                    </div>

                    {/* Top Right Node */}
                    <div className="mobile-hide" style={{ position: 'absolute', top: '25%', right: '20%', width: '80px', height: '80px', border: '1px solid #444', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '2px', height: '2px', background: 'white' }}></div>
                        <div className="mono" style={{ position: 'absolute', top: '-20px', fontSize: '0.6rem', color: '#666', whiteSpace: 'nowrap' }}>NODE_ID: PX-9921-X</div>
                    </div>

                    {/* Right Panel: Live Stream */}
                    <div className="mobile-stack-item mobile-order-3" style={{ position: 'absolute', bottom: '20%', right: '5%', width: '300px', borderLeft: '1px solid #333', paddingLeft: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div className="mono" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>LIVE_STREAM</div>
                            <div style={{ width: '6px', height: '6px', background: 'red', borderRadius: '50%' }}></div>
                        </div>
                        <div className="mono" style={{ fontSize: '0.7rem', color: '#888', lineHeight: '2' }}>
                            {streamLines.map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>
                    </div>

                    {/* Floating Label: Signal Mod */}
                    <div className="mobile-hide" style={{ position: 'absolute', top: '40%', right: '15%', border: '1px solid #333', padding: '10px 30px' }}>
                        <div className="mono" style={{ fontSize: '0.7rem', color: '#aaa' }}>SIGNAL_MOD</div>
                    </div>

                    {/* Footer Info */}
                    <div className="mono mobile-footer" style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '0.6rem', color: '#444' }}>
                        © PIXY_NEWS_ARCH_GRID_2024
                    </div>
                    <div className="mono mobile-footer-right" style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '0.6rem', color: '#444' }}>
                        COORD: 34.0522° N, 118.2437° W   OS: PIXY_CORE_v1.0.2
                    </div>

                </div>

            </div>
        </div>
    );
};

export default NeuralSynapse;
