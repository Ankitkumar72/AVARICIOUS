import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-top">
                <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>PIXY<span className="text-accent">|</span>NEWS</div>
                    <div className="text-secondary" style={{ fontSize: '0.8rem', maxWidth: '300px' }}>Architectural grid-based news terminal.<br />Copyright ©2052 System Core. All rights reserved.</div>
                </div>
                <div className="mono text-secondary footer-links">
                    <Link to="/core-logs">CORE_LOGS</Link>
                    <Link to="/neural-synapse">NEURAL_SYNAPSE</Link>
                    <Link to="/join-network">JOIN_NETWORK</Link>
                    <Link to="/system-integrity">SYSTEM_INTEGRITY</Link>
                </div>
            </div>

            {/* Ticker */}
            <div className="footer-ticker mono">
                <span>/// MARKET ALERT: SYNTHETIC ORE DOWN 4.5% ///</span>
                <span>/// SYSTEM UPDATE: FIREWALL PATCH APPLIED SUCCESSFULLY ///</span>
                <span>/// WEATHER: ACID RAIN WARNING FOR LOWER DISTRICTS ///</span>
            </div>
        </footer>
    );
};

export default Footer;
