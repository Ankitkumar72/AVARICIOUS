import { useState, useEffect } from 'react';

const BootSequence = ({ onComplete }) => {
    const [lines, setLines] = useState([]);
    const [progress, setProgress] = useState(0);

    const bootText = [
        "INITIALIZING KERNEL...",
        "LOADING MEMORY MODULES...",
        "CHECKING BIO-METRICS...",
        "DECRYPTING NEURAL LINK...",
        "ESTABLISHING SECURE CONNECTION...",
        "SYSTEM_READY"
    ];

    useEffect(() => {
        let currentLine = 0;

        // Add lines one by one
        const textInterval = setInterval(() => {
            if (currentLine < bootText.length) {
                setLines(prev => [...prev, bootText[currentLine]]);
                currentLine++;
            } else {
                clearInterval(textInterval);
                setTimeout(onComplete, 800); // Slight delay after completion before unmount
            }
        }, 300); // Speed of text appearance

        // Fake progress bar
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2; // Speed of progress bar
            });
        }, 40);

        return () => {
            clearInterval(textInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

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
            color: '#00f0ff', // Cyber cyan
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
