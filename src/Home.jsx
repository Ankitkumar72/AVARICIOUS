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

import { supabase } from './supabaseClient';

// Hacking Overlay Component
const HackingOverlay = () => (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-[#00FF41]">
        <div className="text-4xl font-bold animate-pulse mb-4">ESTABLISHING_UPLINK</div>
        <div className="text-sm opacity-80">
            <div>BYPASSING_FIREWALL... [OK]</div>
            <div>INJECTING_PACKET... [OK]</div>
            <div>MASKING_IP_ADDRESS... [OK]</div>
        </div>
        <div className="mt-8 text-xs text-red-500 animate-bounce">DO_NOT_CLOSE_TERMINAL</div>
    </div>
);

function Home() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const newsGridRef = useRef(null);
    const { posts, loading, error } = useBlog();

    // Latest Transmissions State
    const [transmissionOffset, setTransmissionOffset] = useState(0);
    const TRANSMISSION_ITEMS = 4;

    // Calculate pagination for transmissions
    const safePosts = posts || [];
    const totalPages = Math.ceil(safePosts.length / TRANSMISSION_ITEMS);
    const canGoBack = transmissionOffset > 0;
    const canGoForward = transmissionOffset < totalPages - 1;

    // Boot Sequence State
    const [isBooting, setIsBooting] = useState(() => !sessionStorage.getItem('hasBooted'));

    const handleBootComplete = useCallback(() => {
        setIsBooting(false);
        sessionStorage.setItem('hasBooted', 'true');
    }, []);

    // Collective Join State
    const [joinState, setJoinState] = useState('IDLE'); // IDLE, HACKING, JOINED, ERROR
    const [formData, setFormData] = useState({
        identityHash: '',
        accessKey: '',
        nodeOrigin: 'SECTOR_07',
        latencyPref: 'ULTRA_LOW',
        email: ''
    });

    // Dynamic Latency Jitter
    const [latency, setLatency] = useState(14);
    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(12 + Math.floor(Math.random() * 8)); // 12-19ms
        }, 800);
        return () => clearInterval(interval);
    }, []);

    const handleJoin = async () => {
        // 1. Validation
        if (!formData.email.includes('@') || !formData.identityHash || !formData.accessKey) {
            alert("INVALID_SIGNAL: ALL FIELDS REQUIRED.");
            return;
        }

        // 2. Trigger Hacking Overlay
        setJoinState('HACKING');

        // 3. Fake Delay for Effect
        setTimeout(async () => {
            try {
                const { error } = await supabase
                    .from('collective_members')
                    .insert([{
                        identity_hash: formData.identityHash,
                        access_key: formData.accessKey,
                        node_origin: formData.nodeOrigin,
                        latency_pref: formData.latencyPref,
                        email: formData.email
                    }]);

                if (error) {
                    if (error.code === '23505') { // Unique violation
                        alert("SIGNAL_COLLISION: IDENTITY_HASH_ALREADY_ACTIVE");
                    } else {
                        throw error;
                    }
                    setJoinState('IDLE');
                } else {
                    setJoinState('JOINED');
                }
            } catch (err) {
                console.error("UPLINK_FAILED:", err);
                alert("CONNECTION_RESET_BY_PEER");
                setJoinState('IDLE');
            }
        }, 3000);
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
            {/* Hacking Overlay */}
            {joinState === 'HACKING' && <HackingOverlay />}

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

                        {/* Diagnostics Link (Temporary) */}
                        <div className="fixed bottom-2 right-2 z-50 opacity-20 hover:opacity-100 transition-opacity">
                            <Link to="/diagnostics" className="text-[10px] mono text-accent border border-accent px-1">SYS_DIAG</Link>
                        </div>

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
                        <NewsGrid posts={posts} loading={loading} error={error} ref={newsGridRef} />

                        {/* Subscription Section (RENAMED: JOIN THE COLLECTIVE) */}
                        <section className="subscription-section relative">
                            <div className="absolute top-0 right-0 p-4 font-mono text-xs text-secondary opacity-50">
                                LOC: {formData.nodeOrigin} // LAT: {latency}ms
                            </div>

                            <div className="mono text-accent" style={{ letterSpacing: '4px', fontSize: '0.8rem', marginBottom: '20px' }}>PROTOCOL_INITIATED</div>
                            <h2 className="subscription-title">JOIN THE<br />COLLECTIVE</h2>

                            {joinState === 'JOINED' ? (
                                <div className="border border-[#00f0ff] bg-[#00f0ff]/10 p-6 text-center animate-pulse">
                                    <div className="text-[#00f0ff] font-mono font-bold text-xl mb-2">ACCESS GRANTED</div>
                                    <div className="text-[#00f0ff] font-mono text-sm">HASH_ID: {formData.identityHash.toUpperCase()}</div>
                                    <div className="text-gray-400 font-mono text-xs mt-2">AWAITING CLANDESTINE BURST...</div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[600px] relative z-10 p-6 border border-[#333] bg-black/50 backdrop-blur-md">

                                    {/* IDENTITY HASH */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-mono text-secondary">IDENTITY_HASH</label>
                                        <input
                                            type="text"
                                            placeholder="USER_NAME_ALPHA"
                                            className="bg-transparent border border-[#333] p-3 text-[#00f0ff] font-mono outline-none focus:border-[#00f0ff]"
                                            value={formData.identityHash}
                                            onChange={(e) => setFormData({ ...formData, identityHash: e.target.value })}
                                        />
                                    </div>

                                    {/* ACCESS KEY */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-mono text-secondary">ACCESS_KEY</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="bg-transparent border border-[#333] p-3 text-[#00f0ff] font-mono outline-none focus:border-[#00f0ff]"
                                            value={formData.accessKey}
                                            onChange={(e) => setFormData({ ...formData, accessKey: e.target.value })}
                                        />
                                    </div>

                                    {/* NODE ORIGIN */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-mono text-secondary">NODE_ORIGIN</label>
                                        <select
                                            className="bg-black border border-[#333] p-3 text-[#00f0ff] font-mono outline-none focus:border-[#00f0ff]"
                                            value={formData.nodeOrigin}
                                            onChange={(e) => setFormData({ ...formData, nodeOrigin: e.target.value })}
                                        >
                                            <option value="SECTOR_07">SECTOR 07 (Ruins)</option>
                                            <option value="NEO_TOKYO">NEO TOKYO (Core)</option>
                                            <option value="LUNAR_COLONY">LUNAR COLONY</option>
                                            <option value="UNKNOWN">UNKNOWN PROXY</option>
                                        </select>
                                    </div>

                                    {/* LATENCY PREF */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-mono text-secondary">LATENCY_PREF</label>
                                        <select
                                            className="bg-black border border-[#333] p-3 text-[#00f0ff] font-mono outline-none focus:border-[#00f0ff]"
                                            value={formData.latencyPref}
                                            onChange={(e) => setFormData({ ...formData, latencyPref: e.target.value })}
                                        >
                                            <option value="ULTRA_LOW">ULTRA_LOW (Risk: High)</option>
                                            <option value="STANDARD">STANDARD (Masked)</option>
                                            <option value="HIGH">HIGH (Tor/VPN)</option>
                                        </select>
                                    </div>

                                    {/* EMAIL (FULL CONSTANT CONTACT) */}
                                    <div className="col-span-1 md:col-span-2 flex flex-col gap-1 mt-2">
                                        <label className="text-[10px] font-mono text-secondary">FREQUENCY_LOCK (EMAIL)</label>
                                        <input
                                            type="email"
                                            placeholder="email@provider.com"
                                            className="bg-transparent border border-[#333] p-3 text-[#00f0ff] font-mono outline-none focus:border-[#00f0ff]"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                                        />
                                    </div>

                                    {/* SUBMIT */}
                                    <button
                                        type="button"
                                        onClick={handleJoin}
                                        className="col-span-1 md:col-span-2 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff] py-4 mt-2 font-bold hover:bg-[#00f0ff] hover:text-black transition-all uppercase tracking-widest"
                                    >
                                        {joinState === 'HACKING' ? 'ESTABLISHING HANDSHAKE...' : 'INITIATE_UPLINK'}
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
                                    <button
                                        onClick={() => setTransmissionOffset(prev => Math.max(0, prev - 1))}
                                        disabled={!canGoBack}
                                        style={{
                                            border: '1px solid #333',
                                            width: '30px',
                                            height: '30px',
                                            display: 'grid',
                                            placeItems: 'center',
                                            cursor: canGoBack ? 'pointer' : 'not-allowed',
                                            opacity: canGoBack ? 1 : 0.3,
                                            transition: 'opacity 0.2s',
                                            color: canGoBack ? 'inherit' : '#333'
                                        }}
                                    >
                                        &lt;
                                    </button>
                                    <button
                                        onClick={() => setTransmissionOffset(prev => Math.min(totalPages - 1, prev + 1))}
                                        disabled={!canGoForward}
                                        style={{
                                            border: '1px solid #333',
                                            width: '30px',
                                            height: '30px',
                                            display: 'grid',
                                            placeItems: 'center',
                                            cursor: canGoForward ? 'pointer' : 'not-allowed',
                                            opacity: canGoForward ? 1 : 0.3,
                                            transition: 'opacity 0.2s',
                                            color: canGoForward ? 'inherit' : '#333'
                                        }}
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>

                            <div className="transmissions-grid">
                                {loading ? (
                                    // Loading skeleton
                                    Array(4).fill(0).map((_, i) => (
                                        <div key={`skeleton-${i}`} className="transmission-item">
                                            <div style={{ height: '120px', background: '#111', marginBottom: '20px', display: 'grid', placeItems: 'center' }} className="animate-pulse">
                                                <div className="mono text-[#333] text-xs">LOADING_TRANSMISSION_{i + 1}</div>
                                            </div>
                                            <div style={{ height: '10px', background: '#222', width: '60px', marginBottom: '10px' }} className="animate-pulse"></div>
                                            <div style={{ height: '15px', background: '#222', width: '100%' }} className="animate-pulse"></div>
                                        </div>
                                    ))
                                ) : safePosts.slice(transmissionOffset * TRANSMISSION_ITEMS, (transmissionOffset + 1) * TRANSMISSION_ITEMS).length > 0 ? (
                                    // Display actual posts
                                    safePosts.slice(transmissionOffset * TRANSMISSION_ITEMS, (transmissionOffset + 1) * TRANSMISSION_ITEMS).map((post, i) => (
                                        <Link
                                            key={post.id}
                                            to={`/blog/${post.id}`}
                                            className="transmission-item group"
                                            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                                        >
                                            {/* Image Container */}
                                            <div style={{
                                                height: '120px',
                                                background: '#111',
                                                marginBottom: '20px',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                border: '1px solid #333'
                                            }} className="group-hover:border-[#00f0ff] transition-colors">
                                                {post.image_url ? (
                                                    <img
                                                        src={post.image_url}
                                                        alt={post.title}
                                                        loading="lazy"
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            opacity: 0.8,
                                                            transition: 'all 0.3s ease',
                                                            filter: 'grayscale(100%)'
                                                        }}
                                                        className="group-hover:opacity-100 group-hover:filter-none"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.parentElement.innerHTML = '<div style="display:grid;place-items:center;height:100%;color:#333;font-family:monospace;font-size:0.8rem">[IMG_NULL]</div>';
                                                        }}
                                                    />
                                                ) : (
                                                    <div style={{
                                                        display: 'grid',
                                                        placeItems: 'center',
                                                        height: '100%',
                                                        color: '#333',
                                                        fontFamily: 'monospace',
                                                        fontSize: '0.8rem'
                                                    }}>
                                                        [IMG_{String(i + 1).padStart(2, '0')}]
                                                    </div>
                                                )}
                                                <div className="scanline-overlay absolute inset-0 opacity-20 pointer-events-none"></div>
                                            </div>

                                            {/* Category Tag */}
                                            <div className="mono text-accent" style={{ fontSize: '0.6rem', marginBottom: '5px' }}>
                                                <span className="inline-block w-1 h-1 bg-accent rounded-full mr-2 mb-0.5"></span>
                                                {(post.category || 'SYSTEM').toUpperCase()}
                                            </div>

                                            {/* Title */}
                                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem', lineHeight: '1.3' }} className="group-hover:text-[#00f0ff] transition-colors">
                                                {post.title}
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    // Empty state
                                    <div className="col-span-4 text-center text-secondary mono py-10 text-sm border border-[#333] bg-black/50 p-6">
                                        NO_ACTIVE_TRANSMISSIONS // STANDBY_MODE
                                    </div>
                                )}
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
