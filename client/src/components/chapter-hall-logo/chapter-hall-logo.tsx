import React, { FC } from 'react';
import './chapter-hall-logo.css';
import { ChapterHall } from "../../model/chapter-hall-model";
import ChapterHallText from "../chapter-hall-text/chapter-hall-text";

const ChapterLogos: FC <{rate : number | undefined, logos : Array<string> | undefined, name: string | undefined}> = (props) => {
    const logos = props.logos ? props.logos : []
    const name = props.name ? props.name : []
    return (
        <div className="chapter-information-container">
            <div className="chapter-crowd-container">
                <div className="chapter-logo-container">
                    {logos.map(logo => {
                    return <>
                    
                        <div
                            key={logo}
                            className="chapter-hall-logos">
                            <img className={`occupancy-scale-${props.rate}`} src={`/assets/chapter-logos/${logo}`} alt=""/>
                        </div>
                    </>
                })}
                </div>
                <div className="color-container">
                    <div className="circle-container">
                        <div className="circle-1">
                            <div className="hover-content-1">0-20%</div>
                        </div>
                        <div className="circle-2">
                            <div className="hover-content-2">20-40%</div>
                        </div>
                        <div className="circle-3">
                            <div className="hover-content-3">40-60%</div>
                        </div>
                        <div className="circle-4">
                            <div className="hover-content-4">60-80%</div>
                        </div>
                        <div className="circle-5">
                            <div className="hover-content-5">80-100%</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-container">
                <span className="chapter-hall-text"><ChapterHallText rate={props.rate} chapterHall={name}/></span>
                <span className="check-in-text">Check below to see how many people have checked in.</span>
            </div>
        </div>
    );
}


export default ChapterLogos;