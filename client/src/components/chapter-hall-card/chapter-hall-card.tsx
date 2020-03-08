import React, { FC, useState} from 'react';
import './chapter-hall-card.css';

type ChapterHallCardProps = {
    name: string,
    logo: string,
}
const ChapterHallCard: FC<ChapterHallCardProps> = (props) => {

    const [cardActive, toggleCardActive] = useState(false);

    return (
        <div>
            <div className="chapter-hall-name">
                {props.name}
            <img src={props.logo} className="chapter-hall-logo" alt=""/>
            </div>
        </div>
    );
}

export default ChapterHallCard;