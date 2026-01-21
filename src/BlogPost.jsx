import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Header from './Header';

function BlogPost() {
    return (
        <div className="app-main-wrapper">
            <div className="app-layout">
                <div className="corner-marker corner-top-left"></div>
                <div className="corner-marker corner-top-right"></div>
                <div className="corner-marker corner-bottom-left"></div>
                <div className="corner-marker corner-bottom-right"></div>

                {/* Header */}
                <Header />

                {/* Breadcrumb Section */}
                <div style={{ padding: '10px 50px', borderBottom: '1px solid var(--grid-color)', fontSize: '0.7rem' }} className="mono text-secondary">
                    <Link to="/" style={{ color: 'inherit' }}>HOME</Link> / EDITORIAL / TECH
                </div>

                {/* Hero Title */}
                <section style={{ padding: '80px 50px', borderBottom: '1px solid var(--grid-color)' }}>
                    <h1 className="hero-title" style={{ margin: 0 }}>
                        THE SYNTHETIC<br />
                        HORIZON<span style={{ color: '#444' }}>:</span> AI<br />
                        IN ARCHITECTURE
                    </h1>
                    {/* Subtle background image hint could go here */}
                </section>

                {/* Main Content Grid */}
                <div className="blog-layout">

                    {/* Left Sidebar */}
                    <aside className="blog-sidebar-left">
                        <div className="sidebar-text-group">
                            <div className="status-block">
                                <div className="mono text-accent" style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px' }}>STATUS : ARCHIVED</div>
                                <div style={{ width: '100%', height: '2px', background: 'var(--accent-color)' }}></div>
                            </div>

                            <div className="mono sidebar-meta-list">
                                <div className="meta-item">
                                    <div className="text-secondary" style={{ marginBottom: '4px' }}>AUTHOR</div>
                                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>DR. A. SILVA</div>
                                </div>
                                <div className="meta-item">
                                    <div className="text-secondary" style={{ marginBottom: '4px' }}>TIMESTAMP (UTC)</div>
                                    <div>2026-10-27<br />14:02Z</div>
                                </div>
                                <div className="meta-item">
                                    <div className="text-secondary" style={{ marginBottom: '4px' }}>COORDINATES</div>
                                    <div>34.05° N,<br />118.24° W</div>
                                </div>
                                <div className="meta-item">
                                    <div className="text-secondary" style={{ marginBottom: '4px' }}>READ TIME</div>
                                    <div>08 MIN / 1,402 WD</div>
                                </div>
                            </div>
                        </div>

                        <div className="sidebar-map">
                            {/* Map Placeholder */}
                            <div style={{ width: '100%', height: '100%', opacity: 0.2, background: 'repeating-linear-gradient(45deg, #222 0px, #222 10px, #111 10px, #111 20px)' }}></div>
                        </div>
                    </aside>

                    {/* Main Article Content */}
                    <main style={{ padding: '60px', borderRight: '1px solid var(--grid-color)' }}>

                        {/* Lead Text */}
                        {/* Lead Text */}
                        <div className="article-lead">
                            Exploring the intersection of generative algorithms and physical space, we question if the blueprint of the future is drawn by hand or hallucinated by code.
                        </div>

                        {/* Body Text */}
                        <div className="article-body">
                            <span className="drop-cap">T</span>
                            he architectural grid has long been the symbol of rational order. From the Roman castrum to the Modernist skyscrapers of Mies van der Rohe, the grid represented control, predictability, and human dominance over the chaos of nature. Today, however, that grid is being re-imagined not by architects, but by neural networks.
                        </div>

                        <p className="article-paragraph">
                            In the heart of the new digital brutalism, we find a paradox. The strict lines of code that govern AI models produce forms that are organic, fluid, and often defy structural logic. <span style={{ color: 'white', textDecoration: 'underline', textDecorationColor: 'var(--accent-color)' }}>Generative design</span> is no longer a tool for optimization but a partner in creation.
                        </p>

                        {/* Subheader */}
                        <h3 className="article-subheader">
                            <span className="text-accent mono" style={{ marginRight: '10px' }}>[01]</span> THE HALLUCINATED STRUCTURE
                        </h3>

                        <p className="article-paragraph">
                            When we feed architectural archives into a diffusion model, what returns is a ghost. Buildings that look familiar but possess alien geometries. Windows that open into voids, staircases that spiral into non-Euclidean spaces. This is the <strong style={{ color: 'white' }}>Synthetic Horizon</strong>.
                        </p>

                        {/* Image Placeholder */}
                        <div className="article-image-container">
                            <div className="article-image-placeholder">
                                <div style={{ width: '50px', height: '50px', background: '#333' }}></div>
                                <div style={{ width: '80px', height: '80px', background: '#444', transform: 'translate(30px, -20px)' }}></div>
                            </div>
                            <div className="mono text-secondary image-caption">
                                <span>FIG 1.1 -- CONCRETE DIFFUSION</span>
                                <span>SIZE: 20MB</span>
                            </div>
                        </div>

                        <p className="article-paragraph">
                            The implication for physical construction is profound. If our tools can dream up structures that ignore gravity, how do we translate them to steel and glass? The answer lies in 3D printing and material science, bridging the gap between the digital hallucination and the tangible world.
                        </p>

                        {/* Subheader */}
                        <h3 className="article-subheader">
                            <span className="text-accent mono" style={{ marginRight: '10px' }}>[02]</span> ZERO-POINT METADATA
                        </h3>

                        <p className="article-paragraph">
                            We are moving towards an architecture of information. A building is no longer just shelter; it is a data set. Every beam, every bolt, every lux of light is quantified. In this <span style={{ textDecoration: 'underline' }}>hyper-measured reality</span>, the role of the architect shifts from designer to curator.
                        </p>

                        {/* Quote */}
                        <blockquote className="article-quote">
                            "The grid is not a prison. It is the lattice upon which the future grows."
                        </blockquote>

                        <p className="article-paragraph">
                            As we stand on this precipice, looking out at a skyline generated by algorithms, we must ask: does the soul of a building reside in the intention of its creator, or in the complexity of its code?
                        </p>

                        <div className="article-divider"></div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="mono text-accent" style={{ fontSize: '0.7rem', marginBottom: '5px' }}>NEXT ARTICLE</div>
                            <Link to="#" className="next-article-link">
                                DIGITAL DECAY IN VR <span>→</span>
                            </Link>
                        </div>

                    </main>

                    {/* Right Sidebar */}
                    <aside className="blog-sidebar-right">
                        <div style={{ marginBottom: '30px' }}>
                            <div className="mono text-accent" style={{ fontSize: '0.8rem', marginBottom: '15px' }}>[ RELATED TAGS ]</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {['#AI', '#ARCHITECTURE', '#BRUTALISM', '#FUTURE', '#GENERATIVE'].map(tag => (
                                    <span key={tag} className="mono" style={{
                                        border: '1px solid #333',
                                        padding: '5px 10px',
                                        fontSize: '0.6rem',
                                        color: '#888',
                                        cursor: 'pointer'
                                    }}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Footer (Simplified) */}
                <footer className="footer-simple mono">
                    <div>
                        <strong>PIXY | NEWS</strong> <span className="text-secondary" style={{ marginLeft: '10px' }}>© 2026 PIXY MEDIA GROUP. ALL RIGHTS RESERVED.</span>
                    </div>
                    <div className="text-secondary footer-simple-links">
                        <span>PRIVACY_PROTOCOL</span>
                        <span>TERMS_OF_USE</span>
                        <span>SYSTEM_STATUS</span>
                    </div>
                </footer>

            </div>
        </div>
    );
}

export default BlogPost;
