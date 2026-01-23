import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import './index.css';
import NavButton from './NavButton';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

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
        navigate(`/?q=${encodeURIComponent(searchQuery)}`);
        setIsSearchOpen(false);
        setMobileMenuOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <header className="app-header" style={{
                display: 'flex',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                background: 'black',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                padding: 0
            }}>
                {/* Brand Section */}
                <div style={{
                    padding: '20px 40px',
                    fontWeight: 'bold',
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: '0 0 auto'
                }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src="/logo.png" alt="PIXY Logo" style={{ height: '30px', width: 'auto' }} />
                        <span style={{ letterSpacing: '1px' }}>PIXY|NEWS.SYS</span>
                    </Link>
                </div>

                {/* Mobile Menu Toggle (Right aligned on mobile via flex-grow or absolute) */}
                <div className="mobile-only" style={{
                    marginLeft: 'auto',
                    padding: '0 20px',
                    alignItems: 'center',
                    borderLeft: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <NavButton isOpen={isMobileMenuOpen} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} />
                </div>

                {/* Desktop Navigation Links - Center */}
                <div className="mono header-nav-links desktop-only" style={{
                    gap: '30px',
                    padding: '0 40px',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: '#888',
                    flex: 1
                }}>
                    <Link to="/core-logs" style={{
                        color: isActive('/core-logs') ? 'white' : '#888',
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                    }}>
                        CORE_LOGS
                    </Link>
                    <Link to="/neural-synapse" style={{
                        color: isActive('/neural-synapse') ? 'white' : '#888',
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                    }}>
                        NEURAL_SYNAPSE
                    </Link>
                    <Link to="/join-network" style={{
                        color: isActive('/join-network') ? 'white' : '#888',
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                    }}>
                        JOIN_NETWORK
                    </Link>
                    <Link to="/enforcement-bypass" style={{
                        color: isActive('/enforcement-bypass') ? 'white' : '#888',
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                    }}>
                        ENFORCEMENT_BYPASS
                    </Link>
                </div>

                {/* Desktop Right Section: Location/Meta + Search */}
                <div className="mono desktop-only" style={{
                    padding: '20px 40px',
                    fontSize: '0.8rem',
                    color: '#666',
                    borderLeft: '1px solid rgba(255,255,255,0.1)',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    {/* Search Toggle */}
                    <div ref={searchContainerRef} style={{ position: 'relative' }}>
                        {isSearchOpen ? (
                            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    autoFocus
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="SEARCH..."
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid white',
                                        color: 'white',
                                        fontFamily: 'inherit',
                                        width: '120px',
                                        fontSize: '0.8rem',
                                        outline: 'none'
                                    }}
                                />
                                <button type="submit" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginLeft: '5px' }}>→</button>
                            </form>
                        ) : (
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#666',
                                    cursor: 'pointer',
                                    padding: 0,
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit'
                                }}>
                                [SEARCH]
                            </button>
                        )}
                    </div>

                    <span>LOC: 0X88.2.1</span>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: 'black',
                zIndex: 200,
                flexDirection: 'column',
                display: isMobileMenuOpen ? 'flex' : 'none'
            }}>
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{ fontWeight: 'bold' }}>MENU</span>
                    <NavButton isOpen={isMobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
                </div>

                <div className="mono" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: '30px', fontSize: '1.2rem' }}>
                    <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', animation: isMobileMenuOpen ? `disintegration 0.5s ease forwards` : 'none', opacity: 0, animationDelay: '0s' }}>01_HOME</Link>
                    <Link to="/core-logs" onClick={() => setMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', animation: isMobileMenuOpen ? `disintegration 0.5s ease forwards` : 'none', opacity: 0, animationDelay: '0.1s' }}>02_CORE_LOGS</Link>
                    <Link to="/neural-synapse" onClick={() => setMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', animation: isMobileMenuOpen ? `disintegration 0.5s ease forwards` : 'none', opacity: 0, animationDelay: '0.2s' }}>03_NEURAL_SYNAPSE</Link>
                    <Link to="/join-network" onClick={() => setMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', animation: isMobileMenuOpen ? `disintegration 0.5s ease forwards` : 'none', opacity: 0, animationDelay: '0.3s' }}>04_JOIN_NETWORK</Link>
                    <Link to="/enforcement-bypass" onClick={() => setMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', animation: isMobileMenuOpen ? `disintegration 0.5s ease forwards` : 'none', opacity: 0, animationDelay: '0.4s' }}>05_ENFORCEMENT_BYPASS</Link>

                    <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #333', animation: isMobileMenuOpen ? `disintegration 0.5s ease forwards` : 'none', opacity: 0, animationDelay: '0.4s' }}>
                        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: '#666' }}>[?]</span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="SEARCH SYSTEM..."
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontFamily: 'inherit',
                                    fontSize: '1rem',
                                    width: '100%',
                                    outline: 'none'
                                }}
                            />
                            <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--accent-color)', cursor: 'pointer', fontSize: '1.2rem' }}>→</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
