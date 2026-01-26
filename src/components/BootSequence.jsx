import { useState, useEffect } from 'react';

const BOOT_TEXT = [
    "INITIALIZING KERNEL...",
    "LOADING MEMORY MODULES...",
    "CHECKING BIO-METRICS...",
    "DECRYPTING NEURAL LINK...",
    "ESTABLISHING SECURE CONNECTION...",
    "SYSTEM_READY"
];

const BootSequence = ({ onComplete }) => {
    const [lines, setLines] = useState([]);
    const [progress, setProgress] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Text Typing Effect
    useEffect(() => {
        if (currentIndex < BOOT_TEXT.length) {
            const timeout = setTimeout(() => {
                setLines(prev => [...prev, BOOT_TEXT[currentIndex]]);
                setCurrentIndex(prev => prev + 1);
            }, 50);
            return () => clearTimeout(timeout);
        } else {
            // Sequence complete, wait a bit then unmount
            const timeout = setTimeout(() => {
                onComplete();
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, onComplete]);

    // Progress Bar Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 40);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="boot-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#00f0ff',
            fontFamily: 'monospace'
        }}>
            <div style={{ width: '300px' }}>
                <div style={{
                    marginBottom: '20px',
                    minHeight: '150px',
                    border: '1px solid #111',
                    padding: '10px',
                    fontSize: '0.9rem',
                    textShadow: '0 0 5px rgba(0, 240, 255, 0.5)'
                }}>
                    {lines.map((line, i) => (
                        <div key={i} className="boot-line">{`> ${line}`}</div>
                    ))}
                    <span className="blinking-cursor">_</span>
                </div>

                {/* Progress Bar Container */}
                <div style={{
                    width: '100%',
                    height: '4px',
                    background: '#111',
                    marginTop: '10px'
                }}>
                    {/* Progress Fill */}
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: '#00f0ff',
                        transition: 'width 0.1s linear',
                        boxShadow: '0 0 10px #00f0ff'
                    }}></div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '5px',
                    fontSize: '0.7rem',
                    color: '#555'
                }}>
                    <span>MEMORY_OK</span>
                    <span>{Math.min(progress, 100)}%</span>
                </div>
            </div>
        </div>
    );
};

export default BootSequence;
