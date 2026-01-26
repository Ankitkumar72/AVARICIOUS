import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Helper to generate a slug from a title string.
 * NOTE: This is a temporary client-side solution.
 * A proper DB column for slugs is planned for future updates.
 */
const generateSlug = (title) => {
    if (!title) return '';
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

const TransmissionCard = ({ post }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Fallback if no post provided (should prevent crash)
    if (!post) return null;

    const slug = post.slug || generateSlug(post.title);
    const category = post.category || 'UNCATEGORIZED';

    return (
        <Link
            to={`/blog/${slug}`}
            className="transmission-item group"
            style={{ textDecoration: 'none', display: 'block' }}
        >
            <div style={{
                height: '120px',
                background: '#111',
                marginBottom: '20px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid #333'
            }}>
                {/* Loading / Placeholder State */}
                <div className={`absolute inset-0 flex items-center justify-center bg-[#111] transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="mono text-secondary text-[10px] tracking-widest animate-pulse">
                        {imageError ? 'SIGNAL_LOST' : 'LOADING_FEED...'}
                    </span>
                </div>

                {/* Actual Image */}
                {!imageError && post.image_url ? (
                    <img
                        src={post.image_url}
                        alt={post.title}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => {
                            setImageError(true);
                            setImageLoaded(true); // Stop loading state
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: imageLoaded ? 0.8 : 0,
                            transition: 'opacity 0.5s ease',
                            filter: 'grayscale(100%)', // Initial state
                        }}
                        className="group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                    />
                ) : (
                    // Fallback for missing URL or Load Error
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a]">
                        <span className="text-[#333] mono text-xs">[NO_IMG_DATA]</span>
                    </div>
                )}

                {/* Glitch Overlay Effect on Hover */}
                <div className="absolute inset-0 bg-[#00f0ff] opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-100 mix-blend-overlay"></div>
            </div>

            <div className="mono text-accent" style={{ fontSize: '0.6rem', marginBottom: '5px', letterSpacing: '1px' }}>
                {category.toUpperCase()}
            </div>

            <div style={{
                fontWeight: 'bold',
                fontSize: '0.9rem',
                color: '#e0e0e0',
                lineHeight: '1.4',
                height: '2.8em', // Limit to 2 lines
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
            }} className="group-hover:text-[#00f0ff] transition-colors duration-300">
                {post.title}
            </div>
        </Link>
    );
};

export default TransmissionCard;
