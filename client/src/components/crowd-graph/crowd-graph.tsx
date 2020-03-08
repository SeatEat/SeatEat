import React, { FC } from "react";
import { CrowdEstimationData } from "../../model/crowd-estimation-model";
import { views } from "../../model/views";
import BarGraph from "../bar-graph/bar-graph";
import { monthNames } from "../../data/month-names";

export type CrowdGraphProps = {
    estimationData: CrowdEstimationData | null,
    slideValue: number,
    activeView: string,
}

const CrowdGraph: FC<CrowdGraphProps> = (props) => {

    const startHour = 5;
    const endHour = 19;

    const buildGraphValues = (): number[] => {
        if (props.estimationData === null) {
            return [];
        }

        if (props.activeView === views.daily.name) {
            return props.estimationData.getEstimationDay(props.slideValue).slice(startHour, endHour);
        }

        if (props.activeView === views.weekly.name) {
            return props.estimationData.getEstimationWeekly(props.slideValue)
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
        limit={100} 
        limitText="Maximum capacity" 
        values={buildGraphValues()}/>
}

export default CrowdGraph;