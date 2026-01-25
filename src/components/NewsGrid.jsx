import React from 'react';
import { Link } from 'react-router-dom';
import defaultAuthorImg from '../assets/8machine-_-Jw7p2A369As-unsplash.jpg';

const NewsGrid = ({ posts, loading, error }) => {

    // UI-side safety timeout
    const [localTimeout, setLocalTimeout] = React.useState(false);

    React.useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => setLocalTimeout(true), 8000); // 8s UI timeout
        } else {
            setLocalTimeout(false);
        }
        return () => clearTimeout(timer);
    }, [loading]);

    // 1. If we have posts, ALWAYS render them (Non-blocking load)
    const hasData = posts && Array.isArray(posts) && posts.length > 0;

    if (hasData) {
        return (
            <section className="relative min-h-[50vh]">
                {/* Non-blocking Loading Indicator */}
                {loading && (
                    <div className="absolute top-0 right-0 z-50 p-2">
                        <div className="flex items-center gap-2 bg-black/80 border border-accent/30 px-3 py-1 text-[10px] mono text-accent backdrop-blur-md">
                            <span className="animate-pulse">●</span>
                            <span>SYNCING_UPLINK...</span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 border-b border-white/5">
                    {posts.map((news) => (
                        <Link
                            key={news.id}
                            to={`/blog/${news.id}`}
                            className="group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 w-full overflow-hidden border-b border-white/10">
                                {news.image_url ? (
                                    <img
                                        src={news.image_url}
                                        alt={news.title}
                                        className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="h-full w-full digital-noise" />
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />

                                {/* Category Tag */}
                                <div className="absolute top-3 right-3">
                                    <span className="bg-black/80 border border-accent/30 px-2 py-1 text-[10px] font-mono text-accent uppercase tracking-wider backdrop-blur-md">
                                        {news.category || 'SYSTEM'}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-5">
                                <div className="mb-3 flex items-center justify-between text-[10px] font-mono text-secondary">
                                    <div className="flex items-center gap-2">
                                        <img src={defaultAuthorImg} alt="Author" className="w-5 h-5 rounded-full object-cover" />
                                        <span>ID: {String(news.id).toUpperCase().slice(0, 8)}</span>
                                    </div>
                                    <span>{news.updated_at ? new Date(news.updated_at).toLocaleDateString() : 'N/A'}</span>
                                </div>

                                <h3 className="mb-3 text-lg font-bold leading-tight text-white transition-colors group-hover:text-accent text-glitch">
                                    {news.title}
                                </h3>

                                <p className="mb-4 text-xs leading-relaxed text-gray-400 line-clamp-3">
                                    {news.content?.replace(/[#*]/g, '') || 'No content preview available.'}
                                </p>

                                <div className="mt-auto flex items-center gap-2 text-[10px] font-mono text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <span>ACCESS_FILE</span>
                                    <span>→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        );
    }

    // 2. No Data + Loading (Blocking State)
    if (loading) {
        if (localTimeout) {
            return (
                <div className="grid place-items-center py-20 text-red-500 mono">
                    <div className="text-xl">UPLINK_TIMEOUT</div>
                    <div className="text-sm mt-2 font-mono">SERVER_NOT_RESPONDING</div>
                    <div className="text-xs text-secondary mt-2">Check your internet connection or Vercel logs.</div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 border border-red-500 bg-red-500/10 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-black transition-colors font-mono text-sm uppercase"
                    >
                        RETRY_UPLINK
                    </button>
                </div>
            );
        }

        return (
            <div className="grid place-items-center py-20 text-accent mono">
                <div className="text-xl animate-pulse">ESTABLISHING_UPLINK...</div>
                <div className="text-sm mt-2 opacity-70">DECRYPTING_DATA_STREAM</div>
            </div>
        );
    }

    // 3. No Data + Error
    if (error) {
        return (
            <div className="grid place-items-center py-20 text-red-500 mono">
                <div className="text-xl">SYSTEM_FAILURE</div>
                <div className="text-sm mt-2 font-mono">CODE: {error}</div>
                <div className="text-xs text-gray-400 mt-2">Check console for details.</div>
            </div>
        );
    }

    // 4. No Data (Empty)
    return (
        <div className="grid place-items-center py-20 text-secondary">
            <div className="mono text-xl mb-2">NO_DATA_FOUND</div>
            <div className="text-sm">Try adjusting your search filters.</div>
            <div className="text-[10px] text-gray-600 mt-4 font-mono border border-gray-800 p-2 rounded">
                DEBUG_DIAGNOSTICS:<br />
                STATUS: ONLINE<br />
                ITEMS_RECEIVED: 0<br />
                LOADING_STATE: {String(loading).toUpperCase()}
            </div>
        </div>
    );
};

export default NewsGrid;
