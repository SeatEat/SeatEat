import React, { FC } from "react";
import { CrowdEstimationData } from "../../model/crowd-estimation-model";
import { views } from "../../model/views-model";
import BarGraph from "../bar-graph/bar-graph";
import { monthNames } from "../../data/month-names";
import { SlideState } from "../../model/redux/crowdDataSliderState";
import { ChapterHall } from "../../model/chapter-hall-model";
import { AppState } from "../../model/redux/store";
import { connect } from "react-redux";

export type CrowdGraphProps = {
    activeView: string,
    chapterHall: ChapterHall | null,
    estimationData: CrowdEstimationData | null,
    slideValue: SlideState,
}

const CrowdGraph: FC<CrowdGraphProps> = (props) => {

    const startHour = 5;
    const endHour = 19;

    const buildGraphValues = (): number[] => {
        if (props.estimationData === null) {
            return [];
        }

        if (props.activeView === views.daily.name) {
            return props.estimationData.getEstimationDay(props.slideValue.daily).slice(startHour, endHour);
        }

        if (props.activeView === views.weekly.name) {
            return props.estimationData.getEstimationWeekly(props.slideValue.weekly)
        }

        return [];
    }

    const buildGroundValues = (index: number): string => {
        if (props.estimationData === null) {
            return '';
        }

        if (props.activeView === views.daily.name) {
            return `${index + startHour}:00`;
        }

        if (props.activeView === views.weekly.name) {
            let date = props.estimationData.getDateFromDay(index);
            return `${monthNames[date.getMonth()]} ${("0" + date.getDate()).slice(-2)}`;
        }

        return '';
    }
    
    return <BarGraph
        buildGroundValues={buildGroundValues}
        limit={props.chapterHall?.capacity ?? 100} 
        limitText="Maximum capacity" 
        values={buildGraphValues()}/>
}

const mapStateToProps = (state: AppState): CrowdGraphProps => ({
    activeView: state.viewState.activeView,
    chapterHall: state.estimationState.chapterHall,
    estimationData: state.estimationState.estimationData,
    slideValue: state.crowdDataSlideState
});

export default connect(
  mapStateToProps,
)(CrowdGraph);