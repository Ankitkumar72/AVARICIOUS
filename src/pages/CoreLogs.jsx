import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';

const SOURCE_LOGS = [
    { msg: 'SYSTEM_INITIALIZATION_COMPLETE', type: 'info' },
    { msg: 'LOADING_SUBSYSTEMS... [DONE]', type: 'info' },
    { msg: 'UPDATING NEURAL_SYNAPSE ARCHIVE: 4.2.0-STABLE', type: 'success' },
    { msg: 'REMOTE_CONNECTION_ESTABLISHED: 192.168.1.104', type: 'info' },
    { msg: "ENFORCEMENT_BYPASS: ATTEMPT_DETECTED FROM 'PROXY_VALLEY'", type: 'warning' },
    { msg: 'SCRAPING_PIXY_NEWS_DATABASE ...', type: 'info' },
    { msg: '3422 RECORDS INDEXED. CACHE_HIT: 98.4%', type: 'info' },
    { msg: 'ALERT: CORE_LOGS_SYNC_REQD', type: 'alert' },
    { msg: 'HEARTBEAT_ACK FROM_REDUNDANT_SERVER_02', type: 'info' },
    { msg: '-- IDLE_PROCESS_RUNNING --', type: 'dim' },
    { msg: 'RUNNING_CMD: GET_CORE_STABILITY', type: 'info' },
    { msg: 'SYSTEM_MONITOR_TICK', type: 'dim' },
    { msg: 'SYSTEM_MONITOR_TICK', type: 'dim' },
    { msg: 'SYSTEM_MONITOR_TICK', type: 'dim' },
    { msg: 'FAILED_AUTH: ROOT_ACCESS_REJECTED', type: 'error' },
    { msg: 'RE-ESTABLISHING ENCRYPTION_LAYER_7', type: 'info' },
];

const MAX_LINES = 16; // Keep the list fixed to this size to prevent scrolling

const CoreLogs = () => {
    const [logs, setLogs] = useState([]);
    const [uptime, setUptime] = useState({ d: 142, h: 22, m: 18, s: 4 });

    // Initial Load
    useEffect(() => {
        const initial = SOURCE_LOGS.map((log, i) => {
            const date = new Date();
            date.setSeconds(date.getSeconds() - (SOURCE_LOGS.length - i) * 5);
            const timeStr = date.toLocaleTimeString('en-US', { hour12: false });
            return { ...log, time: timeStr };
        });
        setLogs(initial.slice(-MAX_LINES)); // Ensure we start with max lines
    }, []);

    // Uptime ticker
    useEffect(() => {
        const interval = setInterval(() => {
            setUptime(prev => {
                let { d, h, m, s } = prev;
                s++;
                if (s >= 60) { s = 0; m++; }
                if (m >= 60) { m = 0; h++; }
                if (h >= 24) { h = 0; d++; }
                return { d, h, m, s };
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Infinite Loop (Sliding Window)
    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => {
                const now = new Date();
                const timeString = now.toLocaleTimeString('en-US', { hour12: false });

                // Pick random log
                const randomLogTemplate = SOURCE_LOGS[Math.floor(Math.random() * SOURCE_LOGS.length)];
                const newLog = { ...randomLogTemplate, time: timeString };

                // Add new, remove old (Sliding Window)
                const newLogs = [...prev, newLog];
                return newLogs.slice(-MAX_LINES);
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const formatUptime = ({ d, h, m, s }) => {
        return `${d}:${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="app-main-wrapper" style={{ alignItems: 'flex-start', paddingTop: '0' }}>
            <div className="app-layout" style={{ minHeight: '100vh', border: 'none' }}>

                <Header />

                {/* Main Content Grid with Responsive Classes */}
                <div className="core-logs-container">

                    {/* Left: Logs (Fixed Height, No Scroll, Top Aligned) */}
                    <div className="core-logs-list" style={{ overflow: 'hidden' }}>
                        {logs.map((log, i) => (
                            <div key={i} className="core-log-entry">
                                <span className="log-timestamp">[{log.time}]</span>
                                <span style={{
                                    color: log.type === 'error' ? '#ff3333' :
                                        log.type === 'success' ? '#00ff00' :
                                            log.type === 'warning' ? '#ffcc00' :
                                                log.type === 'alert' ? 'white' :
                                                    log.type === 'dim' ? '#444' : '#aaa',
                                    fontWeight: log.type === 'alert' ? 'bold' : 'normal',
                                    wordBreak: 'break-word'
                                }}>
                                    {log.msg}
                                </span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <span style={{ color: '#666' }}>[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
                            <span className="blinking-cursor" style={{ color: '#00f0ff' }}>_</span>
                        </div>
                    </div>

                    {/* Right: Sidebar */}
                    <div className="core-logs-sidebar">
                        <div style={{ padding: '40px' }}>
                            <div className="mono" style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#666', marginBottom: '30px' }}>SYSTEM_METRICS</div>

                            <div style={{ marginBottom: '30px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    <span>CORE_STABILITY</span>
                                    <span>99.98%</span>
                                </div>
                                <div style={{ height: '2px', background: '#333', width: '100%' }}>
                                    <div style={{ width: '99%', height: '100%', background: 'white' }}></div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    <span>NEURAL_LOAD</span>
                                    <span>14.2%</span>
                                </div>
                                <div style={{ height: '2px', background: '#333', width: '100%' }}>
                                    <div style={{ width: '14%', height: '100%', background: 'white' }}></div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    <span>MEMORY_BUFFER</span>
                                    <span>8GB / 64GB</span>
                                </div>
                                <div style={{ height: '2px', background: '#333', width: '100%' }}>
                                    <div style={{ width: '12%', height: '100%', background: 'white' }}></div>
                                </div>
                            </div>

                            <div style={{ marginTop: '80px' }}>
                                <div className="mono" style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#666', marginBottom: '20px' }}>SYSTEM_UPTIME</div>
                                <div style={{ fontSize: '2.5rem', fontFamily: 'monospace', color: 'white' }}>
                                    {formatUptime(uptime)}
                                </div>
                                <div className="mono" style={{ fontSize: '0.7rem', color: '#666', marginTop: '5px' }}>D:H:M:S</div>
                            </div>
                        </div>

                        <div style={{
                            position: 'absolute',
                            bottom: '40px',
                            left: '40px',
                            right: '40px',
                            border: '1px solid #333',
                            padding: '20px',
                            backgroundColor: '#080808'
                        }} className="hide-on-mobile">
                            <div className="mono" style={{ fontSize: '0.7rem', color: '#888', marginBottom: '10px' }}>KERNEL_STATUS</div>
                            <div className="mono" style={{ fontSize: '0.7rem', color: '#666', lineHeight: '1.6' }}>
                                ARCH: x86_64<br />
                                SEC: AES-256-GCM<br />
                                MODE: HIGH_PRECISION
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bar */}
                {/* Footer Bar */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#444' }} className="mono responsive-footer">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff00' }}></div>
                        <span style={{ color: '#666' }}>NETWORK_ONLINE</span>
                        <span style={{ marginLeft: '20px' }}>LATENCY: 14MS</span>
                    </div>
                    <div>© 2083 PIXY_GLOBAL_CONGLOMERATE // ALL RIGHTS RESERVED</div>
                </div>

            </div>
        </div>
    );
};

export default CoreLogs;
