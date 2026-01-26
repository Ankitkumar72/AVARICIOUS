import React, { useState } from 'react';
import Header from '../Header';
import archwayImg from '../assets/archway.png';
import '../index.css';

const JoinNetwork = () => {
    const [formData, setFormData] = useState({
        identityHash: '',
        accessKey: '',
        nodeOrigin: 'SECTOR_07',
        latencyPref: 'ULTRA_LOW'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="app-main-wrapper" style={{ alignItems: 'flex-start', paddingTop: 0, overflow: 'hidden' }}>
            <div className="app-layout" style={{ minHeight: '100vh', border: 'none', position: 'relative', display: 'flex', flexDirection: 'column' }}>

                <Header />

                {/* Main Content Grid */}
                <div className="join-network-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    flex: 1,
                    height: 'calc(100vh - 60px)' // subtract header height approx
                }}>

                    {/* Left Panel - Visual */}
                    <div style={{
                        position: 'relative',
                        borderRight: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '60px',
                        overflow: 'hidden'
                    }}>
                        {/* Background Image Layer */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 0,
                            backgroundImage: `url(${archwayImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.4,
                            filter: 'grayscale(100%) contrast(1.2)'
                        }}></div>

                        {/* Gradient Overlay */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 1,
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)'
                        }}></div>

                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <div className="mono" style={{ fontSize: '0.7rem', letterSpacing: '2px', color: '#888', marginBottom: '20px' }}>
                                SYSTEM PROTOCOL // 0X442
                            </div>
                            <h1 style={{
                                fontSize: '4.5rem',
                                lineHeight: '0.9',
                                fontWeight: 'bold',
                                color: 'white',
                                marginBottom: '40px',
                                textTransform: 'uppercase'
                            }}>
                                JOIN THE<br />COLLECTIVE
                            </h1>
                            <p className="mono" style={{
                                fontSize: '0.8rem',
                                color: '#aaa',
                                maxWidth: '400px',
                                lineHeight: '1.6'
                            }}>
                                Access the decentralized feed. Encrypted intelligence gathering for the post-information era. Required for protocol-level interaction.
                            </p>
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div style={{
                        padding: '80px 60px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative',
                        background: '#040404'
                    }}>
                        <div style={{ maxWidth: '400px', width: '100%' }}>

                            {/* Form Field: IDENTITY_HASH */}
                            <div style={{ marginBottom: '40px' }}>
                                <label className="mono" style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '10px', letterSpacing: '1px' }}>
                                    IDENTITY_HASH
                                </label>
                                <input
                                    type="text"
                                    name="identityHash"
                                    placeholder="USER_NAME_ALPHA"
                                    value={formData.identityHash}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        background: 'transparent',
                                        border: '1px solid #333',
                                        padding: '15px',
                                        color: 'white',
                                        fontFamily: 'monospace',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            {/* Form Field: ACCESS_KEY */}
                            <div style={{ marginBottom: '40px' }}>
                                <label className="mono" style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '10px', letterSpacing: '1px' }}>
                                    ACCESS_KEY
                                </label>
                                <input
                                    type="password"
                                    name="accessKey"
                                    placeholder="............"
                                    value={formData.accessKey}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        background: 'transparent',
                                        border: '1px solid #333',
                                        padding: '15px',
                                        color: 'white',
                                        fontFamily: 'monospace',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            {/* Flex Row for Dropdowns */}
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
                                <div style={{ flex: 1 }}>
                                    <label className="mono" style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '10px', letterSpacing: '1px' }}>
                                        NODE_ORIGIN
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <select
                                            name="nodeOrigin"
                                            value={formData.nodeOrigin}
                                            onChange={handleChange}
                                            style={{
                                                width: '100%',
                                                background: 'transparent',
                                                border: '1px solid #333',
                                                padding: '15px',
                                                color: 'white',
                                                fontFamily: 'monospace',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                appearance: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="SECTOR_07" style={{ color: 'black' }}>SECTOR_07</option>
                                            <option value="SECTOR_09" style={{ color: 'black' }}>SECTOR_09</option>
                                            <option value="PROXY_NODE" style={{ color: 'black' }}>PROXY_NODE</option>
                                        </select>
                                        <div style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#666', fontSize: '0.7rem' }}>▼</div>
                                    </div>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label className="mono" style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '10px', letterSpacing: '1px' }}>
                                        LATENCY_PREF
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <select
                                            name="latencyPref"
                                            value={formData.latencyPref}
                                            onChange={handleChange} // Corrected handler name
                                            style={{
                                                width: '100%',
                                                background: 'transparent',
                                                border: '1px solid #333',
                                                padding: '15px',
                                                color: 'white',
                                                fontFamily: 'monospace',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                appearance: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="ULTRA_LOW" style={{ color: 'black' }}>ULTRA_LOW</option>
                                            <option value="BALANCED" style={{ color: 'black' }}>BALANCED</option>
                                            <option value="SECURE" style={{ color: 'black' }}>SECURE</option>
                                        </select>
                                        <div style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#666', fontSize: '0.7rem' }}>▼</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button style={{
                                width: '100%',
                                background: 'white',
                                color: 'black',
                                border: 'none',
                                padding: '20px',
                                fontFamily: 'monospace',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span>INITIALIZE_CONNECTION</span>
                                <span>→</span>
                            </button>

                            {/* Status Footer INSIDE Right Panel */}
                            <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#444' }} className="mono">
                                <span>STATUS: AWAITING_INPUT</span>
                                <span>0% PACKETS RECEIVED</span>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom Footer Bar (Page specific) */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    padding: '20px 40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.6rem',
                    color: '#444',
                    background: 'black',
                    zIndex: 10
                }} className="mono">
                    <div>© 2052 PIXY_NETWORKS</div>
                    <div style={{ display: 'flex', gap: '40px' }}>
                        <span>ENCRYPTION: AES-256</span>
                        <span>SIGNAL: STABLE</span>
                        <span>LATENCY: 14MS</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default JoinNetwork;
