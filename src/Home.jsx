import { useState, useRef, useEffect, useCallback } from 'react'
import './index.css' // Global styles
import { Link, useSearchParams } from 'react-router-dom'
import Header from './Header'
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

function Home() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const newsGridRef = useRef(null);
    const { posts, loading } = useBlog();
    const [isBooting, setIsBooting] = useState(true);

    const handleBootComplete = useCallback(() => {
        setIsBooting(false);
    }, []);

    useEffect(() => {
        if (searchQuery && newsGridRef.current) {
            newsGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [searchQuery]);

    // Filter posts
    const filteredNews = posts.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
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
                                        <div style={{ fontSize: '1.1rem' }}>Unit 734</div>
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
                            <Link to="/blog/synthetic-horizon" className="hero-image-link clickable-image">
                                <div className="glass-panel" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="mono text-secondary">[CYBORG_VISUAL_FEED]</span>
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
                        <NewsGrid posts={filteredNews} loading={loading} ref={newsGridRef} />

                        {/* Subscription Section */}
                        <section className="subscription-section">
                            <div className="mono text-accent" style={{ letterSpacing: '4px', fontSize: '0.8rem', marginBottom: '20px' }}>SYSTEM NOTIFICATION</div>
                            <h2 className="subscription-title">SUBSCRIBE TO<br />THE BLUEPRINT</h2>
                            <div className="subscription-form">
                                <input type="text" placeholder="ENTER_ID_KEY" style={{ flex: 1, background: 'transparent', border: 'none', padding: '20px', color: 'white', fontFamily: 'var(--font-mono)', outline: 'none' }} />
                                <button style={{ background: 'white', color: 'black', padding: '0 30px', fontWeight: 'bold' }}>CONNECT</button>
                            </div>
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
