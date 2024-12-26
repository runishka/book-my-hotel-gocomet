import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    const navigationItems = [
        { text: "Home", href: "/" },
        { text: "Hotels", href: "/explore" },
        { text: "Places", href: "/places" },
    ];

    return (
        <nav className="navbar">
            <div className="nav-group">
                <div className="logo">
                    <span className="logo-highlight">Book</span>
                    My
                    <span className="logo-highlight bold">Hotel</span>
                </div>
                <ul className="nav-links">
                    {navigationItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.href}>{item.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div
                className="sign-in"
                tabIndex={0}
                role="button"
            >
                Sign in
            </div>
        </nav>
    );
};

export default Navbar;
