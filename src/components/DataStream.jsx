import { useState, useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';

const LOG_MESSAGES = [
    "NEURAL_SYNC: 98.4%", "DOM_RENDER: SUCCESS", "LATENCY: 14ms",
    "SUPABASE_LINK: STABLE", "ENCRYPTION: AES-1024", "CORE_TEMP: 34C",
    "PACKET_LOSS: 0.001%", "MEM_USAGE: 42%", "RENDER_QUEUE: EMPTY",
    "NETWORK_SAT: OPTIMAL"
];

const DataStream = () => {
    const { posts } = useBlog();
    const [displayLog, setDisplayLog] = useState(null);

    useEffect(() => {
        // Fallback system messages
        const SYSTEM_MSGS = ["NEURAL_SYNC: STABLE", "ENCRYPTION: AES-256", "SECTOR_7: CLEAR"];

        const updateLog = () => {
            const time = new Date().toLocaleTimeString('en-GB', { hour12: false });

            if (posts && posts.length > 0) {
                // Pick a random post
                const randomPost = posts[Math.floor(Math.random() * posts.length)];
                setDisplayLog({
                    id: randomPost.id,
                    time,
                    text: `LOG_ENTRY: ${randomPost.title.substring(0, 25).toUpperCase()}...`,
                    link: `/blog/${randomPost.id}`
                });
            } else {
                // Formatting fallback
                setDisplayLog({
                    id: 'sys',
                    time,
                    text: SYSTEM_MSGS[Math.floor(Math.random() * SYSTEM_MSGS.length)],
                    link: null
                });
            }
        };

        // Initial update
        updateLog();

        const interval = setInterval(updateLog, 3000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, [posts]);

    if (!displayLog) return <div className="font-mono text-xs text-secondary">initializing...</div>;

    return (
        <div className="font-mono text-secondary" style={{ fontSize: '0.7rem' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="text-accent" style={{ opacity: 0.7 }}>[{displayLog.time}]</span>
                {displayLog.link ? (
                    <Link to={displayLog.link} className="hover:text-accent hover:underline transition-colors truncate">
                        {displayLog.text}
                    </Link>
                ) : (
                    <span>{displayLog.text}</span>
                )}
            </div>
        </div>
    );
};

export default DataStream;
