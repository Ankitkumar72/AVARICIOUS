
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { useBlog } from '../context/BlogContext';
import defaultCyborg from '../assets/ai-generated-8343518_1920.jpg';

const CoreLogs = () => {
    const { posts, loading, error, fetchPosts } = useBlog();
    const [displayLimit, setDisplayLimit] = useState(4);

    // Force data refresh on visit to ensure new posts appear
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="app-main-wrapper" style={{ background: '#020202', color: '#ccc' }}>
            <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

                {/* Header (Minimal) */}
                <Header minimal={true} />

                {/* Page Title Section - Terminal Style */}
                {/* Page Title Section - Terminal Style */}
                <div className="flex flex-col md:flex-row justify-between md:items-center px-6 md:px-[60px] py-8 md:py-[40px] border-b border-[#222] gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 bg-blue-500"></div>
                            <span className="mono text-xs text-secondary">SYSTEM_VIEW: LIST_MODE</span>
                        </div>
                        <h1 className="hero-title text-4xl md:text-[3rem] tracking-tight m-0">ARCHIVE_LOGS</h1>
                    </div>
                    <div className="mono text-left md:text-right text-xs text-secondary leading-loose">
                        <div>SERVER_TIME: 23:42:01 UTC</div>
                        <div>NODE: US-EAST-4</div>
                        <div>CONN_STATUS: SECURE</div>
                    </div>
                </div>

                {/* Column Headers */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-16 py-4 border-b border-white/5 mono text-xs text-secondary uppercase tracking-wider">
                    <div className="col-span-2">Visual_Ref</div>
                    <div className="col-span-8">Log_Abstract</div>
                    <div className="col-span-2 text-right">Meta_Data</div>
                </div>

                {/* List Container */}
                <div className="archive-list-container flex-1">
                    {error ? (
                        <div className="p-20 text-center mono text-red-500">
                            <div>SYSTEM_CRITICAL_ERROR</div>
                            <div className="text-xs mt-2 text-secondary">{error}</div>
                        </div>
                    ) : posts.length > 0 ? (
                        postItems(posts, displayLimit)
                    ) : (
                        <div className="p-20 text-center mono text-secondary">ARCHIVES_EMPTY</div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="p-10 border-t border-white/10 flex flex-col items-center gap-4 mt-auto">
                    <div className="mono text-xs text-secondary tracking-widest">
                        DISPLAYING {Math.min(displayLimit, posts.length)} OF {posts.length} LOCAL RECORDS
                    </div>
                    {displayLimit < posts.length && (
                        <button
                            onClick={() => setDisplayLimit(prev => prev + 4)}
                            className="mono border border-white/20 px-8 py-3 text-xs hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                            <span className="animate-spin-slow">⟳</span> LOAD_MORE_LOGS
                        </button>
                    )}
                </div>

                {/* Bottom Bar */}
                <div className="px-10 py-4 flex justify-between mono text-[0.6rem] text-secondary border-t border-white/5">
                    <Link to="/" className="hover:text-white"> &lt;&lt; TERMINATE_UPLINK_&_RETREAT </Link>
                </div>
            </div>
        </div>
    );
};

// Helper function to render list items
const postItems = (posts, limit) => {
    return posts.slice(0, limit).map((post) => (
        <div key={post.id} className="group grid grid-cols-1 md:grid-cols-12 gap-6 px-6 md:px-16 py-10 border-b border-white/5 hover:bg-white/[0.02] transition-colors relative">

            {/* Visual Ref (Thumbnail) */}
            <div className="col-span-2 relative">
                <div className="aspect-square w-full md:w-32 overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img
                        src={post.image_url || defaultCyborg}
                        alt="Visual"
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-transform"
                    />
                    {/* Scanline overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIC8+Cjwvc3ZnPg==')] opacity-50 pointer-events-none"></div>
                </div>
            </div>

            {/* Log Abstract */}
            <div className="col-span-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                    <Link to={`/blog/${post.slug || post.id}`}>{post.title.toUpperCase()}</Link>
                </h2>
                <div className="mono text-sm text-secondary leading-relaxed max-w-3xl">
                    <span className="text-accent/50 mr-2">// ABSTRACT:</span>
                    {post.content ? post.content.substring(0, 160).replace(/[#*]/g, '') + '...' : 'Data corrupted or encrypted. Access full log for decryption.'}
                </div>
            </div>

            {/* Meta Data */}
            <div className="col-span-2 flex flex-col justify-center md:items-end text-left md:text-right mono text-xs gap-1 text-secondary">
                <div className="text-accent mb-1">ID: {String(post.id).padStart(4, '0')}</div>
                <div>DATE: {post.custom_timestamp || (post.updated_at ? new Date(post.updated_at).toLocaleDateString().replace(/\//g, '.') : 'UNKNOWN')}</div>
                <div>COORD: {post.coordinates || '34.052°N, 118.243°W'}</div>
            </div>

        </div>
    ));
};

export default CoreLogs;
