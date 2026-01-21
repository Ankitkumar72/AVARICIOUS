import { useState, useRef, useEffect } from 'react'
import './index.css' // Global styles
import { Link } from 'react-router-dom'
import logoImg from './assets/logo.png' // Import logo


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

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const NEWS_ITEMS = [
    {
        id: 1,
        category: 'HARDWARE',
        time: '14:02 UTC',
        title: 'Quantum Chip Throughput Exceeds Theoretical Limits',
        excerpt: 'Researchers at the Void Institute have successfully stabilized a 1000-qubit processor at room temperature, shattering previous computational barriers.',
        imagePlaceholder: '[CHIP_MACRO]',
        bgStyle: 'linear-gradient(to top, #0a0a0a, #222)'
    },
    {
        id: 2,
        category: 'NETWORK',
        time: '13:45 UTC',
        title: 'The Great Firewall of Sector 4 Has Fallen',
        excerpt: 'Unauthorized data streams are flooding the local subnet. Authorities are scrambling to patch the zero-day exploit found in the legacy infrastructure.',
        imagePlaceholder: null, // Custom render in original
        bgStyle: 'radial-gradient(circle, #333 0%, #000 70%)',
        customImage: (
            <div style={{ width: '150px', height: '150px', border: '2px solid white', borderRadius: '50%', boxShadow: '0 0 20px white' }}></div>
        )
    },
    {
        id: 3,
        category: 'SECURITY',
        time: '12:10 UTC',
        title: 'Biometric Data Leak Affects 30 Million Androids',
        excerpt: 'A breach in the central registry has exposed sensitive memory cores. Recall protocols have been initiated for all affected units.',
        imagePlaceholder: null,
        bgStyle: 'linear-gradient(135deg, #111 0%, #333 100%)',
        customImage: (
            <>
                <div style={{ width: '60px', height: '80px', border: '5px solid #888', borderRadius: '10px 10px 0 0', borderBottom: 'none' }}></div>
                <div style={{ width: '80px', height: '60px', background: '#888', borderRadius: '5px', marginTop: '-40px' }}></div>
            </>
        )
    }
];

function Home() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const newsGridRef = useRef(null); // Reference for scrolling
    const searchContainerRef = useRef(null); // Reference for search container click detection

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        }

        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchOpen]);

    const filteredNews = NEWS_ITEMS.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Scroll to results when user presses Enter
        if (newsGridRef.current) {
            newsGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

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
                <header className="app-header">
                    <div className="header-brand">
                        <img src={logoImg} alt="Logo" className="header-logo" />
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '1px' }}>PIXY<span className="text-accent">|</span>NEWS</div>
                        <span className="mono text-secondary" style={{ fontSize: '0.7rem' }}>SYS.VER.2.0.4</span>
                    </div>

                    <div className="header-meta mono text-secondary">
                        <span>LAT: 46.6242° N</span>
                        <span>LONG: 8.0414° E</span>
                        <span>LIVE FEED</span>
                    </div>

                    <div className="header-search" ref={searchContainerRef}>
                        {isSearchOpen ? (
                            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeIn 0.3s' }}>
                                <input
                                    type="text"
                                    placeholder="SEARCH SYSTEM..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid var(--accent-color)',
                                        color: 'white',
                                        fontFamily: 'var(--font-mono)',
                                        padding: '5px',
                                        width: '200px',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsSearchOpen(false);
                                        setSearchQuery('');
                                    }}
                                    style={{ color: '#666', fontSize: '1.2rem', cursor: 'pointer' }}
                                >
                                    ×
                                </button>
                            </form>
                        ) : (
                            <button
                                className="mono search-label"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsSearchOpen(true);
                                }}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                            >
                                SEARCH <SearchIcon />
                            </button>
                        )}

                        <div
                            className="hamburger-menu"
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            style={{ width: '20px', height: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', zIndex: 1001, position: 'relative' }}
                        >
                            <div style={{ width: '100%', height: '2px', background: 'white', transition: '0.3s', transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
                            <div style={{ width: '100%', height: '2px', background: 'white', transition: '0.3s', opacity: isMobileMenuOpen ? 0 : 1 }}></div>
                            <div style={{ width: '100%', height: '2px', background: 'white', transition: '0.3s', transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></div>
                        </div>
                    </div>
                </header>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-search-container">
                        <span className="mono text-accent" style={{ marginBottom: '10px', display: 'block' }}>SYSTEM SEARCH</span>
                        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', borderBottom: '1px solid #333', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="ENTER KEYWORDS..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', padding: '10px 0', outline: 'none', fontFamily: 'var(--font-mono)' }}
                            />
                            <button type="submit" style={{ color: '#666', padding: '0 5px' }}><SearchIcon /></button>
                        </form>
                    </div>
                    <div className="mobile-menu-links mono">
                        <a href="#">LATEST_FEED</a>
                        <a href="#">ARCHIVE</a>
                        <a href="#">PROTOCOL</a>
                        <a href="#">CONTACT</a>
                    </div>
                </div>

                {/* Main Hero Grid */}
                <section className="hero-section">

                    {/* Left Column */}
                    <div className="hero-content">

                        {/* Vertical Text Sidebar */}
                        <div className="mono text-secondary" style={{
                            position: 'absolute',
                            left: '15px',
                            top: '100px',
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                            fontSize: '0.7rem',
                            letterSpacing: '2px',
                            opacity: 0.5
                        }}>
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

                {/* Three Column News Grid */}
                <section className="news-grid" ref={newsGridRef}>
                    {filteredNews.length > 0 ? (
                        filteredNews.map((news) => (
                            <div key={news.id} className="news-item">
                                <div className="news-image">
                                    <div style={{ width: '100%', height: '100%', background: news.bgStyle, display: 'grid', placeItems: 'center' }}>
                                        {news.customImage ? news.customImage : <span className="mono text-secondary">{news.imagePlaceholder}</span>}
                                    </div>
                                </div>
                                <div className="news-content">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <span className="mono" style={{ background: '#222', padding: '2px 6px', fontSize: '0.7rem' }}>
                                            <HighlightText text={news.category} highlight={searchQuery} />
                                        </span>
                                        <span className="mono text-secondary" style={{ fontSize: '0.7rem' }}>{news.time}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', lineHeight: '1.2', margin: '0 0 15px 0' }}>
                                        <HighlightText text={news.title} highlight={searchQuery} />
                                    </h3>
                                    <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                                        <HighlightText text={news.excerpt} highlight={searchQuery} />
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
    )
}

export default Home
