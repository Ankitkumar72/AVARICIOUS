import React from 'react';

const StatusTicker = ({ items }) => {
    return (
        <div style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.5)',
            padding: '5px 0',
            width: '100%'
        }}>
            <div style={{ display: 'inline-block', animation: 'ticker-slide 20s linear infinite' }}>
                {items.map((item, i) => (
                    <span key={i} className="mono text-secondary" style={{
                        margin: '0 20px',
                        fontSize: '0.7rem',
                        letterSpacing: '1px'
                    }}>
                        {item}
                    </span>
                ))}
                {/* Duplicate for seamless loop effect (basic) */}
                {items.map((item, i) => (
                    <span key={`dup-${i}`} className="mono text-secondary" style={{
                        margin: '0 20px',
                        fontSize: '0.7rem',
                        letterSpacing: '1px'
                    }}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default StatusTicker;
