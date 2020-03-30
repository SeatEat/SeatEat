import React, { useState } from 'react';
import './navbar.css';
import ChapterData from '../../data/chapter-hall-data.json';
import seatEatLogo from '../../assets/logo/seateat_transparent.png'

import HamburgerButton from '../hamburger-button/hamburger-button';
import ChapterHallCard from '../chapter-hall-card/chapter-hall-card';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const [mobileMenuOpen, toogleMobileMenuOpen] = useState(false);

    return (
        <div className='navbar'>
            <div className='navbar-leading navbar-padding'>
                <NavLink to='/'>
                    <img className='navbar-logo' src={seatEatLogo} alt='' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}/>
                </NavLink>
                <div className='navbar-mobile-menu-button'>
                    <HamburgerButton 
                        onClick={() => {toogleMobileMenuOpen(!mobileMenuOpen)}} 
                        isActive={mobileMenuOpen}
                    />
                </div>
            </div>
            <div className={`navbar-content navbar-padding ${mobileMenuOpen ? 'active' : ''}`}>
                <div className='navbar-links'>
                    {
                        ChapterData.map((chapter) => {
                            return <ChapterHallCard 
                                key={chapter.name}
                                chapterHall={chapter}
                                onClick={() => toogleMobileMenuOpen(!mobileMenuOpen)}/>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;