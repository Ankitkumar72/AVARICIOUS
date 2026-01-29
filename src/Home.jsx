import { useState, useRef, useEffect, useCallback } from 'react'
import './index.css' // Global styles
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Header from './Header'
import cyborgFeedImg from './assets/ai-generated-8343518_1920.jpg';
import defaultAuthorImg from './assets/8machine-_-Jw7p2A369As-unsplash.jpg';
import { useBlog } from './context/BlogContext';
import DataStream from './components/DataStream';
import NewsGrid from './components/NewsGrid';
import BootSequence from './components/BootSequence';
import Footer from './components/Footer';
import TransmissionCard from './components/TransmissionCard';

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
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const newsGridRef = useRef(null);
    const { posts, loading, error } = useBlog();


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
    const [duplicateError, setDuplicateError] = useState(false);

    // Dynamic Latency Jitter
    const [latency, setLatency] = useState(14);
    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(12 + Math.floor(Math.random() * 8)); // 12-19ms
        }, 800);
        return () => clearInterval(interval);
    }, []);

    const handleJoin = async () => {
        // 1. Validation (Only email now)
        if (!formData.email.includes('@')) {
            alert("INVALID_SIGNAL: VALID EMAIL REQUIRED.");
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
                        email: formData.email,
                        identity_hash: formData.email.split('@')[0], // Use email prefix as identity
                        node_origin: 'SECTOR_07',
                        latency_pref: 'STANDARD'
                    }]);

                if (error) {
                    if (error.code === '23505') { // Unique violation
                        setDuplicateError(true);
                    } else {
                        throw error;
                    }
                    setJoinState('IDLE');
                } else {
                    // TRIGGER EMAIL Send
                    await fetch('/api/subscribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: formData.email })
                    });

                    setJoinState('JOINED');
                    setTimeout(() => {
                        navigate('/welcome');
                    }, 1000);
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
                                    <div className="text-[#00f0ff] font-mono text-sm">ID: {formData.email}</div>
                                    <div className="text-gray-400 font-mono text-xs mt-2">AWAITING CLANDESTINE BURST...</div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 w-full max-w-[700px] relative z-10 p-6 border border-[#333] bg-black/50 backdrop-blur-md">
                                    {/* Single Email Input */}
                                    <input
                                        type="email"
                                        placeholder="ENTER_ID_KEY"
                                        className="flex-1 bg-transparent border border-[#333] p-4 text-secondary font-mono outline-none focus:border-[#00f0ff] text-sm placeholder:text-secondary/50"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            setDuplicateError(false);
                                        }}
                                        onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                                    />

                                    {/* Submit Button */}
                                    <button
                                        type="button"
                                        onClick={handleJoin}
                                        className="bg-white text-black border-none px-8 py-4 font-bold hover:bg-gray-200 transition-all uppercase tracking-widest text-sm"
                                    >
                                        {joinState === 'HACKING' ? 'CONNECTING...' : 'CONNECT'}
                                    </button>
                                </div>
                            )}

                            {/* Duplicate Error Message */}
                            {duplicateError && (
                                <div className="text-red-500 font-mono text-sm mt-4 animate-pulse">
                                    ⚠ ID ALREADY IN THE COLLECTIVE
                                </div>
                            )}

                            {/* Decorative Lines */}
                            <div className="deco-line left"></div>
                            <div className="deco-line right"></div>
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
