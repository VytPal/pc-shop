import React, { useState, useContext } from 'react';
import { AuthContext } from "../AuthContext";
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <h1 className="page-name"><a href='/'>PCShop</a></h1>
            <button className="hamburger" onClick={toggleMenu}>
            <svg viewBox="0 0 100 80" width="40" height="40" fill='#FFF'>
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="100" height="10"></rect>
                    <rect y="60" width="100" height="10"></rect>
                </svg>
            </button>
            <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
                <ul className="menu">
                    <li className="menu-item"><a href="/partCategories">PC parts categories</a></li>
                    <li className="menu-item"><a href="/prebuilds">PC prebuilds</a></li>
                    {isLoggedIn ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <li className="menu-item"><a href="/login">Login</a></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;