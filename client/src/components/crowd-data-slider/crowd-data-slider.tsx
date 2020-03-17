import React, { FC } from "react";
import { CrowdEstimationData } from "../../model/crowd-estimation-model";
import { monthNames } from "../../data/month-names";
import DateSlider from "../date-slider/date-slider";
import { views } from "../../model/views";
import { SlideState } from "../../model/redux/crowdDataSliderState";

export interface CrowdDataSliderPropsState {
    estimationData: CrowdEstimationData | null,
    activeView: string,
    crowdDataSlideState: SlideState
}

export interface CrowdDataSliderPropsActions {
    onSliderChange: (arg0: string, arg1: number) => void
}

const CrowdDataSlider: FC<CrowdDataSliderPropsState & CrowdDataSliderPropsActions> = (props) => {
    const generateSlideValues = (): number[] => {
        if (props.estimationData === null) {
            return [];
        }
    
        if (props.activeView === views.weekly.name) {
            return Array(15).fill(0).map((_, i) => i + 5);
        }
    
        return Array(props.estimationData.daysOfEstimation)
            .fill(0).map((_, i) => i);
    }

    const generateSlideStepText = (value: number): string => {
        if(props.activeView === views.weekly.name) {
            return value + ':00';
        }

        let date = props.estimationData?.getDateFromDay(value) ?? new Date();
        return `${monthNames[date.getMonth()]} ${("0" + date.getDate()).slice(-2)}`;
    }

    return <DateSlider
        values={generateSlideValues()}
        stepTextBuilder={generateSlideStepText}
        onValueChange={props.onSliderChange}
        activeView={props.activeView}
        crowdDataSlideState={props.crowdDataSlideState}
        />
}

export default CrowdDataSlider;