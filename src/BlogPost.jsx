import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import './index.css';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import { supabase } from './supabaseClient';
import defaultAuthorImg from './assets/8machine-_-Jw7p2A369As-unsplash.jpg';
import { initialPosts } from './data/initialPosts';

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: true,
    theme: 'dark',
    themeVariables: {
        primaryColor: '#00f0ff',
        primaryTextColor: '#fff',
        primaryBorderColor: '#00f0ff',
        lineColor: '#00f0ff',
        secondaryColor: '#1a1a1a',
        tertiaryColor: '#2a2a2a'
    }
});

// Custom component for rendering mermaid diagrams
const MermaidDiagram = ({ chart }) => {
    const [svg, setSvg] = useState('');
    const [id] = useState(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

    useEffect(() => {
        if (chart) {
            mermaid.render(id, chart).then(({ svg }) => {
                setSvg(svg);
            }).catch(err => {
                console.error('Mermaid render error:', err);
            });
        }
    }, [chart, id]);

    return <div dangerouslySetInnerHTML={{ __html: svg }} className="mermaid-diagram" />;
};

function BlogPost() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch specific post
        const fetchPost = async () => {
            setLoading(true);

            // Try fetching by slug first
            let { data, error } = await supabase
                .from('news_posts')
                .select('*')
                .eq('slug', slug)
                .single();

            // If slug lookup failed, try by ID (for posts without slugs)
            if (!data) {
                const idLookup = await supabase
                    .from('news_posts')
                    .select('*')
                    .eq('id', slug)
                    .single();

                data = idLookup.data;
                error = idLookup.error;
            }

            if (data) {
                setPost(data);
            } else {
                // FALLBACK: If database queries failed, try checking against local initialPosts
                // This is for legacy support or static data
                const localPost = initialPosts.find(p => p.slug === slug || p.id.toString() === slug);
                if (localPost) {
                    setPost(localPost);
                } else {
                    console.warn(`Post not found for slug: ${slug}`);
                }
            }
            setLoading(false);
        };

        if (slug) {
            fetchPost();
        }
    }, [slug]);

    // Add data-labels to table cells for mobile responsiveness
    useEffect(() => {
        if (!post) return;

        // Small timeout to ensure DOM is ready after ReactMarkdown renders
        const timer = setTimeout(() => {
            const tables = document.querySelectorAll('.markdown-content table');
            tables.forEach(table => {
                const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.innerText.trim());
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    cells.forEach((cell, index) => {
                        if (headers[index]) {
                            cell.setAttribute('data-label', headers[index]);
                        }
                    });
                });
            });
        }, 100);

        return () => clearTimeout(timer);
    }, [post]);

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
                <div className="mono">ERROR: FILE_NOT_FOUND [{slug}]</div>
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
                                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <img src={defaultAuthorImg} alt="Author" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                                        <span>{post.author || 'UNIT_ADMIN'}</span>
                                    </div>
                                </div>
                                {post.custom_timestamp && (
                                    <div className="meta-item">
                                        <div className="text-secondary" style={{ marginBottom: '4px' }}>TIMESTAMP</div>
                                        <div className="text-accent">{post.custom_timestamp}</div>
                                    </div>
                                )}
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

                        <div className="sidebar-map" style={{ overflow: 'hidden' }}>
                            <img src={defaultAuthorImg} alt="Author Location" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                        </div>
                    </aside>

                    {/* Main Article Content */}
                    <main style={{ paddingTop: '30px', paddingLeft: '60px', paddingRight: '60px', paddingBottom: '60px', borderRight: '1px solid var(--grid-color)' }}>

                        {/* Article Metadata - Shows custom timestamp and parsed metadata */}
                        {(post.custom_timestamp) && (
                            <div className="mono" style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--grid-color)' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', fontSize: '0.85rem' }}>
                                    {post.custom_timestamp && (
                                        <div>
                                            <div className="text-secondary" style={{ marginBottom: '5px' }}>TIMESTAMP:</div>
                                            <div className="text-accent">{post.custom_timestamp}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="markdown-content">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const language = match ? match[1] : '';

                                        // Render Mermaid diagrams
                                        if (language === 'mermaid') {
                                            return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
                                        }

                                        // Regular code blocks
                                        return (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    }
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        <div className="article-divider"></div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="mono text-accent" style={{ fontSize: '0.7rem', marginBottom: '5px' }}>DECRYPT_NEXT_LOG →</div>
                            <Link to="/archive" className="next-article-link">
                                &lt;&lt; REVERT_TO_CORE_LOGS //
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
                {/* Footer Navigation */}
                {/* Footer Navigation */}
                <footer className="footer-simple mono flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 p-10 text-[0.8rem] tracking-widest flex-wrap">
                    <Link to="/core-logs" className="text-secondary hover-accent" style={{ textDecoration: 'none' }}>CORE_LOGS</Link>
                    <Link to="/neural-synapse" className="text-secondary hover-accent" style={{ textDecoration: 'none' }}>NEURAL_SYNAPSE</Link>
                    <Link to="/join-network" className="text-secondary hover-accent" style={{ textDecoration: 'none' }}>JOIN_NETWORK</Link>
                    <Link to="/system-integrity" className="text-secondary hover-accent" style={{ textDecoration: 'none' }}>SYSTEM_INTEGRITY</Link>
                </footer>

            </div>
        </div>
    );
}

export default BlogPost;
