import React, { FC, useState} from 'react';
import './chapter-hall-card.css';
import { ChapterHall } from '../../model/chapter-hall-model';
import { NavLink } from 'react-router-dom';

import seatEatLogo from '../../assets/logo/seateat_transparent.png'

const ChapterHallCard: FC<{chapterHall: ChapterHall, onClick: Function}> = (props) => {

    return (
        <NavLink 
            exact
            className="chapter-hall-container"
            activeClassName="chapter-hall-container active"
            onClick={() => props.onClick()}
            to={'/chapter/' + props.chapterHall.name} 
            key={props.chapterHall.name}>
                <div className="chapter-hall-name">
                    {props.chapterHall.name}
                </div>
                <div className="chapter-hall-logo-container">
                    {props.chapterHall.logos.map(logo => {
                        return <>
                            <div className="chapter-hall-logo-split"></div>
                            <div 
                                key={logo}
                                className="chapter-hall-logo">
                                <img src={`/assets/chapter-logos/${logo}`} alt=""/>
                            </div>
                        </>
                    })}
                </div>
        </NavLink>
    );
}

export default ChapterHallCard;