import React, { useState } from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import ChapterData from '../../data/chapter-data.json';
import seatEatLogo from '../../assets/logo/seateat_transparent.png'

import HamburgerButton from '../hamburger-button/hamburger-button';

const Navbar = () => {

    const [mobileMenuOpen, toogleMobileMenuOpen] = useState(false);

    return (
        <div className="navbar">
            <div className="navbar-leading navbar-padding">
                <img className="logo" src={seatEatLogo} alt=""/>
                <div className="navbar-mobile-menu-button">
                    <HamburgerButton 
                        onClick={() => {toogleMobileMenuOpen(!mobileMenuOpen)}} 
                        isActive={mobileMenuOpen}
                    />
                </div>
            </div>
            <div className={`navbar-content navbar-padding ${mobileMenuOpen ? 'active' : ''}`}>
                {
                    ChapterData.map((chapter) => {
                        return <NavLink 
                            exact
                            className="navbar-link"
                            activeClassName="navbar-link active"
                            onClick={() => toogleMobileMenuOpen(!mobileMenuOpen)}
                            to={'/chapter/' + chapter.name} 
                            key={chapter.name}>
                            {chapter.name}
                        </NavLink>
                    })
                }
            </div>
            <div className="navbar-footer">
                this is the navbar footer
            </div>
        </div>
    );
}

export default Navbar;