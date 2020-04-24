import React, { FC } from 'react';
import { connect } from 'react-redux';
import './crowd-current.css';
import { AppState } from '../../model/redux/store';
import { CrowdEstimationData } from '../../model/crowd-estimation-model';
import { ChapterHall } from '../../model/chapter-hall-model';

type CrowdCurrentProps = {
    estimationData: CrowdEstimationData | null,
    chapterHall: ChapterHall | null,
    isLoading: boolean,
    loadingProgress: number,
}

const CrowdCurrent: FC<CrowdCurrentProps> = (props) => {
    const logos = props.chapterHall?.logos ? props.chapterHall?.logos : []
    const name = props.chapterHall?.name ? props.chapterHall?.name : []
    const rate = props.estimationData?.getCurrentCrowdedness(props.chapterHall?.capacity) ?? 0
    const percentList = [" 0-20%", " 20-40%", " 40-60%", " 60-80%", " 80-100%"]
    return (
        <div className="chapter-information-container">
            <div className="chapter-crowd-container">
                <div className="chapter-logo-container">
                    {logos.map(logo =>
                        <div
                            key={logo}
                            className="chapter-hall-logos">
                            <img className={`occupancy-scale-${rate}`} src={`/assets/chapter-logos/${logo}`} alt=""/>
                        </div>
                    )}
                </div>
                <div className="color-container">
                    <div className="circle-container">
                        {percentList.map((percent, index) => 
                            <div
                                key={percent}
                                className={`circle-crowd-rate circle-${index} ${rate === index ? 'current-percent' : ''}`}>
                                <div className={`hover-content-crowd-rate ${rate === index ? 'current-percent' : ''}`}>{percent}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="text-container">
                <span>
                    {`${name} is estimated to be `}<span className={`text-content text-percent-${rate}`}>{percentList[rate]}</span> full.
                    <br/>
                    Check below to see how many people have checked in.
                </span>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState): CrowdCurrentProps => ({
    estimationData: state.estimationState.estimationData,
    chapterHall: state.estimationState.chapterHall,
    isLoading: state.estimationState.isLoading,
    loadingProgress: Math.round(state.estimationState.loadingProgress * 100)
});

export default connect(
  mapStateToProps,
)(CrowdCurrent);

