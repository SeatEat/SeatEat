import React, { FC } from 'react';
import './crowd-current.css';

interface CrowdCurrentProps {
    logos: Array<string>,
    name: string | never[]
    rate: number
}

const CrowdCurrentPresentational: FC<CrowdCurrentProps> = (props) => {
    const percentList = [" 0-20%", " 20-40%", " 40-60%", " 60-80%", " 80-100%"]

    return (
        <div className="chapter-information-container">
            <div className="chapter-crowd-container">
                <div className="chapter-logo-container">
                    {props.logos.map(logo =>
                        <div
                            key={logo}
                            className="chapter-hall-logos">
                            <img className={`occupancy-scale-${props.rate}`} src={`/assets/chapter-logos/${logo}`} alt=""/>
                        </div>
                    )}
                </div>
                <div className="color-container">
                    <div className="circle-container">
                        {percentList.map((percent, index) => 
                            <div
                                key={percent}
                                className={`circle-crowd-rate circle-${index} ${props.rate === index ? 'current-percent' : ''}`}>
                                <div className={`hover-content-crowd-rate ${props.rate === index ? 'current-percent' : ''}`}>{percent}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="text-container">
                <span>
                    {`${props.name} is estimated to be `}<span className={`text-content text-percent-${props.rate}`}>{percentList[props.rate]}</span> full.
                    <br/>
                    Check below to see how many people have checked in.
                </span>
            </div>
        </div>

    );
}

export default CrowdCurrentPresentational;