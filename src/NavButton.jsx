import React from 'react';

const NavButton = ({ isOpen, onClick, className = '' }) => {
    return (
        <button
            className={`nav-button ${className}`}
            onClick={onClick}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
            <div className={`nav-icon ${isOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </button>
    );
};

export default NavButton;
