import React, { FC } from 'react';
import './chapter-map.css';
import ChapterData from '../../data/chapter-data.json';



const ChapterMap: FC <{rate : 1 | 2 | 3 | 4 | 5, imgpath : string}> = (props) => {
    return <div className="chapter-map">
        <img className={`occupancy-scale-${props.rate}`} src={props.imgpath}/>
    </div>
}

export default ChapterMap;

