
import { useState, useRef, useEffect } from 'react'
import './index.css' // Global styles
import { Link, useSearchParams } from 'react-router-dom'
import Header from './Header'
import { useBlog } from './context/BlogContext';

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
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,240,255,0.05) 0%, rgba(0,0,0,0) 50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

                    <div className="stat-item">
                        <div className="mono text-secondary" style={{ fontSize: '0.7rem', marginBottom: '10px' }}>NODES_ACTIVE</div>
                        <div className="stat-value">8,992</div>
                        <div className="text-secondary mono" style={{ marginTop: '5px' }}>Global Cluster</div>
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
                <section className="news-grid" ref={newsGridRef}>
                    {loading ? (
                        <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', color: '#666' }}>
                            <div className="mono">LOADING_DATA_STREAM...</div>
                        </div>
                    ) : filteredNews.length > 0 ? (
                        filteredNews.map((news) => (
                            <div key={news.id} className="news-item">
                                <div className="news-image news-link-wrapper">
                                    <Link to={`/blog/${news.id}`} style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}>
                                        <div style={{ width: '100%', height: '100%', background: news.bgStyle || '#111', display: 'grid', placeItems: 'center', position: 'relative' }}>
                                            {news.image_url ? (
                                                <img src={news.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                                            ) : (
                                                <span className="mono text-secondary">[NO_IMG_DATA]</span>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                                <div className="news-content">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <span className="mono" style={{ background: '#222', padding: '2px 6px', fontSize: '0.7rem' }}>
                                            <HighlightText text={news.category || 'GENERAL'} highlight={searchQuery} />
                                        </span>
                                        <span className="mono text-secondary" style={{ fontSize: '0.7rem' }}>
                                            {news.updated_at ? new Date(news.updated_at).toLocaleTimeString() : '---'}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', lineHeight: '1.2', margin: '0 0 15px 0' }}>
                                        <Link to={`/blog/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <HighlightText text={news.title} highlight={searchQuery} />
                                        </Link>
                                    </h3>
                                    <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                                        {/* Simple truncate for excerpt */}
                                        <HighlightText text={news.content?.substring(0, 100) + '...'} highlight={searchQuery} />
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', color: '#666' }}>
                            <div className="mono" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>NO_DATA_FOUND</div>
                            <div>Try adjusting your search query parameters.</div>
                        </div>
                    )}
                </section>

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
                <footer className="app-footer">
                    <div className="footer-top">
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>PIXY<span className="text-accent">|</span>NEWS</div>
                            <div className="text-secondary" style={{ fontSize: '0.8rem', maxWidth: '300px' }}>Architectural grid-based news terminal.<br />Copyright ©2026 System Core. All rights reserved.</div>
                        </div>
                        <div className="mono text-secondary footer-links">
                            <a href="#">PROTOCOL</a>
                            <a href="#">MANIFESTO</a>
                            <a href="#">JOIN NETWORK</a>
                            <a href="#">LEGAL</a>
                        </div>
                    </div>

                    {/* Ticker */}
                    <div className="footer-ticker mono">
                        <span>/// MARKET ALERT: SYNTHETIC ORE DOWN 4.5% ///</span>
                        <span>/// SYSTEM UPDATE: FIREWALL PATCH APPLIED SUCCESSFULLY ///</span>
                        <span>/// WEATHER: ACID RAIN WARNING FOR LOWER DISTRICTS ///</span>
                    </div>
                </footer>

            </div>

        </div>
    );
}

export default Home;
