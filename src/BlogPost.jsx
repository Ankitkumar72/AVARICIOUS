import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './index.css';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import { supabase } from './supabaseClient';
import { initialPosts } from './data/initialPosts';

function BlogPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch specific post
        const fetchPost = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('news_posts')
                .select('*')
                .eq('id', id)
                .single();

            if (data) {
                setPost(data);
            } else {
                // FALLBACK: Check local initialPosts
                const localPost = initialPosts.find(p => p.id.toString() === id);
                if (localPost) {
                    setPost(localPost);
                }
            }
            setLoading(false);
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="app-main-wrapper" style={{ display: 'grid', placeItems: 'center', height: '100vh', color: 'var(--accent-color)' }}>
                <div className="mono">LOADING_ARCHIVE_DATA...</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="app-main-wrapper" style={{ display: 'grid', placeItems: 'center', height: '100vh', color: 'red' }}>
                <div className="mono">ERROR: FILE_NOT_FOUND [{id}]</div>
            </div>
        );
    }

    return (
        <div className="app-main-wrapper">
            <div className="app-layout">
                <div className="corner-marker corner-top-left"></div>
                <div className="corner-marker corner-top-right"></div>
                <div className="corner-marker corner-bottom-left"></div>
                <div className="corner-marker corner-bottom-right"></div>

                {/* Header */}
                <Header />

                {/* Hero Title */}
                <section style={{ padding: '80px 50px', borderBottom: '1px solid var(--grid-color)' }}>
                    <h1 className="hero-title" style={{ margin: 0, fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                        {post.title}
                    </h1>
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
                                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>UNIT_ADMIN</div>
                                </div>
                                <div className="meta-item">
                                    <div className="text-secondary" style={{ marginBottom: '4px' }}>TIMESTAMP (UTC)</div>
                                    <div>{new Date(post.updated_at).toLocaleDateString()}<br />{new Date(post.updated_at).toLocaleTimeString()}</div>
                                </div>
                                <div className="meta-item">
                                    <div className="text-secondary" style={{ marginBottom: '4px' }}>COORDINATES</div>
                                    <div>{post.coordinates || 'UNKNOWN'}</div>
                                </div>
                                <div className="meta-item">
                                    <div className="text-secondary" style={{ marginBottom: '4px' }}>READ TIME</div>
                                    <div>{Math.ceil((post.content?.length || 0) / 500)} MIN</div>
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

                        <div className="markdown-content">
                            <ReactMarkdown>
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        <div className="article-divider"></div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="mono text-accent" style={{ fontSize: '0.7rem', marginBottom: '5px' }}>NEXT ARTICLE</div>
                            <Link to="/" className="next-article-link">
                                RETURN TO INDEX <span>→</span>
                            </Link>
                        </div>

                    </main>

                    {/* Right Sidebar */}
                    <aside className="blog-sidebar-right">
                        <div style={{ marginBottom: '30px' }}>
                            <div className="mono text-accent" style={{ fontSize: '0.8rem', marginBottom: '15px' }}>[ RELATED TAGS ]</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {['#AI', '#SYSTEM', '#LOG'].map(tag => (
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
