import React, { FC } from 'react';
import './navbar.css';
import ChapterData from '../../data/chapter-hall-data.json';
import seatEatLogo from '../../assets/logo/seateat_transparent.png'

import HamburgerButton from '../hamburger-button/hamburger-button';
import ChapterHallCard from '../chapter-hall-card/chapter-hall-card';
import { NavLink } from 'react-router-dom';
import LinkCard from '../link-card/link-card';
import useWindowDimensions from '../../hooks/useWindowDimensions';

export interface NavbarState {
    isOpen: boolean
}

export interface NavbarAction {
    onToogleNavbar: (isOpen: boolean) => void
}

type NavbarProps = NavbarState & NavbarAction

const Navbar: FC<NavbarProps> = (props) => {

    const windowDimensions = useWindowDimensions();

    return (
        <div className='navbar'>
            <div className='navbar-leading navbar-padding'>
                <NavLink to='/'>
                    <img className='navbar-logo' src={seatEatLogo} alt='' 
                        onClick={() => {
                            if(props.isOpen) {
                                props.onToogleNavbar(!props.isOpen) 
                            }
                            window.scrollTo({ top: 0, behavior: 'smooth' })}}/>
                </NavLink>
                <div className='navbar-mobile-menu-button'>
                    <HamburgerButton 
                        onClick={() => {props.onToogleNavbar(!props.isOpen)}} 
                        isActive={props.isOpen}
                    />
                </div>
            </div>
            <div className={`navbar-content navbar-padding ${props.isOpen ? 'active' : ''}`}>
                <div className='navbar-links'>
                    { 
                        windowDimensions.width < 850 ? 
                            <LinkCard light path='/' onClick={() => props.onToogleNavbar(!props.isOpen)}>
                                Home
                            </LinkCard> 
                        : <></> 
                    }
                    {
                        ChapterData.map((chapter) => {
                            return <ChapterHallCard 
                                key={chapter.name}
                                chapterHall={chapter}
                                onClick={() => props.onToogleNavbar(!props.isOpen)}/>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;