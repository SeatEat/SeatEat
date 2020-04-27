import React, { useState } from 'react';
import './navbar.css';
import ChapterData from '../../data/chapter-hall-data.json';
import seatEatLogo from '../../assets/logo/seateat_transparent.png'

import HamburgerButton from '../hamburger-button/hamburger-button';
import ChapterHallCard from '../chapter-hall-card/chapter-hall-card';
import { NavLink, Link } from 'react-router-dom';
import LinkCard from '../link-card/link-card';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const Navbar = () => {

    const windowDimensions = useWindowDimensions();
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
                        windowDimensions.width < 850 ? 
                            <LinkCard light path='/' onClick={() => toogleMobileMenuOpen(!mobileMenuOpen)}>
                                Home page
                            </LinkCard> 
                        : <></> 
                    }
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