import React, { FC } from 'react';
import './hamburger-button.css';

type HamburgerButtonProps = {
    onClick: Function,
    isActive: boolean
}

const HamburgerButton: FC<HamburgerButtonProps> = (props) => {

    return (
        <div className="hamburger-button-container">
            <div 
                onClick={() => props.onClick()} 
                className={`hamburger-button ${props.isActive ? ' active' : ''}`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default HamburgerButton;
