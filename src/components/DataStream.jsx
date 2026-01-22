import { useState, useEffect } from 'react';

const LOG_MESSAGES = [
    "NEURAL_SYNC: 98.4%", "DOM_RENDER: SUCCESS", "LATENCY: 14ms",
    "SUPABASE_LINK: STABLE", "ENCRYPTION: AES-1024", "CORE_TEMP: 34C",
    "PACKET_LOSS: 0.001%", "MEM_USAGE: 42%", "RENDER_QUEUE: EMPTY",
    "NETWORK_SAT: OPTIMAL"
];

const DataStream = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = {
                id: Date.now(),
                text: LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)],
                time: new Date().toLocaleTimeString('en-GB', { hour12: false })
            };
            setLogs(prev => [newLog, ...prev].slice(0, 5));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-secondary" style={{ fontSize: '0.7rem', opacity: 0.8 }}>
            {logs.map(log => (
                <div key={log.id} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                    <span className="text-accent" style={{ opacity: 0.7 }}>[{log.time}]</span>
                    <span>{log.text}</span>
                </div>
            ))}
        </div>
    );
};

export default DataStream;
