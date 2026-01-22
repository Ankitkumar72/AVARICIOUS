import { Link } from 'react-router-dom';
import Header from '../Header';
import NewsGrid from '../components/NewsGrid';
import { useBlog } from '../context/BlogContext';

const Archive = () => {
    const { posts, loading } = useBlog();

    return (
        <div className="app-main-wrapper">
            <div className="app-layout">
                {/* Header */}
                <Header minimal={true} />

                <div className="p-10 border-b border-white/5">
                    <h1 className="hero-title text-4xl mb-4">SYSTEM ARCHIVE</h1>
                    <div className="mono text-accent text-sm">
                        Total Records: {posts.length} // ACCESS_LEVEL: PUBLIC
                    </div>
                </div>

                <div className="min-h-[50vh]">
                    <NewsGrid posts={posts} loading={loading} />
                </div>

                {/* Simple Footer */}
                <footer className="footer-simple border-t border-white/5 mt-auto">
                    <div className="mono text-secondary">
                        END OF STREAM
                    </div>
                    <div className="footer-simple-links mono">
                        <Link to="/">RETURN TO INDEX</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Archive;
