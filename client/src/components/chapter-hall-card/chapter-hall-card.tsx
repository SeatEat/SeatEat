import React, { FC, Fragment} from 'react';
import './chapter-hall-card.css';
import { ChapterHall } from '../../model/chapter-hall-model';
import LinkCard from '../link-card/link-card';

const ChapterHallCard: FC<{chapterHall: ChapterHall, onClick: Function}> = (props) => {

    return (
        <LinkCard 
            path={'/chapter/' + props.chapterHall.name} 
            key={props.chapterHall.name}
            onClick={props.onClick}
            left={
                <div className="chapter-hall-logo-container">
                {props.chapterHall.logos.map(logo => {
                    return <Fragment key={logo}>
                        <div className="chapter-hall-logo-split"></div>
                        <div 
                            className="chapter-hall-logo">
                            <img src={`/assets/chapter-logos/${logo}`} alt=""/>
                        </div>
                    </Fragment>
                })}
                </div>}>
            {props.chapterHall.name}
        </LinkCard>
    );
}

export default ChapterHallCard;