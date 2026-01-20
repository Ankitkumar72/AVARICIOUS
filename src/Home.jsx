import { useState } from 'react'
import './index.css' // Global styles
import { Link } from 'react-router-dom'

// Images will be verified after basic structure is up
// Using placeholders for now where images are missing or broken
// import cyborgImg from './assets/cyborg_woman.png'
// import curversImg from './assets/abstract_curves.png'
// import lockImg from './assets/lock_secure.png'
// import chipImg from './assets/chip_macro.png'

function Home() {
    return (
        <div className="app-main-wrapper" style={{ width: '100vw', minHeight: '100vh', display: 'grid', placeItems: 'center' }}>

            {/* Boxed Layout Container */}
            <div className="app-layout">

                {/* Corner Markers */}
                <div className="corner-marker corner-top-left"></div>
                <div className="corner-marker corner-top-right"></div>
                <div className="corner-marker corner-bottom-left"></div>
                <div className="corner-marker corner-bottom-right"></div>

                {/* Header */}
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '25px 50px',
                    borderBottom: '1px solid var(--grid-color)',
                    fontSize: '0.8rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ background: '#00f0ff', width: '30px', height: '30px', display: 'grid', placeItems: 'center', color: 'black', fontWeight: 'bold' }}>#</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '1px' }}>PIXY<span className="text-accent">|</span>NEWS</div>
                        <span className="mono text-secondary" style={{ fontSize: '0.7rem' }}>SYS.VER.2.0.4</span>
                    </div>

                    <div className="mono text-secondary" style={{ display: 'flex', gap: '40px' }}>
                        <span>LAT: 40.7128</span>
                        <span>LONG: -74.0060</span>
                        <span className="text-accent" style={{ textShadow: '0 0 5px #00f0ff' }}>LIVE FEED</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span className="mono">SEARCH 🔍</span>
                        <div style={{ width: '20px', height: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
                            <div style={{ width: '100%', height: '2px', background: 'white' }}></div>
                            <div style={{ width: '100%', height: '2px', background: 'white' }}></div>
                            <div style={{ width: '100%', height: '2px', background: 'white' }}></div>
                        </div>
                    </div>
                </header>

                {/* Main Hero Grid */}
                <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', minHeight: '80vh', borderBottom: '1px solid var(--grid-color)' }}>

                    {/* Left Column */}
                    <div style={{ padding: '80px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid var(--grid-color)', position: 'relative' }}>

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

                        <h1 style={{ fontSize: '7rem', lineHeight: '0.9', margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '-2px' }}>
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
                    <Link to="/blog/synthetic-horizon" className="clickable-image" style={{ position: 'relative', overflow: 'hidden', background: '#050505', borderLeft: '1px solid var(--grid-color)', display: 'block', textDecoration: 'none' }}>
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,240,255,0.05) 0%, rgba(0,0,0,0) 50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="mono text-secondary">[CYBORG_VISUAL_FEED]</span>
                        </div>
                        <div className="mono text-accent" style={{ position: 'absolute', bottom: '30px', right: '30px', fontSize: '0.7rem' }}>IMG_SEQ_001.RAW</div>
                    </Link>
                </section>

                {/* Stats Row */}
                <section style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    borderBottom: '1px solid var(--grid-color)',
                    height: '180px'
                }}>
                    <div style={{ padding: '30px 40px', borderRight: '1px solid var(--grid-color)', position: 'relative' }}>
                        <div className="mono text-secondary" style={{ fontSize: '0.7rem', marginBottom: '10px' }}>MARKET_INDEX</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>14,204.91</div>
                        <div className="text-accent mono" style={{ marginTop: '5px' }}>↗ +2.4%</div>
                    </div>

                    <div style={{ padding: '30px 40px', borderRight: '1px solid var(--grid-color)' }}>
                        <div className="mono text-secondary" style={{ fontSize: '0.7rem', marginBottom: '10px' }}>NODES_ACTIVE</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>8,992</div>
                        <div className="text-secondary mono" style={{ marginTop: '5px' }}>Global Cluster</div>
                    </div>

                    <div style={{ padding: '30px 40px', borderRight: '1px solid var(--grid-color)', position: 'relative' }}>
                        <div className="mono text-secondary" style={{ fontSize: '0.7rem', marginBottom: '10px' }}>DATA_STREAM</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>402 TB/s</div>
                        <div className="text-secondary mono" style={{ marginTop: '5px' }}>Encryption: AES-256</div>
                    </div>

                    <div style={{ padding: '30px 40px', position: 'relative' }}>
                        <div className="mono text-secondary" style={{ fontSize: '0.7rem', marginBottom: '10px' }}>WEATHER_SAT</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>24°C</div>
                        <div className="text-secondary mono" style={{ marginTop: '5px' }}>Sector 7 Clear</div>
                    </div>
                </section>

                {/* Three Column News Grid */}
                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid var(--grid-color)' }}>

                    {/* Col 1 */}
                    <div style={{ borderRight: '1px solid var(--grid-color)', paddingBottom: '40px' }}>
                        <div style={{ height: '300px', background: '#111', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--grid-color)' }}>
                            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to top, #0a0a0a, #222)', display: 'grid', placeItems: 'center' }}>
                                <span className="mono text-secondary">[CHIP_MACRO]</span>
                            </div>
                        </div>
                        <div style={{ padding: '30px 40px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <span className="mono" style={{ background: '#222', padding: '2px 6px', fontSize: '0.7rem' }}>HARDWARE</span>
                                <span className="mono text-secondary" style={{ fontSize: '0.7rem' }}>14:02 UTC</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', lineHeight: '1.2', margin: '0 0 15px 0' }}>Quantum Chip Throughput Exceeds Theoretical Limits</h3>
                            <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>Researchers at the Void Institute have successfully stabilized a 1000-qubit processor at room temperature, shattering previous computational barriers.</p>
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div style={{ borderRight: '1px solid var(--grid-color)', paddingBottom: '40px' }}>
                        <div style={{ height: '300px', background: '#111', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--grid-color)' }}>
                            <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, #333 0%, #000 70%)', display: 'grid', placeItems: 'center' }}>
                                <div style={{ width: '150px', height: '150px', border: '2px solid white', borderRadius: '50%', boxShadow: '0 0 20px white' }}></div>
                            </div>
                        </div>
                        <div style={{ padding: '30px 40px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <span className="mono" style={{ background: '#222', padding: '2px 6px', fontSize: '0.7rem' }}>NETWORK</span>
                                <span className="mono text-secondary" style={{ fontSize: '0.7rem' }}>13:45 UTC</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', lineHeight: '1.2', margin: '0 0 15px 0' }}>The Great Firewall of Sector 4 Has Fallen</h3>
                            <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>Unauthorized data streams are flooding the local subnet. Authorities are scrambling to patch the zero-day exploit found in the legacy infrastructure.</p>
                        </div>
                    </div>

                    {/* Col 3 */}
                    <div style={{ paddingBottom: '40px' }}>
                        <div style={{ height: '300px', background: '#111', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--grid-color)' }}>
                            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #111 0%, #333 100%)', display: 'grid', placeItems: 'center' }}>
                                <div style={{ width: '60px', height: '80px', border: '5px solid #888', borderRadius: '10px 10px 0 0', borderBottom: 'none' }}></div>
                                <div style={{ width: '80px', height: '60px', background: '#888', borderRadius: '5px', marginTop: '-40px' }}></div>
                            </div>
                        </div>
                        <div style={{ padding: '30px 40px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <span className="mono" style={{ background: '#222', padding: '2px 6px', fontSize: '0.7rem' }}>SECURITY</span>
                                <span className="mono text-secondary" style={{ fontSize: '0.7rem' }}>12:10 UTC</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', lineHeight: '1.2', margin: '0 0 15px 0' }}>Biometric Data Leak Affects 30 Million Androids</h3>
                            <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>A breach in the central registry has exposed sensitive memory cores. Recall protocols have been initiated for all affected units.</p>
                        </div>
                    </div>
                </section>

                {/* Subscription Section */}
                <section style={{ padding: '100px 0', borderBottom: '1px solid var(--grid-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div className="mono text-accent" style={{ letterSpacing: '4px', fontSize: '0.8rem', marginBottom: '20px' }}>SYSTEM NOTIFICATION</div>
                    <h2 style={{ fontSize: '3.5rem', textAlign: 'center', margin: '0 0 40px 0', lineHeight: '1' }}>SUBSCRIBE TO<br />THE BLUEPRINT</h2>
                    <div style={{ display: 'flex', width: '100%', maxWidth: '500px', border: '1px solid #333' }}>
                        <input type="text" placeholder="ENTER_ID_KEY" style={{ flex: 1, background: 'transparent', border: 'none', padding: '20px', color: 'white', fontFamily: 'var(--font-mono)', outline: 'none' }} />
                        <button style={{ background: 'white', color: 'black', padding: '0 30px', fontWeight: 'bold' }}>CONNECT</button>
                    </div>
                    {/* Decorative Lines */}
                    <div style={{ position: 'absolute', top: '50%', left: '0', width: '25%', height: '1px', background: 'linear-gradient(to right, transparent, #333)' }}></div>
                    <div style={{ position: 'absolute', top: '50%', right: '0', width: '25%', height: '1px', background: 'linear-gradient(to left, transparent, #333)' }}></div>
                </section>

                {/* Latest Transmissions */}
                <section style={{ borderBottom: '1px solid var(--grid-color)' }}>
                    <div style={{ padding: '20px 40px', borderBottom: '1px solid var(--grid-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '6px', height: '6px', background: '#00f0ff' }}></div>
                            <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>LATEST TRANSMISSIONS</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ border: '1px solid #333', width: '30px', height: '30px', display: 'grid', placeItems: 'center' }}>&lt;</button>
                            <button style={{ border: '1px solid #333', width: '30px', height: '30px', display: 'grid', placeItems: 'center' }}>&gt;</button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        {['INFRASTRUCTURE', 'MANUFACTURING', 'SOFTWARE', 'ORBITAL'].map((tag, i) => (
                            <div key={i} style={{ padding: '20px', borderRight: i < 3 ? '1px solid var(--grid-color)' : 'none' }}>
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
                <footer style={{ padding: '40px 40px 20px 40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>PIXY<span className="text-accent">|</span>NEWS</div>
                            <div className="text-secondary" style={{ fontSize: '0.8rem', maxWidth: '300px' }}>Architectural grid-based news terminal.<br />Copyright ©2026 System Core. All rights reserved.</div>
                        </div>
                        <div className="mono text-secondary" style={{ display: 'flex', gap: '30px', fontSize: '0.8rem' }}>
                            <a href="#">PROTOCOL</a>
                            <a href="#">MANIFESTO</a>
                            <a href="#">JOIN NETWORK</a>
                            <a href="#">LEGAL</a>
                        </div>
                    </div>

                    {/* Ticker */}
                    <div style={{ borderTop: '1px solid #333', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#00f0ff' }} className="mono">
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
