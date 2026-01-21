import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import logoImg from './assets/logo.png';
import './index.css';
import NavButton from './NavButton';

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();

    // Sync local state with URL param
    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearchQuery(query);
            setIsSearchOpen(true);
        }
    }, [searchParams]);

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                // If we click outside, strictly speaking we might want to just hide the input,
                // but if there's a query, maybe we want to keep it? 
                // The previous behavior was just 'close'. Let's stick to that.
                setIsSearchOpen(false);
            }
        }

        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchOpen]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Determine where to go
        // Always navigate to Home with query param
        navigate(`/?q=${encodeURIComponent(searchQuery)}`);

        // On mobile, close menu after search
        setMobileMenuOpen(false);
    };

    return (
        <>
            <header className="app-header">
                <div className="header-brand">
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <img src={logoImg} alt="Logo" className="header-logo" />
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '1px' }}>PIXY<span className="text-accent">|</span>NEWS</div>
                    </Link>
                    <span className="mono text-secondary header-version">SYS.VER.2.0.4</span>
                </div>

                <div className="header-meta mono text-secondary">
                    <span>LAT: 46.6242° N</span>
                    <span>LONG: 8.0414° E</span>
                    <span>LIVE FEED</span>
                </div>

                <div className="header-search" ref={searchContainerRef}>
                    {isSearchOpen ? (
                        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeIn 0.3s' }}>
                            <input
                                type="text"
                                placeholder="SEARCH SYSTEM..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                className="search-input-field"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: '1px solid var(--accent-color)',
                                    color: 'white',
                                    fontFamily: 'var(--font-mono)',
                                    padding: '5px',
                                    outline: 'none'
                                }}
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                    navigate('/'); // Clear search from URL too maybe?
                                }}
                                style={{ color: '#666', fontSize: '1.2rem', cursor: 'pointer' }}
                            >
                                ×
                            </button>
                        </form>
                    ) : (
                        <button
                            className="mono search-label"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsSearchOpen(true);
                            }}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                            SEARCH <SearchIcon />
                        </button>
                    )}

                    <NavButton isOpen={isMobileMenuOpen} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} />
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`menu-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
            ></div>
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>

                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.1, pointerEvents: 'none', backgroundSize: '30px 30px', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)' }}></div>

                <div className="menu-header">
                    <div>
                        <div className="mono text-accent" style={{ fontSize: '0.7rem', marginBottom: '5px' }}>// PIXY_NEWS_PROTOCOL_V2.0</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', lineHeight: 1 }}>MAIN MENU</div>
                    </div>
                    <NavButton isOpen={true} onClick={() => setMobileMenuOpen(false)} className="menu-close-btn" />
                </div>

                <div className="mobile-menu-links mono">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)} className="menu-link-item">
                        <span className="menu-number text-accent">[01]</span> INDEX
                    </Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)} className="menu-link-item">
                        <span className="menu-number text-accent">[02]</span> ARCHIVE
                    </Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)} className="menu-link-item">
                        <span className="menu-number text-accent">[03]</span> ABOUT
                    </Link>

                </div>
            </div>
        </>
    );
};

export default Header;
