import React, { FC } from 'react';
import { connect } from 'react-redux';
import './crowd-current.css';
import { AppState } from '../../model/redux/store';
import { CrowdEstimationData } from '../../model/crowd-estimation-model';
import { ChapterHall } from '../../model/chapter-hall-model';
import CrowdCurrentPresentational from './crowd-current-presentational';

type CrowdCurrentProps = {
    estimationData: CrowdEstimationData | null,
    chapterHall: ChapterHall | null,
    isLoading: boolean,
    loadingProgress: number,
}

const CrowdCurrent: FC<CrowdCurrentProps> = (props) => {
    return <CrowdCurrentPresentational
                logos={props.chapterHall?.logos ?? []}
                name={props.chapterHall?.name ?? ''}
                rate={props.estimationData?.getCurrentCrowdedness(props.chapterHall?.capacity ?? 100) ?? 0}/>
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

