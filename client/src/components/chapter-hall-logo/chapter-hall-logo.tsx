import React, { FC } from 'react';
import { connect } from 'react-redux';
import './chapter-hall-logo.css';
import { AppState } from '../../model/redux/store';
import ChapterHallText from "../chapter-hall-text/chapter-hall-text";
import { CrowdEstimationData } from '../../model/crowd-estimation-model';
import { ChapterHall } from '../../model/chapter-hall-model';

type ChapterLogosProps = {
    estimationData: CrowdEstimationData | null,
    chapterHall: ChapterHall | null,
}

const ChapterLogos: FC<ChapterLogosProps> = (props) => {
    const logos = props.chapterHall?.logos ? props.chapterHall?.logos : []
    const name = props.chapterHall?.name ? props.chapterHall?.name : []
    const rate = props.estimationData?.getCurrentCrowdedness()
    return (
        <div className="chapter-information-container">
            <div className="chapter-crowd-container">
                <div className="chapter-logo-container">
                    {logos.map(logo => {
                    return <>
                    
                        <div
                            key={logo}
                            className="chapter-hall-logos">
                            <img className={`occupancy-scale-${rate}`} src={`/assets/chapter-logos/${logo}`} alt=""/>
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
                <span className="chapter-hall-text"><ChapterHallText rate={rate} chapterHall={name}/></span>
                <span className="check-in-text">Check below to see how many people have checked in.</span>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState): ChapterLogosProps => ({
    estimationData: state.estimationState.estimationData,
    chapterHall: state.estimationState.chapterHall
});

export default connect(
  mapStateToProps,
)(ChapterLogos);

