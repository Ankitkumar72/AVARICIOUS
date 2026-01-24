import { useState, useRef, useEffect, useCallback } from 'react'
import './index.css' // Global styles
import { Link, useSearchParams } from 'react-router-dom'
import Header from './Header'
import cyborgFeedImg from './assets/ai-generated-8343518_1920.jpg';
import defaultAuthorImg from './assets/8machine-_-Jw7p2A369As-unsplash.jpg';
import { useBlog } from './context/BlogContext';
import DataStream from './components/DataStream';
import NewsGrid from './components/NewsGrid';
import BootSequence from './components/BootSequence';
import Footer from './components/Footer';

// Helper Component for Highlighting Text
const HighlightText = ({ text, highlight }) => {
    if (!highlight || !text) return text;

    // Split text on highlight term, include term in parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={i} className="search-highlight">{part}</span>
                ) : (
                    part
                )
            )}
        </span>
    );
};

import { supabase } from './supabaseClient'; // Add this import

function Home() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const newsGridRef = useRef(null);
    const { posts, loading, error } = useBlog();
    // Check if we have already booted this session
    const [isBooting, setIsBooting] = useState(() => {
        return !sessionStorage.getItem('hasBooted');
    });

    const handleBootComplete = useCallback(() => {
        setIsBooting(false);
        sessionStorage.setItem('hasBooted', 'true');
    }, []);

    const [subscriptionStatus, setSubscriptionStatus] = useState('idle'); // idle, connecting, subscribed, error
    const [email, setEmail] = useState('');

    const handleSubscribe = async () => {
        if (!email || !email.includes('@')) {
            alert("INVALID_SIGNAL: Please enter a valid frequency (email).");
            return;
        }

        setSubscriptionStatus('connecting');

        try {
            // Call the Vercel Serverless Function
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setSubscriptionStatus('subscribed');
            } else {
                const data = await response.json();
                console.error('Subscription error:', data);
                // Show the actual error for debugging
                alert(`CONNECTION_FAILED: ${data.error || 'Signal interference detected.'}`);
                setSubscriptionStatus('idle');
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            setSubscriptionStatus('idle');
        }
    };

    useEffect(() => {
        if (searchQuery && newsGridRef.current) {
            newsGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [searchQuery]);

    // Filter posts
    const filteredNews = posts.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="app-main-wrapper">
            {isBooting && <BootSequence onComplete={handleBootComplete} />}

            {!isBooting && (
                <div className="fade-in-content">
                    {/* Boxed Layout Container */}
                    <div className="app-layout">

                        {/* Corner Markers */}
                        <div className="corner-marker corner-top-left"></div>
                        <div className="corner-marker corner-top-right"></div>
                        <div className="corner-marker corner-bottom-left"></div>
                        <div className="corner-marker corner-bottom-right"></div>

                        {/* Header */}
                        <Header />

                        {/* Main Hero Grid */}
                        <section className="hero-section">

                            {/* Left Column */}
                            <div className="hero-content">

                                {/* Vertical Text Sidebar */}
                                <div className="mono text-secondary vertical-sidebar">
                                    SECTOR 7 // A-WING
                                </div>

                                <div className="mono text-accent" style={{ marginBottom: '20px', fontSize: '0.8rem', border: '1px solid #00f0ff', padding: '4px 8px', width: 'fit-content' }}>
                                    • BREAKING PROTOCOL
                                </div>

                                <h1 className="hero-title">
                                    GLOBAL<br />SYSTEM<br />
                                    <span style={{ color: 'transparent', WebkitTextStroke: '1px white' }}>RESET</span>
                                </h1>

                                {/* Meta Info Row */}
                                <div style={{ display: 'flex', gap: '60px', marginTop: '60px', paddingTop: '40px', borderTop: '1px solid var(--grid-color)', width: '100%' }}>
                                    <div>
                                        <div className="mono text-secondary" style={{ fontSize: '0.7rem', marginBottom: '5px' }}>AUTHOR</div>
                                        <div style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <img src={defaultAuthorImg} alt="Author" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                                            <span>Elias-7</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mono text-secondary" style={{ fontSize: '0.7rem', marginBottom: '5px' }}>READ TIME</div>
                                        <div style={{ fontSize: '1.1rem' }}>04:20s</div>
                                    </div>
                                </div>

                                <Link to="/blog/synthetic-horizon" className="animate-arrow" style={{
                                    marginTop: '60px',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    color: 'var(--accent-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    textAlign: 'left',
                                    textDecoration: 'none',
                                    width: 'fit-content'
                                }}>
                                    INITIATE SEQUENCE <span className="hover-slide-right" style={{ fontSize: '1.5rem' }}>→</span>
                                </Link>
                            </div>

                            {/* Right Column (Image) - Now Clickable */}
                            <Link to="/blog/synthetic-horizon" className="hero-image-link clickable-image" style={{ overflow: 'hidden', position: 'relative' }}>
                                <div className="glass-panel" style={{ width: '100%', height: '100%', padding: 0 }}>
                                    <img src={cyborgFeedImg} alt="Cyborg Visual Feed" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)',
                                        pointerEvents: 'none'
                                    }}></div>
                                </div>
                                <div className="mono text-accent" style={{ position: 'absolute', bottom: '30px', right: '30px', fontSize: '0.7rem' }}>IMG_SEQ_001.RAW</div>
                            </Link>
                        </section>

                        {/* Stats Row */}
                        <section className="stats-grid">
                            <div className="stat-item">
                                <div className="mono text-secondary" style={{ fontSize: '0.7rem', marginBottom: '10px' }}>MARKET_INDEX</div>
                                <div className="stat-value">14,204.91</div>
                                <div className="text-accent mono" style={{ marginTop: '5px' }}>↗ +2.4%</div>
                            </div>

                            <div className="stat-item" style={{ padding: '20px' }}>
                                <div className="mono text-secondary" style={{ fontSize: '0.7rem', marginBottom: '10px' }}>SYSTEM_LOGS</div>
                                <DataStream />
                            </div>

                            <div className="stat-item">
                                <div className="mono text-secondary" style={{ fontSize: '0.7rem', marginBottom: '10px' }}>DATA_STREAM</div>
                                <div className="stat-value">402 TB/s</div>
                                <div className="text-secondary mono" style={{ marginTop: '5px' }}>Encryption: AES-256</div>
                            </div>

                            <div className="stat-item">
                                <div className="mono text-secondary" style={{ fontSize: '0.7rem', marginBottom: '10px' }}>WEATHER_SAT</div>
                                <div className="stat-value">24°C</div>
                                <div className="text-secondary mono" style={{ marginTop: '5px' }}>Sector 7 Clear</div>
                            </div>
                        </section>

                        {/* News Grid */}
                        <NewsGrid posts={filteredNews} loading={loading} error={error} ref={newsGridRef} />

                        {/* Subscription Section */}
                        <section className="subscription-section">
                            <div className="mono text-accent" style={{ letterSpacing: '4px', fontSize: '0.8rem', marginBottom: '20px' }}>SYSTEM NOTIFICATION</div>
                            <h2 className="subscription-title">SUBSCRIBE TO<br />THE BLUEPRINT</h2>
                            {subscriptionStatus === 'subscribed' ? (
                                <div className="border border-[#00f0ff] bg-[#00f0ff]/10 p-6 text-center animate-pulse">
                                    <div className="text-[#00f0ff] font-mono font-bold text-xl mb-2">UPLINK ESTABLISHED</div>
                                    <div className="text-[#00f0ff] font-mono text-sm">ID_REF: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                                    <div className="text-gray-400 font-mono text-xs mt-2">WELCOME TO THE GRID</div>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row w-full max-w-[500px] gap-4 md:gap-0 md:border md:border-[#333] relative z-10">
                                    <input
                                        type="email"
                                        placeholder="ENTER_ID_KEY"
                                        className="flex-1 bg-transparent border border-[#333] md:border-none p-4 md:p-5 text-white font-mono outline-none"
                                        disabled={subscriptionStatus === 'connecting'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSubscribe}
                                        disabled={subscriptionStatus === 'connecting'}
                                        className="bg-white text-black px-8 py-4 md:py-0 font-bold hover:bg-[#00f0ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {subscriptionStatus === 'connecting' ? 'PROCESSING...' : 'CONNECT'}
                                    </button>
                                </div>
                            )}
                            {/* Decorative Lines */}
                            <div className="deco-line left"></div>
                            <div className="deco-line right"></div>
                        </section>

                        {/* Latest Transmissions */}
                        <section style={{ borderBottom: '1px solid var(--grid-color)' }}>
                            <div className="transmissions-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '6px', height: '6px', background: '#00f0ff' }}></div>
                                    <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>LATEST TRANSMISSIONS</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button style={{ border: '1px solid #333', width: '30px', height: '30px', display: 'grid', placeItems: 'center' }}>&lt;</button>
                                    <button style={{ border: '1px solid #333', width: '30px', height: '30px', display: 'grid', placeItems: 'center' }}>&gt;</button>
                                </div>
                            </div>

                            <div className="transmissions-grid">
                                {['INFRASTRUCTURE', 'MANUFACTURING', 'SOFTWARE', 'ORBITAL'].map((tag, i) => (
                                    <div key={i} className="transmission-item">
                                        <div style={{ height: '120px', background: '#111', marginBottom: '20px', display: 'grid', placeItems: 'center', color: '#333' }}>[IMG_0{i + 1}]</div>
                                        <div className="mono text-accent" style={{ fontSize: '0.6rem', marginBottom: '5px' }}>{tag}</div>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                                            {i === 0 && 'Server Farm 09 Overheat'}
                                            {i === 1 && 'Auto-Assembly Line Stalled'}
                                            {i === 2 && 'Patch 4.2.1 Deployment'}
                                            {i === 3 && 'Sat-Link Beta Tests'}
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </section>

                        {/* Footer */}
                        <Footer />

                    </div>
                </div>
            )}


        </div>
    );
}

export default Home;
